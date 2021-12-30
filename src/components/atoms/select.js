import React from "react";
import styled from "styled-components";
import Error from "./error";

const Wrapper = styled.div``;
const Label = styled.label``;
const SelectBox = styled.select``;
const Options = styled.option``;
export default function Select({
  name,
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  options,
  errors,
}) {
  return (
    <Wrapper>
      <div>{label && <Label>{label}</Label>}</div>
      <SelectBox
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        disabled={disabled}
      >
        {options.map((opt) => (
          <Options value={opt.value}> {opt.name}</Options>
        ))}
      </SelectBox>
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
