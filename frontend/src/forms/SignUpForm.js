import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Form.css";

const SignUpForm = ({ signUp }) => {
  const formInitialVal = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };
  const [formData, setFormData] = useState(formInitialVal);
  const history = useHistory();
  const handleChange = (e) => {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
    setFormData(formInitialVal);
    return history.push("/");
  };

  return (
    <div className="wrapper">
      <Form onSubmit={handleSubmit}>
        <FormGroup tag="fieldset">
          <legend> Sign Up</legend>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstname">FirstName</Label>
            <Input
              type="text"
              id="firstname"
              name="first_name"
              autoComplete="first_name"
              placeholder="FirstName"
              value={formData.first_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">LastName</Label>
            <Input
              type="text"
              id="lastname"
              name="last_name"
              autoComplete="last_name"
              placeholder="Last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
};
export default SignUpForm;
