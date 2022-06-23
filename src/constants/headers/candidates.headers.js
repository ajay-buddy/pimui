export const candidateHeaders = [
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
    label: "Skills",
    key: "profile_tags",
    joinkey: "name",
  },

  {
    label: "Resume",
    key: "resumeUrl",
    type: "Download",
  },
];

export const candidateStatusHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Updated At",
    key: "createdAt",
  },
  {
    label: "Updated By",
    key: "createdBy",
  }
];
