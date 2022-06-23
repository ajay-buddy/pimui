import { FIELD_TYPE } from "..";

export const AdminProfileFormConfig = ({ managerList, getManager }) => ({
  name: "Profile",
  config: [
    {
      label: "Name [Full Name]",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Employee Code",
      key: "emp_code",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Manager",
      key: "manager",
      type: FIELD_TYPE.SINGLESELECT,
      options: managerList,
      getList: getManager,
      labelKey: "name",
    },
    {
      label: "Status",
      key: "profile_status",
      type: FIELD_TYPE.INPUT,
      placeholder: "Only Enter Active/InActive",
    },
  ],
});
