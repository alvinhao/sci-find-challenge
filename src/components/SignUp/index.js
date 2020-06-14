import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { withFirebase } from "../Firebase";
import styled from "styled-components";
import { services } from "../../constants/services";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  [services.SERVICE_A]: false,
  [services.SERVICE_B]: false,
};

const StyledForm = styled.form`
  margin: 0 auto;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const SignUpHeader = styled.h1`
  text-align: center;
  margin: 0 auto;
`;

const SignUpPage = () => (
  <div>
    <SignUpHeader>SignUp</SignUpHeader>
    <SignUpForm />
  </div>
);

const serviceOptions = [
  { value: services.SERVICE_A, label: "Service A" },
  { value: services.SERVICE_B, label: "Service B" },
];

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { email, passwordOne, serviceA, serviceB } = this.state;

    this.props.firebase
      .createUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          uid: authUser.user.uid,
          email,
          serviceA,
          serviceB,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onServiceChange = (selectedOptions) => {
    if (selectedOptions) {
      const enabledServices = selectedOptions.map((o) => o.value);
      this.setState({
        [services.SERVICE_A]: enabledServices.includes(services.SERVICE_A),
      });
      this.setState({
        [services.SERVICE_B]: enabledServices.includes(services.SERVICE_B),
      });
    }
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <StyledForm onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Select enabled services:
          <Select
            options={serviceOptions}
            onChange={this.onServiceChange}
            isMulti={true}
          ></Select>
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </StyledForm>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
