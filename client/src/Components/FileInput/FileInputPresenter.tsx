import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Image = styled.label`
  height: 80px;
  width: 80px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.span`
  color: ${props => props.theme.grey};
  margin-bottom: 20px;
`;

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploaded: boolean;
  fileUrl: string;
  uploading: boolean;
  required: boolean;
}

const FileInputPresenter: React.SFC<IProps> = ({
  onChange,
  uploaded,
  uploading,
  fileUrl,
  required
}) => (
  <Container>
    <Title>Profile Photo</Title>
    <Input
      onChange={onChange}
      disabled={uploaded && uploading}
      type="file"
      accept="image/*"
      capture={true}
      id={"photo"}
      name={"photo"}
      required={required}
    />
    <Image htmlFor="photo">
      {!uploading && !uploaded && <FontAwesome name="plus" />}
      {uploading && !uploaded && <FontAwesome name="spinner fa-spin" />}
      {!uploading && uploaded && <img src={fileUrl} />}
    </Image>
  </Container>
);

FileInputPresenter.propTypes = {
  onChange: PropTypes.func.isRequired,
  uploaded: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  fileUrl: PropTypes.string
};

export default FileInputPresenter;
