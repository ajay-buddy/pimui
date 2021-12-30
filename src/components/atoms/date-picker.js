import React from "react";
import styled from "styled-components";
import Error from "./error";

const Wrapper = styled.div``;
const Label = styled.label``;
const InputArea = styled.input``;

export default function DatePicker({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  name,
  errors,
}) {
  return (
    <Wrapper>
      <div>{label && <Label>{label}</Label>}</div>
      <div>
        <InputArea
          name={name}
          value={value}
          type={type || "date"}
          onChange={onChange}
          placeholder={placeholder || ""}
          disabled={disabled}
        ></InputArea>
      </div>
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
