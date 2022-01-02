import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, FormControl, Input } from "@material-ui/core";
import {
  profileSelector,
  getProfileRequest,
  addProfileRequest,
  addExperienceRequest,
  getExperienceRequest,
  getExperienceSelector,
  getProjectSelector,
  getProjectRequest,
  addProjectRequest,
  getEducationSelector,
  getEducationRequest,
  addEducationRequest,
  getUploadImageSelector,
  getImageUrlRequest,
  getTagSelector,
  getTagRequest,
  addTagRequest,
  getApplicationRequest,
  applicationCountSelector,
  getApplicationSelector,
} from "../app/profileSlice";
import history from "../history";
import Model from "../components/molecules/model";
import ProfileImage from "../components/atoms/profile-image";
import Form from "../components/organisms/form";
import ProfileBar from "../components/molecules/profile-bar";
import EducationSection from "../components/molecules/education-section";
import ExperienceSection from "../components/molecules/experience-section";
import ProjectSection from "../components/molecules/project-section";
import axios from "axios";

const S3URL = "https://ats-profile-picture.s3.ap-south-1.amazonaws.com/";
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Profile(props) {
  const classes = useStyles();
  const [showModel, setShowModel] = useState(false);

  const [profile, setProfile] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);

  const [experience, setExperience] = useState({});
  const [experienceList, setExperienceList] = useState([]);
  const [addExperience, setAddExperience] = useState(false);
  const [experienceFetched, setExperienceFetched] = useState(false);

  const [project, setProject] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [projectFetched, setProjectFetched] = useState(false);

  const [education, setEducation] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [addEducation, setAddEducation] = useState(false);
  const [educationFetched, setEducationFetched] = useState(false);

  const profileData = useSelector(profileSelector);
  const experienceData = useSelector(getExperienceSelector);
  const projectData = useSelector(getProjectSelector);
  const educationData = useSelector(getEducationSelector);
  const tagData = useSelector(getTagSelector);

  const applicationList = useSelector(getApplicationSelector);
  const applicationCount = useSelector(applicationCountSelector);

  const imageUploadData = useSelector(getUploadImageSelector);
  const [fileData, setFileData] = useState(null);

  // useEffect(async () => {
  //   if(fileData) {
  //     await axios.post(imageUploadData, fileData);
  //     setFileData(null);
  //   }
  // }, [imageUploadData])

  const id = props?.match?.params?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProfileRequest(id));
    } else {
      dispatch(getProfileRequest());
    }
    dispatch(getTagRequest());
    dispatch(getApplicationRequest());
  }, []);

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      if (profileData.belongs_to) {
        !experienceFetched &&
          dispatch(getExperienceRequest(profileData.belongs_to.id));
        setExperienceFetched(true);
      }
      if (profileData.belongs_to) {
        !projectFetched &&
          dispatch(getProjectRequest(profileData.belongs_to.id));
        setProjectFetched(true);
      }
      if (profileData.belongs_to) {
        !educationFetched &&
          dispatch(getEducationRequest(profileData.belongs_to.id));
        setEducationFetched(true);
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (experienceData) {
      setExperienceList(experienceData);
    }
  }, [experienceData]);

  useEffect(() => {
    if (projectData) {
      setProjectList(projectData);
    }
  }, [projectData]);

  useEffect(() => {
    if (educationData) {
      setEducationList(educationData);
    }
  }, [educationData]);

  const fields = [
    {
      name: "First Name",
      label: "First Name",
      key: "first_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter First Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Last Name",
      label: "Last Name",
      key: "last_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Last Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Gender",
      label: "Gender",
      key: "gender",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "Male",
          value: "Male",
        },
        {
          name: "Female",
          value: "Female",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Father Name",
      label: "Father Name",
      key: "f_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Father Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Mother Name",
      label: "Mother Name",
      key: "m_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Mother Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "PAN Number",
      label: "PAN Number",
      key: "pan_number",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter PAN Number",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Adhar Number",
      label: "Adhar Number",
      key: "adhar_number",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Adhar Number",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "DOB",
      label: "DOB",
      key: "dob",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Phone Number",
      label: "Phone Number",
      key: "phone",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Phone Number",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Area Code / PIN Code",
      label: "Area Code / PIN Code",
      key: "code",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Area Code",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Alternate Phone Number",
      label: "Alternate Phone Number",
      key: "alternatePhone",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Alternate Phone Number",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Email",
      label: "Email",
      key: "email",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Email",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "City",
      label: "City",
      key: "city",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter City",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "State",
      label: "State",
      key: "state",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter State",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Country",
      label: "Country",
      key: "country",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Country",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      label: "Preffered Job Type",
      key: "job_type",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "FULL TIME",
          value: "FULL_TIME",
        },
        {
          name: "PART TIME",
          value: "PART_TIME",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Active",
      label: "Active",
      key: "active",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "YES",
          value: true,
        },
        {
          name: "NO",
          value: false,
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Profile Tags",
      label: "Profile Tags",
      key: "profile_tags",
      type: "radio",
      feildType: "RADIO-BUILD-OPTION",
      builder: tagData,
      placeholder: "Enter Profile Tags",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
  ];

  const experienceFeild = [
    {
      name: "Start Date",
      label: "Start Date",
      key: "start",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "End Date",
      label: "End Date",
      key: "end",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Description",
      label: "Description",
      key: "description",
      type: "text",
      placeholder: "Enter Description",
      feildType: "TEXTBOX",
      rows: 4,
      cols: 50,
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Company Name",
      label: "Company Name",
      key: "company_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Company Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      label: "Project Type",
      key: "type",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "FULL TIME",
          value: "FULL_TIME",
        },
        {
          name: "PART TIME",
          value: "PART_TIME",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Is Present Company",
      label: "Is Present Company",
      key: "is_present",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "YES",
          value: "true",
        },
        {
          name: "NO",
          value: "false",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Experience Tags",
      label: "Experience Tags",
      key: "experience_tags",
      type: "radio",
      feildType: "RADIO-BUILD-OPTION",
      builder: tagData,
      placeholder: "Enter Experience Tags",
    },
  ];

  const educationFeild = [
    {
      name: "Course",
      key: "name",
      type: "Input",
    },
    {
      name: "Start Date",
      key: "start",
      type: "Input",
    },
    {
      name: "End Date",
      key: "end",
      type: "Input",
    },
    {
      name: "Collage Name",
      key: "collage_name",
      type: "Input",
    },
    {
      name: "University Name",
      key: "university_name",
      type: "Input",
    },
    {
      name: "Type",
      key: "type",
      type: "Input",
    },
  ];

  const projectFeild = [
    {
      name: "Start Date",
      key: "start",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "End Date",
      key: "end",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Description",
      key: "description",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Company Name",
      key: "company_name",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      key: "type",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Is Present",
      key: "is_present",
      type: "Input",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Project Tags",
      key: "project_tags",
      type: "Input",
    },
  ];
  const educationFeild1 = [
    {
      name: "Course Name",
      label: "Course Name",
      key: "name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Course Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Start Date",
      label: "Start Date",
      key: "start",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "End Date",
      label: "End Date",
      key: "end",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Collage Name",
      label: "Collage Name",
      key: "collage_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Collage Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "University Name",
      label: "University Name",
      key: "university_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter University Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      label: "Project Type",
      key: "type",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "FULL TIME",
          value: "FULL_TIME",
        },
        {
          name: "PART TIME",
          value: "PART_TIME",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Education Tags",
      label: "Education Tags",
      key: "education_tags",
      type: "radio",
      feildType: "RADIO-BUILD-OPTION",
      builder: tagData,
      placeholder: "Enter Education Tags",
    },
  ];
  const projectFeild1 = [
    {
      name: "Project Name",
      label: "Project Name",
      key: "name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Project Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Start Date",
      label: "Start Date",
      key: "start",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "End Date",
      label: "End Date",
      key: "end",
      type: "date",
      placeholder: "Enter a Date",
      feildType: "DATEFEILD",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
        {
          type: "DATEGREATER",
          message: "The End date must be after Start date",
          key: "start",
        },
      ],
    },
    {
      name: "Description",
      label: "Description",
      key: "description",
      type: "text",
      placeholder: "Enter Description",
      feildType: "TEXTBOX",
      rows: 4,
      cols: 50,
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Company Name",
      label: "Company Name",
      key: "company_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Company Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      label: "Project Type",
      key: "type",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "FULL TIME",
          value: "FULL_TIME",
        },
        {
          name: "PART TIME",
          value: "PART_TIME",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Project Tags",
      label: "Project Tags",
      key: "project_tags",
      type: "radio",
      feildType: "RADIO-BUILD-OPTION",
      builder: tagData,
      placeholder: "Enter Project Tags",
    },
  ];

  return (
    <>
      <div>
        {updateProfile && (
          <Form
            formConfig={fields}
            values={profile}
            onChange={setProfile}
            show={updateProfile}
            onClose={() => {
              setUpdateProfile(false);
              setProfile({});
            }}
            onSubmit={() => {
              if (profileData && profileData.id) {
                dispatch(addProfileRequest(profile, id));
              } else {
                dispatch(addProfileRequest(profile));
              }

              setProfile({});
              setUpdateProfile(false);
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <ProfileBar
          feilds={fields}
          value={profileData}
          updateAction={() => setUpdateProfile(!updateProfile)}
        />
        <div
          style={{
            width: "100%",
          }}
        >
          <EducationSection
            feilds={educationFeild1}
            value={educationList}
            updateAction={(data) => {
              setAddEducation(!addEducation);
              setEducation(data);
            }}
            newAction={() => setAddEducation(!addEducation)}
          />
          <ExperienceSection
            feilds={experienceFeild}
            value={experienceList}
            updateAction={(data) => {
              setAddExperience(!addExperience);
              setExperience(data);
            }}
            newAction={() => setAddExperience(!addExperience)}
          />
          <ProjectSection
            feilds={projectFeild1}
            value={projectList}
            updateAction={(data) => {
              setAddProject(!addProject);
              setProject(data);
            }}
            newAction={() => setAddProject(!addProject)}
          />
        </div>
      </div>
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => {
            const file = e.target.files[0];
            Object.defineProperty(file, "name", {
              writable: true,
              value: profileData.id,
            });
            setFileData(file, profileData.id);
            dispatch(
              getImageUrlRequest({
                image_name: file.name,
                image_type: file.type,
              })
            );
          }}
        />
        <input
          type="submit"
          onClick={async () => {
            let resp = null;
            if (fileData) {
              try {
                resp = await axios({
                  method: "PUT",
                  data: fileData,
                  url: imageUploadData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  onUploadProgress: (e) => console.log("==>", e),
                });
              } catch (e) {
                console.log(e, e.message);
              }
              // setFileData(null);
            }
          }}
        />
      </form> */}

      <div>
        {addEducation && (
          <Form
            formConfig={educationFeild1}
            values={education}
            onChange={setEducation}
            show={addEducation}
            onClose={() => {
              setAddEducation(false);
              setEducation({});
            }}
            onSubmit={() => {
              const educationData = { ...education };
              if (profileData.belongs_to) {
                educationData.user_id = profileData.belongs_to.id;
              }
              dispatch(addEducationRequest(educationData));
              setEducation({});
              setAddEducation(false);
            }}
          />
        )}
      </div>

      <div>
        {addExperience && (
          <Form
            formConfig={experienceFeild}
            values={experience}
            onChange={setExperience}
            show={addExperience}
            onClose={() => {
              setAddExperience(false);
              setExperience({});
            }}
            onSubmit={() => {
              const experienceData = { ...experience };
              if (profileData.belongs_to) {
                experienceData.user_id = profileData.belongs_to.id;
              }
              dispatch(addExperienceRequest(experienceData));
              setExperience({});
              setAddExperience(false);
            }}
          />
        )}
      </div>

      <div>
        {addProject && (
          <Form
            formConfig={projectFeild1}
            values={project}
            onChange={setProject}
            show={addProject}
            onClose={() => {
              setAddProject(false);
              setProject({});
            }}
            onSubmit={() => {
              const projectData = { ...project };
              if (profileData.belongs_to) {
                projectData.user_id = profileData.belongs_to.id;
              }
              dispatch(addProjectRequest(projectData));
              setProject({});
              setAddProject(false);
            }}
          />
        )}
      </div>
    </>
  );
}
