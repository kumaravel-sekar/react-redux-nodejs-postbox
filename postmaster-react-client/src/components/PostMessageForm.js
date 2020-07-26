import React, { useEffect, useState, setValues } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";

const initialFieldValues = {
  title: "",
  message: "",
};

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  postBtn: {
    width: "50%",
  },
});

const PostMessageForm = ({ classes, ...props }) => {
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.postMessageList.find((x) => x._id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  const validate = () => {
    let temp = { ...errors };
    temp.title = values.title ? "" : "This field is required.";
    temp.message = values.message ? "" : "This fiels is requred.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      window.alert("Submitted successfully");
      resetForm();
    };
    if (validate()) {
      if (props.currentId == 0) props.createPostMessage(values, onSuccess);
      else props.updatePostMessage(props.currentId, values, onSuccess);
    }
  };

  return (
    <form
      autoComplete="no"
      noValidate
      className={` ${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={values.title}
        onChange={handleInputChange}
        {...(errors.title && { error: true, helperText: errors.title })}
      />
      <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        multiline
        rows={4}
        value={values.message}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.postBtn}
      >
        SUBMIT
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostMessageForm));
