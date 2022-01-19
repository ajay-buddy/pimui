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
      label: "Phone Number",
      key: "phone",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Current Location",
      key: "c_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Prefered Location/s",
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
      label: "Primary Tags",
      key: "profile_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Sec Tags",
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
      label: "Primary Tags",
      key: "profile_tags",
      type: FIELD_TYPE.MULTISELECT,
      options: tagList,
      onCreate: createTag,
      getList: getTag,
      labelKey: "name",
    },
    {
      label: "Sec Tags",
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
      label: "Current Location",
      key: "c_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Preffered Location",
      key: "p_location",
      type: FIELD_TYPE.INPUT,
    },
    {
      label: "Minimun Experience",
      key: "min_experience",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Experience",
      key: "max_experience",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Current CTC",
      key: "min_current_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Current CTC",
      key: "max_current_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Expected CTC",
      key: "min_expected_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Expected CTC",
      key: "max_expected_ctc",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Minimun Notice Period",
      key: "min_notice",
      type: FIELD_TYPE.NUMBER,
    },
    {
      label: "Maximum Notice Period",
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
