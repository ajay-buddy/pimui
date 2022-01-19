export const applicationHeaders = [
  {
    label: "Candidate Name",
    key: "applicant.name",
  },
  {
    label: "Job",
    key: "job.name",
  },
  {
    label: "Last Action",
    key: "logs",
    joinkey: "action.name",
    showLastValue: true,
  },
];
