import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import { useAuth } from "../context/Auth";
import { authApi } from "../misc/authApi";
import { parseJwt, handleLogError } from "../misc/helper";

function Register() {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e, { name, value }) => {
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(username && password && name && email)) {
      setIsError(true);
      setErrorMessage("Some fields are missing");
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setErrorMessage("Please enter a valid email address: ex email@example.com");
      return;
    }

    if (!validatePassword(password)) {
      setIsError(true);
      setErrorMessage("Password must be at least 8 characters long!");
      return;
    }
    const user = { username, password, name, email };

    try {
      const response = await authApi.register(user);
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);

      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
      setIsError(false);
      setErrorMessage("");
    } catch (error) {
      handleLogError(error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = "Invalid fields";

        if (errorData.status === 409) errorMessage = errorData.message;
        else if (errorData.status === 400)
          errorMessage = errorData.errors[0].defaultMessage;

        setIsError(true);
        setErrorMessage(errorMessage);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to={"/tasks"} />;
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              autoFocus
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="name"
              icon="address card"
              iconPosition="left"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
            <Button color="violet" fluid size="large">
              Signup
            </Button>
          </Segment>
        </Form>
        <Message>
          {`Already have an account? `}
          <NavLink to="/login" color="violet" as={NavLink}>
            Login
          </NavLink>
        </Message>
        {isError && <Message negative>{errorMessage}</Message>}
      </Grid.Column>
    </Grid>
  );
}

export default Register;
