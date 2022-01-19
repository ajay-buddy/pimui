import React, { useEffect, useState } from "react";

import CreatableSelect from "react-select/creatable";

export default function AutoSelectSingle(props) {
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
  const getValueFromProps = (value) => {
    if (!value || !props.labelKey || !value[props.labelKey]) {
      return value;
    } else if (value.label) {
      return value;
    }

    return {
      label: value[props.labelKey],
      value: value,
    };
  };
  console.log(
    "===",
    props.value[props.findKey],
    getValueFromProps(props.value[props.findKey])
  );
  return (
    <CreatableSelect
      onInputChange={(value) => {
        props.getList(value);
      }}
      value={getValueFromProps(props.value[props.findKey])}
      onChange={handleChange}
      options={props.options?.map((d) => ({
        label: d[props.labelKey],
        value: d,
      }))}
    />
  );
}
