import { FIELD_TYPE } from "..";

export const JobFormConfig = ({
  createTag,
  tagList,
  getTag,
  spocList,
  getSpoc,
}) => ({
  name: "Profile",
  config: [
    {
      label: "Name",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Req ID",
      key: "req_id",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Submited By",
      key: "submited_by",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Priority",
      key: "priority",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Req Date",
      key: "req_date",
      type: FIELD_TYPE.DATE,
    },
    {
      label: "Tags",
      key: "job_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Spoc",
      key: "spoc",
      type: FIELD_TYPE.SINGLESELECT,
      options: spocList,
      getList: getSpoc,
      labelKey: "name",
    },
  ],
});

export const JobFilterConfig = ({
  createTag,
  tagList,
  getTag,
  spocList,
  getSpoc,
}) => ({
  name: "Profile",
  config: [
    // {
    //   label: "Name",
    //   key: "name",
    //   type: FIELD_TYPE.INPUT,
    // },
    {
      label: "Req ID",
      key: "req_id",
      type: FIELD_TYPE.INPUT,
      placeholder: "Enter Multiple Req Ids seprated by comma(,)",
    },
    {
      label: "Submited By",
      key: "submited_by",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Priority",
      key: "priority",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Start Req Date",
      key: "s_req_date",
      type: FIELD_TYPE.DATE,
    },
    {
      label: "End Req Date",
      key: "e_req_date",
      type: FIELD_TYPE.DATE,
    },
    {
      label: "Tags",
      key: "job_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Spoc",
      key: "spoc",
      type: FIELD_TYPE.MULTISELECT,
      options: spocList,
      getList: getSpoc,
      labelKey: "name",
    },
  ],
});
