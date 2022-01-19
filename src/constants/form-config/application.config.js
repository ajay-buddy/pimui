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
    },
    {
      label: "Job",
      key: "job",
      type: FIELD_TYPE.SINGLESELECT,
      options: jobList,
      getList: getJob,
      labelKey: "name",
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
