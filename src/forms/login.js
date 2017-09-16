import React from "react";
import { Formik } from "formik";

// Assign the HoC returned by Formik to a variable
const withFormik = Formik(
  {
    /*...*/
  }
);

// Your form
const LoginForm = props => (
  <form onSubmit={props.handleSubmit}>
    <input
      type="text"
      name="login"
      value={props.values.thing}
      onChange={props.handleChange}
    />
    <input type="submit" value="Submit" />
  </form>
);

// Use HoC by passing your form to it as an argument.
export default withFormik(LoginForm);
