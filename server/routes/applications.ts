import express from 'express';
import Application from '../models/Application';
import Notification from '../models/Notification';

const router = express.Router();

// Get all applications with filters
router.get('/', async (req, res) => {
  try {
    const {
      formType,
      status,
      search,
      page = 1,
      limit = 10,
      sortBy = 'submittedAt',
      order = 'desc',
    } = req.query;

    const query: any = {};

    if (formType) query.formType = formType;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { 'applicantData.fullName': { $regex: search, $options: 'i' } },
        { 'applicantData.email': { $regex: search, $options: 'i' } },
        { targetTitle: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate('reviewedBy', 'name email');

    res.json({
      success: true,
      data: {
        applications,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch applications',
    });
  }
});

// Get single application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'reviewedBy',
      'name email'
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch application',
    });
  }
});

// Create new application
router.post('/', async (req, res) => {
  try {
    const { formType, targetId, targetTitle, ...applicantData } = req.body;

    const application = new Application({
      formType,
      targetId,
      targetTitle,
      applicantData,
      status: 'pending',
      submittedAt: new Date(),
    });

    await application.save();

    res.status(201).json({
      success: true,
      data: application,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create application',
    });
  }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, reviewNotes, reviewedBy } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewNotes,
        reviewedBy,
        reviewedAt: new Date(),
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    // Create notification for applicant
    if (application.applicantData.email) {
      await Notification.create({
        userId: reviewedBy,
        type: `application_${status}`,
        title: `Application ${status}`,
        message: `Your ${application.formType} application has been ${status}`,
        relatedTo: {
          model: 'Application',
          id: application._id,
        },
      });
    }

    res.json({
      success: true,
      data: application,
      message: 'Application status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update application',
    });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete application',
    });
  }
});

// Search applications by ID or email
router.get('/search', async (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    let query: any = {};
    
    // Try to find by MongoDB ID first
    const mongoose = require('mongoose');
    if (mongoose.Types.ObjectId.isValid(q as string)) {
      query._id = q;
    } else {
      // Search by email or name
      query.$or = [
        { 'applicantData.email': { $regex: q, $options: 'i' } },
        { 'applicantData.fullName': { $regex: q, $options: 'i' } },
      ];
    }
    
    if (type && type !== 'all') {
      query.formType = type;
    }

    const application = await Application.findOne(query)
      .populate('reviewedBy', 'name email')
      .populate('files.fileId');

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search application',
    });
  }
});

// Get application statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { formType } = req.query;

    const query = formType ? { formType } : {};

    const stats = await Application.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalApplications = await Application.countDocuments(query);

    const statusCounts = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        total: totalApplications,
        ...statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch statistics',
    });
  }
});

export default router;
