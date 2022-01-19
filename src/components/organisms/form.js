import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AutoSelect from "../molecules/auto-select";
import { FIELD_TYPE } from "../../constants";
import AutoSelectSingle from "../molecules/auto-select-single";

const getFeild = ({
  downloadKey,
  contentAllowed,
  onFileUpload,
  label,
  type,
  placeholder,
  mutedText,
  value,
  onChange,
  key,
}) => {
  if (type === FIELD_TYPE.DATE) {
    console.log(value, key);
    // value[key] = new Date(value[key]);
    // value[key] = value[key]?.toLocaleDateString();
  }
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        accept={contentAllowed ? contentAllowed : ""}
        placeholder={placeholder}
        value={value[key] || ""}
        onChange={(e) => {
          if (onFileUpload) {
            const file = e.target.files[0];
            onFileUpload(file);
          } else {
            const data = { ...value };
            data[key] = e.target.value;
            onChange(data);
          }
        }}
      />
      {downloadKey && value[downloadKey] && (
        <a
          href={`https://ats-profile-picture.s3.ap-south-1.amazonaws.com/${value[downloadKey]}`}
          download={value[downloadKey]}
        >
          Download
        </a>
      )}
      {mutedText && <Form.Text className="text-muted">{mutedText}</Form.Text>}
    </Form.Group>
  );
};

const getButton = ({
  label,
  type,
  placeholder,
  mutedText,
  value,
  onChange,
}) => {
  return (
    <Button variant="primary" type={type} onClick={onChange}>
      {label}
    </Button>
  );
};

const renderFeild = ({
  downloadKey,
  contentAllowed,
  onFileUpload,
  label,
  type,
  placeholder,
  mutedText,
  value,
  onChange,
  onCreate,
  options,
  getList,
  key,
  labelKey,
}) => {
  switch (type) {
    case FIELD_TYPE.INPUT:
    case FIELD_TYPE.DATE:
    case FIELD_TYPE.NUMBER:
    case FIELD_TYPE.FILE:
      return getFeild({
        downloadKey,
        contentAllowed,
        onFileUpload,
        label,
        type,
        placeholder,
        mutedText,
        value,
        onChange,
        key,
      });
    case FIELD_TYPE.MULTISELECT:
      return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {label && <Form.Label>{label}</Form.Label>}
          <AutoSelect
            {...{
              label,
              type,
              placeholder,
              mutedText,
              value,
              onChange,
              onCreate,
              options,
              getList,
              findKey: key,
              labelKey,
            }}
          />
          {mutedText && (
            <Form.Text className="text-muted">{mutedText}</Form.Text>
          )}
        </Form.Group>
      );
    case FIELD_TYPE.SINGLESELECT:
      return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {label && <Form.Label>{label}</Form.Label>}
          <AutoSelectSingle
            {...{
              label,
              type,
              placeholder,
              mutedText,
              value,
              onChange,
              onCreate,
              options,
              getList,
              findKey: key,
              labelKey,
            }}
          />
          {mutedText && (
            <Form.Text className="text-muted">{mutedText}</Form.Text>
          )}
        </Form.Group>
      );
    case FIELD_TYPE.SUBMIT:
      return getButton({
        label,
        type,
        placeholder,
        mutedText,
        value,
        onChange,
      });
  }
};

export default function CustomForm({
  name,
  config,
  onChange,
  value,
  onSubmit,
}) {
  return (
    <div>
      {config && (
        <Form>
          {config.map((c) => renderFeild({ ...c, onChange, value }))}
          <Button
            variant="primary"
            type={"submit"}
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {"Submit"}
          </Button>
        </Form>
      )}
    </div>
  );
}
