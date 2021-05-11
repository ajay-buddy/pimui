import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  open,
  handleClose,
  clientsList,
  studyGroupList,
  clientBinding,
  handleSubmit,
}) {
  const classes = useStyles();
  const [client, setClient] = useState();
  const [studyGroup, setStudyGroup] = useState();
  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Client Bindings</h2>
      <Dropdown
        options={clientsList}
        onChange={({ value }) => setClient(value)}
        value={client || clientBinding.client}
        placeholder="Select an option"
      />
      <Dropdown
        // disabled={true}
        options={studyGroupList}
        onChange={({ value }) => setStudyGroup(value)}
        value={studyGroup || clientBinding.study_group}
        placeholder="Select an option"
      />
      <Button
        disabled={!client && !studyGroup}
        onClick={() => {
          handleSubmit(
            client || clientBinding.client,
            studyGroup || clientBinding.study_group
          );
          handleClose(false);
        }}
      >
        Done
      </Button>
      <Button onClick={() => handleClose(false)}>Close</Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
