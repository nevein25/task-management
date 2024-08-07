import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import { useAuth } from "../context/Auth";
import { authApi } from "../misc/authApi";
import { parseJwt, handleLogError } from "../misc/helper";

function Login() {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e, { name, value }) => {
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(username && password)) {
      setIsError(true);
      return;
    }

    try {
      const response = await authApi.login(username, password);
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);

      setUsername("");
      setPassword("");
      setIsError(false);
    } catch (error) {
      handleLogError(error);
      setIsError(true);
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
            <Button color="violet" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          {`Don't have an account? `}
          <NavLink to="/signup" color="violet" as={NavLink}>
            Sign Up
          </NavLink>
        </Message>
        {isError && <Message negative>Wrong username or password</Message>}
      </Grid.Column>
    </Grid>
  );
}

export default Login;
