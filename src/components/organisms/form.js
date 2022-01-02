import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { Button } from "@material-ui/core";
import InputFeild from "../../components/atoms/input-feild";
import Select from "../../components/atoms/select";
import DatePicker from "../atoms/date-picker";
import RadioBox from "../atoms/radio-box";
import TextBox from "../atoms/text-box";
import Validate from "../../validations/validation";
import RadioBoxBuilder from "../atoms/radio-box-builder";
import { addTagRequest, addTagSelector } from "../../app/profileSlice";
import AutoSelect from "../atoms/autoselect";
import { TrendingUpRounded } from "@material-ui/icons";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ContentWrapper = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: default;
`;

export default function Form(props) {
  const {
    formConfig,
    values,
    onCancel,
    onSubmit,
    formValues,
    onChangeshow,
    onClose,
    show,
    onChange,
  } = props;

  const [errors, setErrors] = useState([]);
  const tagSelector = useSelector(addTagSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    formConfig.forEach((config, index) => {
      if (!config.validations) return;
      validationErrors[index] = Validate(
        config.validations,
        values[config.key],
        values
      );
      setErrors(validationErrors);
    });
    for (let i = 0; i < validationErrors.length; i++) {
      if (validationErrors[i] && validationErrors[i].length > 0) {
        return;
      }
    }
    onSubmit(formValues);
  };
  if (!show) return null;

  return (
    <Wrapper>
      <ContentWrapper show={show}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <form onSubmit={handleSubmit}>
          {formConfig &&
            formConfig.length > 0 &&
            formConfig.map((config, index) => {
              const obj = {
                value: values[config.key],
                onChange: (event) => {
                  const data = { ...values };
                  if (event && event.target) {
                    data[config.key] = event.target.value;
                  } else {
                    data[config.key] = event;
                  }
                  onChange(data);
                },
              };
              const buildTagConfig = () => {
                return {
                  value: values[config.key],
                  getlable: (opt) => opt?.name,
                  label: "Tags",
                  createApi: (value) =>
                    dispatch(addTagRequest({ name: value })),
                  listner: tagSelector,
                  searchConfig: { type: "TAG-SEARCH", key: "name" },
                  onChange: (value) => {
                    const data = { ...values };
                    data[config.key] = value;
                    onChange(data);
                  },
                  multiple: true,
                  variant: "outlined",
                };
              };
              const objBuilder = {
                value: values[config.key],
                onChange: (event, val) => {
                  let data = values[config.key] ? [...values[config.key]] : [];

                  if (event.target.value === "on") {
                    data.push(val);
                  } else {
                    data = data.filter((d) => d === val);
                  }
                  const updatedData = { ...values };
                  updatedData[config.key] = data;
                  onChange(updatedData);
                },
              };
              const err = errors[index] || [];
              switch (config.feildType) {
                case "INPUTFEILD":
                  return <InputFeild {...config} {...obj} errors={err} />;
                case "SELECT":
                  return <Select {...config} {...obj} errors={err} />;
                case "RADIO":
                  return <RadioBox {...config} {...obj} errors={err} />;
                case "TEXTBOX":
                  return <TextBox {...config} {...obj} errors={err} />;
                case "DATEFEILD":
                  return <DatePicker {...config} {...obj} errors={err} />;
                case "RADIO-BUILD-OPTION":
                  return <AutoSelect {...buildTagConfig()} errors={err} />;
              }
            })}
          <Button onClick={onClose}>CANCEL</Button>
          <Button onClick={handleSubmit}>SAVE</Button>
        </form>
      </ContentWrapper>
    </Wrapper>
  );
}
