import React from "react";
import styled from "styled-components";
import CSVReader from "react-csv-reader";
import "./file-uploader.css";

export default function FileUploader({ onComplete }) {
  return (
    <CSVReader
      onFileLoaded={(data, fileInfo) => {
        onComplete(data);
      }}
    />
  );
}
