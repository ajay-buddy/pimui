import { FIELD_TYPE } from "..";

export const CandidateProfileFormConfig = ({
  createTag,
  tagList,
  getTag,
  onResumeUpload,
}) => ({
  name: "Profile",
  config: [
    {
      label: "Name [Full Name]",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Phone Number",
      key: "phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Current Location [City Name]",
      key: "c_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Preferred Location [City Name]",
      key: "p_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Experience",
      key: "experience",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Current CTC",
      key: "current_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Expected CTC",
      key: "expected_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Resume Headline",
      key: "headline",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Notice Period",
      key: "notice",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Primary Tags [like Java/Python/React/Angular etc]",
      key: "profile_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Secondary Tags [like SQL/AWS/Cloud/ML/AI etc]",
      key: "profile_stags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Resume",
      key: "resume",
      downloadKey: "resumeUrl",
      type: FIELD_TYPE.FILE,
      onFileUpload: onResumeUpload,
      contentAllowed: ".pdf",
    },
  ],
});

export const CandidateProfileFilterFormConfig = ({
  createTag,
  tagList,
  getTag,
}) => ({
  name: "Profile",
  config: [
    {
      label: "Name [Full Name]",
      key: "name",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Email",
      key: "email",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Primary Tags [like Java/Python/React/Angular etc]",
      key: "profile_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Secondary Tags [like SQL/AWS/Cloud/ML/AI etc]",
      key: "profile_stags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Phone",
      key: "phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Current Location [City Name]",
      key: "c_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Preferred Location [City Name]",
      key: "p_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Minimun Experience IN NUMBERS",
      key: "min_experience",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Experience IN NUMBERS",
      key: "max_experience",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Current CTC IN NUMBERS",
      key: "min_current_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Current CTC IN NUMBERS",
      key: "max_current_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Expected CTC IN NUMBERS",
      key: "min_expected_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Expected CTC IN NUMBERS",
      key: "max_expected_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Notice Period IN NUMBERS",
      key: "min_notice",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Notice Period IN NUMBERS",
      key: "max_notice",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Resume Headline",
      key: "headline",
      type: FIELD_TYPE.INPUT,
    },
  ],
});
