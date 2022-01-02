import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Error from "../atoms/error";
import {
  getAutoCompleteSearchRequest,
  resetAutoCompleteSearch,
  autoCompleteDataSelector,
  addTagRequest,
} from "../../app/profileSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AutoSelect({
  getlable,
  label,
  createApi,
  onChange,
  searchConfig,
  listner,
  multiple,
  variant,
  errors,
  value,
}) {
  const [values, setValues] = useState([]);
  const autoCompleteData = useSelector(autoCompleteDataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value && value.length && (!values || !values.length)) {
      setValues(value);
    }
  }, [value]);

  useEffect(
    () =>
      dispatch(
        getAutoCompleteSearchRequest({
          type: searchConfig.type,
          filterData: [
            {
              key: searchConfig.key,
              value: getlable(listner),
            },
          ],
        })
      ),
    [listner]
  );
  return (
    <>
      <Autocomplete
        multiple={multiple || false}
        id="tags-standard"
        options={autoCompleteData.filter((d) =>
          Array.isArray(values) ? !values.includes(d.id) : values
        )}
        getOptionLabel={getlable}
        // defaultValue={[top100Films[13]]}
        value={values}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant || "standard"}
            label={label}
            placeholder={label}
          />
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            // Prevent's default 'Enter' behavior.
            event.defaultMuiPrevented = true;

            if (
              !event.target.value ||
              autoCompleteData.filter((d) => event.target.value === getlable(d))
                .length > 0
            )
              return;

            createApi(event.target.value);
          }
        }}
        onInputChange={(e) => {
          if (!e.target.value) return;
          if (e.target.value.length < 3) return;
          dispatch(
            getAutoCompleteSearchRequest({
              type: searchConfig.type,
              filterData: [
                {
                  key: searchConfig.key,
                  value: e.target.value,
                },
              ],
            })
          );
        }}
        onChange={(e, v) => {
          setValues(v);
          const data = Array.isArray(v) ? v.map((d) => d.id) : v;

          onChange(data);
        }}
      />
      {errors && errors.length > 0 && <Error messages={errors} />}
    </>
  );
}
