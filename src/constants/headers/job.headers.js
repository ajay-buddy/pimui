import { getDateValue } from "../../utills";

export const jobHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Spoc",
    key: "spoc.name",
  },
  {
    label: "Req ID",
    key: "req_id",
  },
  {
    label: "Submited By",
    key: "submited_by",
  },
  {
    label: "Priority",
    key: "priority",
  },
  {
    label: "Req Date",
    key: "req_date",
    updateValue: getDateValue,
  },
  {
    label: "Tags",
    key: "job_tags",
    joinkey: "name",
  },
];
