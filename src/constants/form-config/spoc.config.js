import { FIELD_TYPE } from "..";

export const SpocFormConfig = ({
  companyList,
  getCompany,
  createCompany,
  recruiterList,
  getRecruiter,
}) => ({
  name: "Profile",
  config: [
    {
      label: "Name",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "phone",
      key: "phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Company",
      key: "company",
      type: FIELD_TYPE.SINGLESELECT,
      options: companyList,
      getList: getCompany,
      onCreate: createCompany,
      labelKey: "name",
    },
    {
      label: "Owner",
      key: "owner",
      type: FIELD_TYPE.SINGLESELECT,
      options: recruiterList,
      getList: getRecruiter,
      labelKey: "name",
    },
    {
      label: "Recruiters",
      key: "recruiters",
      type: FIELD_TYPE.MULTISELECT,
      options: recruiterList,
      getList: getRecruiter,
      labelKey: "name",
    },
    {
      label: "Status",
      key: "status",
      type: FIELD_TYPE.INPUT,
      placeholder: "Only Enter Active/InActive",
    },
  ],
});

export const SpocFilterConfig = ({
  companyList,
  getCompany,
  createCompany,
  recruiterList,
  getRecruiter,
}) => ({
  name: "Profile",
  config: [
    {
      label: "Name",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Phone",
      key: "phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Company",
      key: "company",
      type: FIELD_TYPE.MULTISELECT,
      options: companyList,
      getList: getCompany,
      onCreate: createCompany,
      labelKey: "name",
    },
    {
      label: "Owner",
      key: "owner",
      type: FIELD_TYPE.MULTISELECT,
      options: recruiterList,
      getList: getRecruiter,
      labelKey: "name",
    },
    {
      label: "Recruiters",
      key: "recruiters",
      type: FIELD_TYPE.MULTISELECT,
      options: recruiterList,
      getList: getRecruiter,
      labelKey: "name",
    },
  ],
});
