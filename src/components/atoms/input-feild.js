import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Error from "./error";

const Wrapper = styled.div``;
const Label = styled.label``;
const InputArea = styled.input``;

export default function InputFeild({
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
      {/* <div>{label && <Label>{label}</Label>}</div> */}
      <div>
        <TextField
          required
          id="outlined-required"
          label={label}
          placeholder={placeholder || ""}
          onChange={onChange}
          disabled={disabled}
        />
        {/* <InputArea
          name={name}
          value={value}
          type={type || "input"}
          onChange={onChange}
          placeholder={placeholder || ""}
          disabled={disabled}
        ></InputArea> */}
      </div>
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
