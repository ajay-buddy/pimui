import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Error from "./error";
import { addTagRequest } from "../../app/profileSlice";

const Wrapper = styled.div``;
const Label = styled.label``;
const InputArea = styled.input``;
const OptionWrapper = styled.div``;
export default function RadioBoxBuilder({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  name,
  options,
  errors,
  builder,
}) {
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();

  const checked = (current, value) => {
    if (value === undefined || current === undefined) return false;
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].id === current) return true;
        if (value[i] === current) return true;
      }
    }
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
      <div>
        {builder.map((opt) => (
          <>
            <input
              name={opt.name}
              // value={opt.id}
              type={type || "radio"}
              onChange={(e) => onChange(e, opt)}
              // onChange={(e) => console.log(e.target.value)}
              disabled={disabled}
              checked={checked(opt.id, value)}
              multiple={true}
            ></input>
            <Label value={opt.id}>{opt.name}</Label>
          </>
        ))}
      </div>
      <div>
        <input
          type="input"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          disabled={!tag}
          onClick={() => {
            dispatch(addTagRequest({ name: tag }));
            setTag("");
          }}
        >
          Create Tag
        </Button>
      </div>
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
