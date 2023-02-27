import React, { useContext, useState } from "react";
import userContext from "../helpers/userContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import MovieRadarAPI from "../APIs";
import { Link, Navigate, Route } from "react-router-dom";
import "./Form.css";

const Profile = () => {
  const initialVal = { first_name: "", last_name: "", email: "" };
  const [formData, setFormData] = useState(initialVal);
  const { currentUser, setCurrentUser } = useContext(userContext);

  function handleChange(event) {
    setFormData((data) => {
      return { ...data, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { username } = currentUser;
    await MovieRadarAPI.updateUser(username, formData);
    return <Route path="*" element={<Navigate to="/" replace />} />;
  }

  return (
    <div className="wrapper">
      <Form onSubmit={handleSubmit}>
        <FormGroup tag="fieldset">
          <legend>Username: {currentUser.username}</legend>
          <FormGroup>
            <Label for="firstName">firstName</Label>
            <Input
              id="firstName"
              name="first_name"
              type="text"
              autoComplete="first_name"
              placeholder={currentUser.first_name}
              value={formData.first_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">lastName</Label>
            <Input
              id="lastName"
              name="last_name"
              type="text"
              autoComplete="last_name"
              placeholder={currentUser.last_name}
              value={formData.last_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder={currentUser.email}
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <Button color="primary" id="button">
            Save
          </Button>
          <Link to="/" id="button" className="btn btn-primary">
            Ignore
          </Link>
        </FormGroup>
      </Form>
    </div>
  );
};
export default Profile;
