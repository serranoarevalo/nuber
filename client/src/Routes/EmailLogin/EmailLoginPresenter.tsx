import PropTypes from "prop-types";
import React from "react";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { EMAIL_LOGIN } from "./EmailQueries";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  email: string;
  password: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({
  email,
  password,
  handleInputChange
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Login with Email"} />
    <Container>
      <Mutation
        mutation={EMAIL_LOGIN}
        // tslint:disable-next-line jsx-no-lambda
        update={(cache, { data: { emailSignIn } }) => {
          if (emailSignIn.ok) {
            localStorage.setItem("jwt", emailSignIn.token);
            cache.writeData({
              data: {
                user: {
                  __typename: "User",
                  isLoggedIn: true
                }
              }
            });
          } else {
            toast.error(emailSignIn.error);
          }
        }}
      >
        {(emailLogin, { loading }) => (
          <React.Fragment>
            <Input
              onChange={handleInputChange}
              value={email}
              type="email"
              required={true}
              name={"Email"}
            />
            <Input
              onChange={handleInputChange}
              value={password}
              type="password"
              required={true}
              name={"Password"}
            />
            <Button
              // tslint:disable-next-line jsx-no-lambda
              onClick={() => emailLogin({ variables: { email, password } })}
              text={loading ? "Logging In..." : "Log In"}
              disabled={loading}
            />
          </React.Fragment>
        )}
      </Mutation>
    </Container>
  </Wrapper>
);

EmailLoginPresenter.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default EmailLoginPresenter;
