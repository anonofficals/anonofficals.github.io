import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { apiService, fileApi } from '@/services/api';

export type FormType = 
  | 'internship' 
  | 'hackathon' 
  | 'challenge' 
  | 'collaboration' 
  | 'fellowship' 
  | 'research_grant' 
  | 'startup_incubation'
  | 'tech_partnership'
  | 'global_exchange'
  | 'other_opportunity'
  | 'dev_team';

interface UnifiedApplyFormProps {
  formType: FormType;
  targetId?: string;
  targetTitle?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const baseSchema = {
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
};

const formSchemas: Record<FormType, z.ZodObject<any>> = {
  internship: z.object({
    ...baseSchema,
    university: z.string().min(2, 'University is required'),
    program: z.string().min(2, 'Program is required'),
    yearOfStudy: z.string().min(1, 'Year of study is required'),
    department: z.string().min(1, 'Department is required'),
    expectedStartDate: z.date({ required_error: 'Start date is required' }),
    skills: z.string().min(5, 'Please list your skills'),
    motivation: z.string().min(50, 'Motivation must be at least 50 characters'),
    resume: z.any().optional(),
  }),
  hackathon: z.object({
    ...baseSchema,
    teamName: z.string().min(2, 'Team name is required'),
    teamSize: z.string().min(1, 'Team size is required'),
    isTeam: z.boolean().optional(),
    teamMembers: z.array(z.object({
      name: z.string(),
      email: z.string().email(),
      role: z.string(),
    })).optional(),
    hackathonEvent: z.string().optional(),
    projectIdea: z.string().min(100, 'Project idea must be at least 100 characters'),
    techStack: z.string().min(5, 'Tech stack is required'),
    experience: z.string().min(20, 'Experience description is required'),
    github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  }),
  challenge: z.object({
    ...baseSchema,
    solution: z.string().min(200, 'Solution must be at least 200 characters'),
    approach: z.string().min(100, 'Approach must be at least 100 characters'),
    techStack: z.string().min(5, 'Tech stack is required'),
    estimatedTime: z.string().min(1, 'Estimated time is required'),
    portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
  }),
  collaboration: z.object({
    ...baseSchema,
    organization: z.string().min(2, 'Organization is required'),
    proposalTitle: z.string().min(5, 'Proposal title is required'),
    description: z.string().min(200, 'Description must be at least 200 characters'),
    collaborationType: z.string().min(1, 'Collaboration type is required'),
    budget: z.string().optional(),
    timeline: z.string().min(10, 'Timeline is required'),
  }),
  fellowship: z.object({
    ...baseSchema,
    currentPosition: z.string().min(2, 'Current position is required'),
    institution: z.string().min(2, 'Institution is required'),
    researchArea: z.string().min(10, 'Research area is required'),
    publications: z.string().optional(),
    cv: z.any().optional(),
  }),
  research_grant: z.object({
    ...baseSchema,
    projectTitle: z.string().min(5, 'Project title is required'),
    abstract: z.string().min(200, 'Abstract must be at least 200 characters'),
    methodology: z.string().min(100, 'Methodology is required'),
    expectedOutcomes: z.string().min(50, 'Expected outcomes required'),
    budgetRequest: z.string().min(1, 'Budget request is required'),
  }),
  startup_incubation: z.object({
    ...baseSchema,
    companyName: z.string().min(2, 'Company name is required'),
    industry: z.string().min(2, 'Industry is required'),
    stage: z.string().min(1, 'Stage is required'),
    pitchDeck: z.string().min(100, 'Pitch deck summary required'),
    funding: z.string().optional(),
    teamSize: z.string().min(1, 'Team size is required'),
  }),
  tech_partnership: z.object({
    ...baseSchema,
    companyName: z.string().min(2, 'Company name is required'),
    partnershipType: z.string().min(1, 'Partnership type is required'),
    proposal: z.string().min(200, 'Proposal must be at least 200 characters'),
    expectedBenefits: z.string().min(50, 'Expected benefits required'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  }),
  global_exchange: z.object({
    ...baseSchema,
    university: z.string().min(2, 'University is required'),
    program: z.string().min(2, 'Program is required'),
    destination: z.string().min(2, 'Destination is required'),
    duration: z.string().min(1, 'Duration is required'),
    motivation: z.string().min(100, 'Motivation must be at least 100 characters'),
  }),
  other_opportunity: z.object({
    ...baseSchema,
    opportunityType: z.string().min(2, 'Opportunity type is required'),
    details: z.string().min(100, 'Details must be at least 100 characters'),
    background: z.string().min(50, 'Background information required'),
  }),
  dev_team: z.object({
    ...baseSchema,
    position: z.string().min(1, 'Position is required'),
    yearsExperience: z.string().min(1, 'Experience is required'),
    expectedSalary: z.string().optional(),
    workMode: z.enum(['remote', 'hybrid', 'onsite'], {
      required_error: 'Work mode is required',
    }),
    resume: z.any().optional(),
    portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
    linkedIn: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    technicalSkills: z.string().min(10, 'Technical skills required (min 10 characters)'),
    availability: z.date({ required_error: 'Availability date is required' }),
    coverLetter: z.string().min(100, 'Cover letter required (min 100 characters)'),
  }),
};

const formConfigs: Record<FormType, { title: string; fields: string[] }> = {
  internship: {title: 'Internship Application',fields: ['fullName', 'email', 'phone', 'university', 'program', 'yearOfStudy', 'department', 'expectedStartDate', 'skills', 'motivation', 'resume'],},
  hackathon: {title: 'Hackathon Registration',fields: ['fullName', 'email', 'phone', 'teamName', 'teamSize', 'projectIdea', 'techStack', 'experience', 'github'],},
  challenge: {title: 'Challenge Submission',fields: ['fullName', 'email', 'phone', 'solution', 'approach', 'techStack', 'estimatedTime', 'portfolio'],},
  collaboration: {title: 'Collaboration Proposal',fields: ['fullName', 'email', 'phone', 'organization', 'proposalTitle', 'description', 'collaborationType', 'budget', 'timeline'],},
  fellowship: {title: 'Fellowship Application',fields: ['fullName', 'email', 'phone', 'currentPosition', 'institution', 'researchArea', 'publications', 'cv'],},
  research_grant: {title: 'Research Grant Application',fields: ['fullName', 'email', 'phone', 'projectTitle', 'abstract', 'methodology', 'expectedOutcomes', 'budgetRequest'],},
  startup_incubation: {title: 'Startup Incubation Application',fields: ['fullName', 'email', 'phone', 'companyName', 'industry', 'stage', 'pitchDeck', 'funding', 'teamSize'],},
  tech_partnership: {title: 'Tech Partnership Proposal',fields: ['fullName', 'email', 'phone', 'companyName', 'partnershipType', 'proposal', 'expectedBenefits', 'website'],},
  global_exchange: {title: 'Global Exchange Program',fields: ['fullName', 'email', 'phone', 'university', 'program', 'destination', 'duration', 'motivation'],},
  other_opportunity: {title: 'Opportunity Application',fields: ['fullName', 'email', 'phone', 'opportunityType', 'details', 'background'],},
  dev_team: {title: 'Join Development Team',fields: ['fullName', 'email', 'phone', 'position', 'yearsExperience', 'expectedSalary', 'workMode', 'resume', 'portfolio', 'linkedIn', 'github', 'technicalSkills', 'availability', 'coverLetter'],},
};

const fieldLabels: Record<string, string> = {
  fullName: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  university: 'University',
  program: 'Program/Major',
  yearOfStudy: 'Year of Study',
  department: 'Department',
  expectedStartDate: 'Expected Start Date',
  skills: 'Skills',
  motivation: 'Motivation',
  resume: 'Resume',
  teamName: 'Team Name',
  teamSize: 'Team Size',
  projectIdea: 'Project Idea',
  techStack: 'Tech Stack',
  experience: 'Experience',
  github: 'GitHub Profile',
  solution: 'Solution Description',
  approach: 'Approach',
  estimatedTime: 'Estimated Time',
  portfolio: 'Portfolio URL',
  organization: 'Organization',
  proposalTitle: 'Proposal Title',
  description: 'Description',
  collaborationType: 'Collaboration Type',
  budget: 'Budget',
  timeline: 'Timeline',
  currentPosition: 'Current Position',
  institution: 'Institution',
  researchArea: 'Research Area',
  publications: 'Publications',
  cv: 'CV/Resume',
  projectTitle: 'Project Title',
  abstract: 'Abstract',
  methodology: 'Methodology',
  expectedOutcomes: 'Expected Outcomes',
  budgetRequest: 'Budget Request',
  companyName: 'Company Name',
  industry: 'Industry',
  stage: 'Stage',
  pitchDeck: 'Pitch Deck Summary',
  funding: 'Funding Status',
  partnershipType: 'Partnership Type',
  proposal: 'Proposal',
  expectedBenefits: 'Expected Benefits',
  website: 'Website',
  destination: 'Destination',
  duration: 'Duration',
  opportunityType: 'Opportunity Type',
  details: 'Details',
  background: 'Background',
  position: 'Position',
  yearsExperience: 'Years of Experience',
  expectedSalary: 'Expected Salary',
  workMode: 'Work Mode',
  linkedIn: 'LinkedIn Profile',
  technicalSkills: 'Technical Skills',
  availability: 'Availability Date',
  coverLetter: 'Cover Letter',
};

export const UnifiedApplyForm: React.FC<UnifiedApplyFormProps> = ({
  formType,
  targetId,
  targetTitle,
  onSuccess,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Team member registration state (for hackathon)
  const [isTeamRegistration, setIsTeamRegistration] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; email: string; role: string }>>([]);
  const MAX_TEAM_SIZE = 5;
  const MIN_TEAM_SIZE = 2;

  const config = formConfigs[formType];
  const schema = formSchemas[formType];

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // Team member functions
  const addTeamMember = () => {
    if (teamMembers.length < MAX_TEAM_SIZE - 1) {
      setTeamMembers([...teamMembers, { name: '', email: '', role: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const handleFileUpload = async (file: File, fieldName: string) => {
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('relatedModel', 'Application');
      
      const response = await fileApi.upload(formData);
      
      if (response.success && response.data) {
        setUploadedFiles(prev => ({ ...prev, [fieldName]: response.data._id }));
        toast({
          title: "File uploaded",
          description: `${file.name} uploaded successfully`,
        });
        return response.data._id;
      } else {
        throw new Error(response.error || 'Upload failed');
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : 'Please try again',
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const onSubmit = async (data: any) => {
    // Validate team members for hackathon
    if (formType === 'hackathon' && isTeamRegistration) {
      if (teamMembers.length < MIN_TEAM_SIZE - 1) {
        toast({
          title: 'Team Required',
          description: `Teams must have at least ${MIN_TEAM_SIZE} members (including you).`,
          variant: 'destructive',
        });
        return;
      }
      const invalidMembers = teamMembers.some(m => !m.name || !m.email || !m.role);
      if (invalidMembers) {
        toast({
          title: 'Incomplete Team Info',
          description: 'Please fill in all team member details.',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const applicationData = {
        ...data,
        formType,
        targetId,
        targetTitle,
        uploadedFileIds: uploadedFiles,
        // Include team members for hackathon
        ...(formType === 'hackathon' && isTeamRegistration && {
          isTeam: true,
          teamMembers: teamMembers,
          teamSize: (teamMembers.length + 1).toString(),
        }),
      };

      const response = await apiService.post('/applications', applicationData);

      if (response.success) {
        toast({
          title: 'Success!',
          description: 'Your application has been submitted successfully.',
        });
        form.reset();
        setUploadedFiles({});
        setTeamMembers([]);
        setIsTeamRegistration(false);
        onSuccess?.();
      } else {
        throw new Error(response.error || 'Submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldName: string) => {
    const label = fieldLabels[fieldName] || fieldName;

    // Date picker for expectedStartDate and availability
    if (fieldName === 'expectedStartDate' || fieldName === 'availability') {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label} *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // Work mode radio group for dev_team
    if (fieldName === 'workMode') {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{label} *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="remote" />
                    </FormControl>
                    <FormLabel className="font-normal">Remote</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hybrid" />
                    </FormControl>
                    <FormLabel className="font-normal">Hybrid</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="onsite" />
                    </FormControl>
                    <FormLabel className="font-normal">On-site</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // Select dropdowns
    if (fieldName === 'yearOfStudy' || fieldName === 'teamSize' || fieldName === 'stage' || fieldName === 'collaborationType' || fieldName === 'partnershipType' || fieldName === 'position' || fieldName === 'yearsExperience') {
      const options = {
        yearOfStudy: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'],
        teamSize: ['1', '2', '3', '4', '5+'],
        stage: ['Idea', 'MVP', 'Early Stage', 'Growth'],
        collaborationType: ['Research', 'Development', 'Joint Venture', 'Sponsorship'],
        partnershipType: ['Technology', 'Research', 'Marketing', 'Distribution'],
        position: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'DevOps Engineer', 'Mobile Developer', 'QA Engineer', 'UI/UX Designer', 'Data Engineer'],
        yearsExperience: ['0-1 years', '1-3 years', '3-5 years', '5-7 years', '7-10 years', '10+ years'],
      };

      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label} *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options[fieldName as keyof typeof options]?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // Textarea fields
    if (['motivation', 'projectIdea', 'solution', 'approach', 'description', 'abstract', 'methodology', 'pitchDeck', 'proposal', 'details', 'background', 'technicalSkills', 'coverLetter'].includes(fieldName)) {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label} *</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} placeholder={`Enter your ${label.toLowerCase()}`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // File upload fields
    if (fieldName === 'resume' || fieldName === 'cv') {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        await handleFileUpload(file, fieldName);
                      }
                    }}
                    disabled={uploadingFile}
                  />
                  {uploadingFile ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : uploadedFiles[fieldName] ? (
                    <div className="text-green-500 text-sm">✓ Uploaded</div>
                  ) : (
                    <Upload className="h-5 w-5 opacity-50" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label} {!fieldName.includes('phone') && !fieldName.includes('github') && !fieldName.includes('portfolio') && !fieldName.includes('publications') && !fieldName.includes('budget') && !fieldName.includes('funding') && !fieldName.includes('website') ? '*' : ''}</FormLabel>
            <FormControl>
              <Input {...field} type={fieldName === 'email' ? 'email' : 'text'} placeholder={`Enter your ${label.toLowerCase()}`} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">{config.title}</h2>
      {targetTitle && (
        <p className="text-gray-300 mb-6">
          Applying for: <span className="font-semibold text-white">{targetTitle}</span>
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.fields.map((fieldName) => renderField(fieldName))}
          </div>

          {/* Team Member Registration (Hackathon only) */}
          {formType === 'hackathon' && (
            <div className="space-y-4 border border-white/10 rounded-lg p-4 bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="teamRegistration"
                    checked={isTeamRegistration}
                    onChange={(e) => setIsTeamRegistration(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800"
                  />
                  <label htmlFor="teamRegistration" className="text-white font-medium">
                    Registering as a team?
                  </label>
                </div>
                {isTeamRegistration && (
                  <span className="text-sm text-gray-400">
                    {teamMembers.length + 1}/{MAX_TEAM_SIZE} members
                  </span>
                )}
              </div>

              {isTeamRegistration && (
                <div className="space-y-4 mt-4">
                  {/* Team Leader Notice */}
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm font-medium text-blue-400">Team Leader (You)</p>
                    <p className="text-xs text-gray-400">Your details from the form above</p>
                  </div>

                  {/* Team Members List */}
                  {teamMembers.map((member, index) => (
                    <div key={index} className="p-3 border border-gray-700 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Member {index + 2}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input
                          placeholder="Full Name *"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                          className="bg-gray-800 border-gray-700"
                        />
                        <Input
                          placeholder="Email *"
                          type="email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                          className="bg-gray-800 border-gray-700"
                        />
                        <Select
                          value={member.role}
                          onValueChange={(v) => updateTeamMember(index, 'role', v)}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Role *" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="designer">Designer</SelectItem>
                            <SelectItem value="pm">Project Manager</SelectItem>
                            <SelectItem value="data">Data Scientist</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  {/* Add Member Button */}
                  {teamMembers.length < MAX_TEAM_SIZE - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTeamMember}
                      className="w-full border-dashed border-gray-600 text-gray-400 hover:text-white"
                    >
                      + Add Team Member
                    </Button>
                  )}

                  {/* Validation Message */}
                  {isTeamRegistration && teamMembers.length < MIN_TEAM_SIZE - 1 && (
                    <p className="text-sm text-yellow-400">
                      ⚠️ Teams must have at least {MIN_TEAM_SIZE} members (including you)
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4 justify-end pt-6 border-t border-white/10">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
