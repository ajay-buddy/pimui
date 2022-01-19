import React, { useEffect, useState } from "react";

import CreatableSelect from "react-select/creatable";

export default function AutoSelect(props) {
  const handleChange = (newValue, actionMeta) => {
    // console.group("Value Changed");
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // if (actionMeta.action === "create-option") {
    //   console.log(actionMeta);
    //   props.onCreate(actionMeta.option.label);
    // }
    const updated = { ...props.value };
    updated[props.findKey] = newValue;

    props.onChange({ ...updated });
    console.groupEnd();
  };
  return (
    <CreatableSelect
      isMulti
      onInputChange={(value) => {
        props.getList(value);
      }}
      value={props.value[props.findKey]?.map((d) => {
        if (!d.label) {
          return { label: d[props.labelKey], value: d };
        } else {
          return d;
        }
      })}
      onChange={handleChange}
      options={props.options?.map((d) => ({
        label: d[props.labelKey],
        value: d,
      }))}
    />
  );
}
