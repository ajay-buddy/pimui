import React from "react";
import CSVReader from "react-csv-reader";
import "./file-importer.css";

export default function FileUploader({ readFunction }) {
  return <CSVReader onFileLoaded={readFunction} />;
}
