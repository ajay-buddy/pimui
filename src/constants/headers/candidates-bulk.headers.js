export const candidateBulkHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Phone",
    key: "phone",
  },
  {
    label: "User Type",
    key: "belongs_to.user_type",
  },
  {
    label: "Headline",
    key: "headline",
  },
  {
    label: "Other Skills",
    key: "other_skills",
  },
  {
    label: "Experience",
    key: "experience",
  },
  {
    label: "Expected CTC",
    key: "expected_ctc",
  },
  {
    label: "Current CTC",
    key: "current_ctc",
  },
  {
    label: "Current Location",
    key: "c_location",
  },
  {
    label: "Skills",
    key: "profile_tags",
    joinkey: "name",
  },
];
