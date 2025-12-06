import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRole from '../models/UserRole';
import { RequestHandler } from 'express';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const registerUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please provide all fields' });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = new User({
    name,
    email,
    password,
  });

  try {
    await user.save();
    
    // Assign default 'client' role for public registrations
    const clientRole = new UserRole({
      userId: user._id,
      role: 'client',
      assignedBy: user._id, // Self-assigned
      isActive: true
    });
    await clientRole.save();

    // Get user roles
    const roles = await UserRole.find({ userId: user._id, isActive: true });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: roles.map(r => r.role),
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    // Get user's active roles
    const userRoles = await UserRole.find({ 
      userId: user._id, 
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: userRoles.map(r => r.role),
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get current user
export const getMe: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const userRoles = await UserRole.find({ 
      userId: req.user._id, 
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    res.json({
      success: true,
      data: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        roles: userRoles.map(r => r.role)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
