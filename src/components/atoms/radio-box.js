import React from "react";
import styled from "styled-components";
import Error from "./error";

const Wrapper = styled.div``;
const Label = styled.label``;
const InputArea = styled.input``;
const OptionWrapper = styled.div``;
export default function RadioBox({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  name,
  options,
  errors,
}) {
  const checked = (current, value) => {
    if (value === undefined || current === undefined) return false;
    if (value === current) {
      return true;
    }
    if (typeof value === "boolean" || typeof current === "boolean") {
      if (value.toString() === current.toString()) {
        return true;
      }
    }
    return false;
  };
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      {options.map((opt) => (
        <>
          <input
            name={opt.name}
            value={opt.value}
            type={type || "radio"}
            onChange={onChange}
            disabled={disabled}
            checked={checked(value, opt.value)}
          ></input>
          <Label>{opt.name}</Label>
        </>
      ))}
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
