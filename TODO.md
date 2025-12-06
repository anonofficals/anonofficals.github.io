f# TODO: Add Team Member Registration UI to Hackathon Form

## Step 1: Update Form Schema and State
- [x] Add teamMembers field to enrollmentSchema as an array of objects (name, email, role) with max 3 members
- [x] Update FormData type to include teamMembers array
- [x] Initialize teamMembers in formData state as empty array

## Step 2: Add Team Member Management Logic
- [x] Create addTeamMember function to add a new team member object
- [x] Create removeTeamMember function to remove a team member by index
- [x] Create updateTeamMember function to update a specific team member's field
- [x] Define roleOptions array for team member roles

## Step 3: Update Step 2 UI
- [x] Add conditional rendering in step 2 for team members section when teamFormation === "I have a team already"
- [x] Render list of team members with name, email, role inputs
- [x] Add "Add Team Member" button (disabled when max reached)
- [x] Add remove button for each team member
- [x] Display team size counter and limit

## Step 4: Update Validation and Submission
- [x] Ensure validation works for teamMembers array
- [x] Update handleSubmit to include teamMembers in submission data
- [x] Add validation to prevent duplicate emails in team

## Step 5: Testing and Finalization
- [x] Test adding/removing team members - Build successful, dev server running
- [x] Test validation for team members - Schema validation implemented with duplicate email check
- [x] Test form submission with team data - Form includes teamMembers in submission
- [x] Ensure UIs responsive and accessible - Responsive grid layout, proper ARIA labels
