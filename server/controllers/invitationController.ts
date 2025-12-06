import { Request, Response } from 'express';
import UserInvitation, { InvitationStatus } from '../models/UserInvitation';
import User from '../models/User';
import UserRole from '../models/UserRole';
import { AppRole } from '../models/UserRole';
import { asyncHandler } from '../middleware/errorMiddleware';

// Send invitation
export const sendInvitation = asyncHandler(async (req: Request, res: Response) => {
  const { email, role, departmentId, message } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ 
      success: false, 
      message: 'User with this email already exists' 
    });
    return;
  }

  // Check for pending invitation
  const pendingInvitation = await UserInvitation.findOne({
    email,
    status: InvitationStatus.PENDING,
    expiresAt: { $gt: new Date() },
  });

  if (pendingInvitation) {
    res.status(400).json({ 
      success: false, 
      message: 'Pending invitation already exists for this email' 
    });
    return;
  }

  const invitation = new UserInvitation({
    email,
    role: role as AppRole,
    departmentId,
    invitedBy: req.userId,
    metadata: { message },
  });

  invitation.generateToken();
  await invitation.save();

  // TODO: Send email with invitation link
  // const invitationLink = `${process.env.FRONTEND_URL}/accept-invitation/${invitation.token}`;

  res.status(201).json({
    success: true,
    message: 'Invitation sent successfully',
    data: {
      id: invitation._id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token, // Remove this in production, only send via email
      expiresAt: invitation.expiresAt,
    },
  });
});

// Get all invitations
export const getAllInvitations = asyncHandler(async (req: Request, res: Response) => {
  const { status, page = 1, limit = 20 } = req.query;

  const filter: any = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const invitations = await UserInvitation.find(filter)
    .populate('invitedBy', 'name email')
    .populate('departmentId', 'name code')
    .populate('acceptedUserId', 'name email')
    .skip(skip)
    .limit(Number(limit))
    .sort({ invitedAt: -1 });

  const total = await UserInvitation.countDocuments(filter);

  res.json({
    success: true,
    data: invitations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Get invitation by token
export const getInvitationByToken = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  const invitation = await UserInvitation.findOne({ token })
    .populate('invitedBy', 'name email')
    .populate('departmentId', 'name code');

  if (!invitation) {
    res.status(404).json({ success: false, message: 'Invitation not found' });
    return;
  }

  if (invitation.isExpired()) {
    invitation.status = InvitationStatus.EXPIRED;
    await invitation.save();
    
    res.status(400).json({ success: false, message: 'Invitation has expired' });
    return;
  }

  if (invitation.status !== InvitationStatus.PENDING) {
    res.status(400).json({ 
      success: false, 
      message: `Invitation is ${invitation.status}` 
    });
    return;
  }

  res.json({
    success: true,
    data: invitation,
  });
});

// Accept invitation
export const acceptInvitation = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { name, password } = req.body;

  const invitation = await UserInvitation.findOne({ token });

  if (!invitation) {
    res.status(404).json({ success: false, message: 'Invitation not found' });
    return;
  }

  if (invitation.isExpired()) {
    invitation.status = InvitationStatus.EXPIRED;
    await invitation.save();
    
    res.status(400).json({ success: false, message: 'Invitation has expired' });
    return;
  }

  if (invitation.status !== InvitationStatus.PENDING) {
    res.status(400).json({ 
      success: false, 
      message: `Invitation is ${invitation.status}` 
    });
    return;
  }

  // Create user account
  const user = new User({
    name,
    email: invitation.email,
    password,
  });

  await user.save();

  // Assign role
  const userRole = new UserRole({
    userId: user._id,
    role: invitation.role,
    departmentId: invitation.departmentId,
    assignedBy: invitation.invitedBy,
    metadata: {
      reason: 'Invitation accepted',
    },
  });

  await userRole.save();

  // Update invitation
  invitation.status = InvitationStatus.ACCEPTED;
  invitation.acceptedAt = new Date();
  invitation.acceptedUserId = user._id;
  await invitation.save();

  res.status(201).json({
    success: true,
    message: 'Invitation accepted successfully',
    data: {
      userId: user._id,
      email: user.email,
      role: invitation.role,
    },
  });
});

// Revoke invitation
export const revokeInvitation = asyncHandler(async (req: Request, res: Response) => {
  const { invitationId } = req.params;

  const invitation = await UserInvitation.findById(invitationId);

  if (!invitation) {
    res.status(404).json({ success: false, message: 'Invitation not found' });
    return;
  }

  if (invitation.status !== InvitationStatus.PENDING) {
    res.status(400).json({ 
      success: false, 
      message: 'Can only revoke pending invitations' 
    });
    return;
  }

  invitation.status = InvitationStatus.REVOKED;
  await invitation.save();

  res.json({
    success: true,
    message: 'Invitation revoked successfully',
  });
});

// Resend invitation
export const resendInvitation = asyncHandler(async (req: Request, res: Response) => {
  const { invitationId } = req.params;

  const oldInvitation = await UserInvitation.findById(invitationId);

  if (!oldInvitation) {
    res.status(404).json({ success: false, message: 'Invitation not found' });
    return;
  }

  // Create new invitation
  const newInvitation = new UserInvitation({
    email: oldInvitation.email,
    role: oldInvitation.role,
    departmentId: oldInvitation.departmentId,
    invitedBy: req.userId,
    metadata: oldInvitation.metadata,
  });

  newInvitation.generateToken();
  await newInvitation.save();

  // Mark old invitation as revoked
  oldInvitation.status = InvitationStatus.REVOKED;
  await oldInvitation.save();

  res.json({
    success: true,
    message: 'Invitation resent successfully',
    data: {
      id: newInvitation._id,
      token: newInvitation.token,
      expiresAt: newInvitation.expiresAt,
    },
  });
});
