import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileCreateRequest, profileListRequest } from "../app/profileSlice";
import { TYPE } from "../constants";
import {
  profileListSelector,
  profileDeleteRequest,
  managerProfileListRequest,
  managerProfileListSelector,
} from "../app/profileSlice/index";
import { adminHeaders } from "../constants/headers/admin.headers";
import ListView from "../components/organisms/tabel/tabel";
import { Button } from "@material-ui/core";
import CustomForm from "../components/organisms/form";
import FileUploader from "../components/molecules/file-importer";
import { readAdmin } from "../utills/bulk-file-reader/admin";
import { CandidateProfileFormConfig } from "../constants/form-config/candidate-profile.config";
import { AdminProfileFormConfig } from "../constants/form-config/admin-profile.config";
import {
  tagListSelector,
  tagCreateRequest,
  tagListRequest,
} from "../app/tagSlice/index";
import { bulkRegisterRequest, registerRequest } from "../app/authSlice";
import { actionListRequest } from "../app/actionSlice";
import Paginate from "../components/molecules/paginate";
import { useHistory } from "react-router-dom";

export default function Admin() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [profileList, profileTotal] = useSelector(profileListSelector);
  const tagList = useSelector(tagListSelector);
  const managerList = useSelector(managerProfileListSelector);

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(userData);

  const createTag = (value) => {
    dispatch(tagCreateRequest(value));
  };

  const getTag = (value) => {
    dispatch(tagListRequest(value));
  };

  const getManager = (value) => {
    dispatch(
      managerProfileListRequest({
        type: TYPE.ADMIN,
        value: value,
      })
    );
  };

  useEffect(() => {
    dispatch(
      profileListRequest({
        type: TYPE.ADMIN,
        query: history?.location?.search,
      })
    );
  }, []);
  return (
    <div>
      <Button variant="Primary" onClick={() => setAdding(!add)}>
        Create Admin
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Admin
      </Button>
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readAdmin(data, filename);
            console.log(result);
            result.forEach((d) => dispatch(bulkRegisterRequest(d)));
            // dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {(edit || add) && (
        <CustomForm
          {...AdminProfileFormConfig({ managerList, getManager })}
          // {...CandidateProfileFormConfig({ createTag, tagList, getTag })}
          onChange={setUserData}
          value={userData}
          onSubmit={() => {
            const data = { ...userData };
            if (data.profile_tags) {
              data["profile_tags"] = data["profile_tags"].map((d) => {
                if (d.__isNew__) {
                  return { name: d.value };
                } else {
                  return d.value || d;
                }
              });
            }

            if (data.profile_stags) {
              data["profile_stags"] = data["profile_stags"].map((d) => {
                if (d.__isNew__) {
                  return { name: d.value };
                } else {
                  return d.value || d;
                }
              });
            }
            if (data.manager) {
              if (data.manager.label) {
                data.manager = data.manager.value;
              }
            }

            if (edit) {
              return dispatch(profileCreateRequest({ ...data }));
            }

            return dispatch(
              registerRequest({
                username: data.email,
                password: "%^VB^^ggY&b",
                user_type: TYPE.ADMIN,
                profile: { ...data },
              })
            );

            // dispatch(profileCreateRequest(data));
          }}
        />
      )}
      <ListView
        headers={adminHeaders}
        list={profileList}
        onDelete={(id) => dispatch(profileDeleteRequest(id))}
        onEdit={(data) => {
          setEditing(true);
          setUserData({ ...data });
        }}
      />
      <Paginate
        total={profileTotal || 0}
        updateFunction={(q) => {
          console.log(q);
          dispatch(profileListRequest({ type: TYPE.ADMIN, query: q }));
        }}
      />
    </div>
  );
}
