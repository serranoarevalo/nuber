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
`;

const Input = styled.input`
  display: none;
`;

const Title = styled.span`
  color: #7f8c8d;
  margin-bottom: 20px;
`;

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploaded: boolean;
  fileUrl: string;
  uploading: boolean;
}

const FileInputPresenter: React.SFC<IProps> = ({
  onChange,
  uploaded,
  uploading,
  fileUrl
}) => (
  <Container>
    <Title>Profile Photo</Title>
    <Image htmlFor="photo">
      {!uploading && !uploaded && <FontAwesome name="plus" />}
    </Image>
    <Input
      onChange={onChange}
      disabled={uploaded && uploading}
      type="file"
      accept="image/*"
      capture={true}
      id={"photo"}
      name={"photo"}
    />
  </Container>
);

export default FileInputPresenter;
