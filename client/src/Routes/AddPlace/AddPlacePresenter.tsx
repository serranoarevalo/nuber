import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const SLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.blue};
  margin-bottom: 40px;
  display: block;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onSubmit: MutationFn;
  loading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  handleInputChange,
  name,
  address,
  loading,
  onSubmit
}) => (
  <Wrapper className={"shouldScroll"}>
    <Helmet>
      <title>Payment | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Add Place"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          value={name}
          onChange={handleInputChange}
          type={"text"}
          name={"name"}
          required={true}
          displayName={"Name"}
        />
        <Input
          value={address}
          onChange={handleInputChange}
          type={"text"}
          name={"address"}
          required={true}
          displayName={"Address"}
        />

        <SLink to="/find-address#add-place">Find address on map</SLink>

        <Button
          disabled={loading}
          text={loading ? "Adding place" : "Add place"}
        />
      </Form>
    </Container>
  </Wrapper>
);

AddPlacePresenter.propTypes = {
  fav: PropTypes.bool,
  name: PropTypes.string,
  address: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default AddPlacePresenter;
