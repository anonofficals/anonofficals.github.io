import { z } from 'zod';

const formTypes = [
  'internship',
  'hackathon',
  'challenge',
  'collaboration',
  'fellowship',
  'research_grant',
  'startup_incubation',
  'tech_partnership',
  'global_exchange',
  'other_opportunity',
] as const;

const statusTypes = ['pending', 'under_review', 'shortlisted', 'accepted', 'rejected'] as const;

export const createApplicationSchema = z.object({
  body: z.object({
    formType: z.enum(formTypes),
    targetId: z.string().optional(),
    targetTitle: z.string().optional(),
    applicantData: z.record(z.any()).refine(
      (data) => Object.keys(data).length > 0,
      { message: 'Applicant data cannot be empty' }
    ),
  }),
});

export const updateApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum(statusTypes),
    reviewNotes: z.string().optional(),
  }),
});

export const applicationQuerySchema = z.object({
  query: z.object({
    formType: z.enum(formTypes).optional(),
    status: z.enum(statusTypes).optional(),
    search: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});
