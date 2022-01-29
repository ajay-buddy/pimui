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
      label: props.getLable ? props.getLable(value) : value[props.labelKey],
      value: value,
    };
  };
  return (
    <CreatableSelect
      onInputChange={(value) => {
        props.getList(value);
      }}
      value={getValueFromProps(props.value[props.findKey])}
      onChange={handleChange}
      options={props.options?.map((d) => ({
        label: props.getLable ? props.getLable(d) : d[props.labelKey],
        value: d,
      }))}
    />
  );
}
