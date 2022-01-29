export const applicationHeaders = [
  {
    label: "Candidate Name",
    key: "applicant.name",
  },
  {
    label: "Candidate Email",
    key: "applicant.email",
  },
  {
    label: "Candidate Phone",
    key: "applicant.phone",
  },
  {
    label: "Job",
    key: "job.name",
  },
  {
    label: "Req Id",
    key: "job.req_id",
  },
  {
    label: "Spoc",
    key: "job.spoc.name",
  },
  // {
  //   label: "Company",
  //   key: "job.spoc.company.name",
  // },
  {
    label: "Last Action",
    key: "logs",
    joinkey: "action.name",
    showLastValue: true,
  },
];
