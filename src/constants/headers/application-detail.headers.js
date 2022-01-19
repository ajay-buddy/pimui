import { getDateTimeValue } from "../../utills";

export const applicationDetailHeaders = [
  {
    label: "Action",
    key: "action.name",
  },
  {
    label: "Created By",
    key: "profile.name",
  },
  {
    label: "Created At",
    key: "created_at",
    updateValue: getDateTimeValue,
  },
];
