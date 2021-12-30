import React, { useRef } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Error from "./error";

const Wrapper = styled.div``;
const Label = styled.label``;
const TextArea = styled.textarea`
  resize: none;
`;
export default function TextBox({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  name,
  rows,
  cols,
  errors,
}) {
  const editorRef = useRef(null);
  //   CKEDITOR.replace( 'Resolution', {
  //     height: 400
  // } );
  return (
    <Wrapper>
      <div>{label && <Label>{label}</Label>}</div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          // onInit={(editor) => {
          //   // You can store the "editor" and use when it is needed.
          //   console.log("Editor is ready to use!", editor);
          //   editor.editing.view.change((writer) => {
          //     writer.setStyle(
          //       "height",
          //       "200px",
          //       editor.editing.view.document.getRoot()
          //     );
          //   });
          // }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
      {/* <div>
        <TextArea
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          type={type || "text"}
          onChange={onChange}
          placeholder={placeholder || ""}
          disabled={disabled}
        ></TextArea>
      </div> */}
      {errors && errors.length > 0 && <Error messages={errors} />}
    </Wrapper>
  );
}
