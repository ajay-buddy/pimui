export const jobBulkHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Skills",
    key: "job_tags",
    joinkey: "name",
  },
  {
    label: "Priority",
    key: "priority",
  },
  {
    label: "Req Date",
    key: "req_date",
  },
  {
    label: "Req Id",
    key: "req_id",
  },
  {
    label: "Spoc",
    key: "spoc.name",
    joinkey: "name",
  },
  {
    label: "Submitted By",
    key: "submitted_by",
  },
  {
    label: "Type",
    key: "type",
  },
];
