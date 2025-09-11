import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirectTo);
    }
  }, [userInfo, redirectTo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...resp }));
      navigate(redirectTo);
    } catch (error) {
      toast("Error while logging in. Please contact admin");
    }
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-2"
        >
          Login
        </Button>
        {isLoading ? <Loader /> : null}
      </Form>
      <Row>
        <Col>
          New Customer?{" "}
          <Link
            to={redirectTo ? `/register?redirect=${redirectTo}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
