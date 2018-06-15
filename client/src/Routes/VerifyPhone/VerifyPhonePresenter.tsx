import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { Container, Wrapper } from "../../Components/Shared";

interface IProps {
  verificationKey: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  loading: boolean;
  onSubmit: MutationFn;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  handleInputChange,
  loading,
  onSubmit
}) => (
  <Wrapper>
    <Helmet>
      <title>Verify Phone | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Verify your phone"} />
    <Container>
      <Form width={"100%"} onSubmit={onSubmit}>
        <Input
          name="verificationKey"
          type={"tel"}
          value={verificationKey}
          required={true}
          onChange={handleInputChange}
          displayName={"Enter the verification key sent on the SMS"}
        />
        <Button
          text={loading ? "Loading" : "Verify phone"}
          disabled={loading}
        />
      </Form>
    </Container>
  </Wrapper>
);

VerifyPhonePresenter.propTypes = {
  verificationKey: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default VerifyPhonePresenter;
