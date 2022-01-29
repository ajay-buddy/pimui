import { FIELD_TYPE } from "..";

export const ApplicationFormConfig = ({
  candidateList,
  getCandidate,
  jobList,
  getJob,
  actionList,
  getAction,
}) => ({
  name: "Application",
  config: [
    {
      label: "Candidate",
      key: "applicant",
      type: FIELD_TYPE.SINGLESELECT,
      options: candidateList,
      getList: getCandidate,
      labelKey: "name",
      getLable: (data) => `${data.name} ${data.email} ${data.phone}`,
    },
    {
      label: "Job",
      key: "job",
      type: FIELD_TYPE.SINGLESELECT,
      options: jobList,
      getList: getJob,
      labelKey: "name",
      getLable: (data) => `${data.name} ${data.req_id}`,
    },
    {
      label: "Status",
      key: "action",
      type: FIELD_TYPE.SINGLESELECT,
      options: actionList,
      getList: getAction,
      labelKey: "name",
    },
  ],
});

export const ApplicationFilterFormConfig = () => ({
  name: "Application Filter",
  config: [
    {
      label: "Candidate Name",
      key: "applicant_name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "applicant_email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Phone",
      key: "applicant_phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Req Id",
      key: "job_req_id",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Spoc Name",
      key: "job_spoc_name",
      type: FIELD_TYPE.INPUT,
    },
    // {
    //   label: "Company Name",
    //   key: "job_company_name",
    //   type: FIELD_TYPE.INPUT,
    // },
  ],
});
