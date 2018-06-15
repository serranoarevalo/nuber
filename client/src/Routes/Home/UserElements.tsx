import React from "react";
import AddressInput from "../../Components/AddressInput";
import Button from "../../Components/Button";
import { IUserElementsProps } from "./HomeInterfaces";
import { AbsContainer, Btn } from "./HomeStyled";

const UserElements: React.SFC<IUserElementsProps> = ({
  toAddress,
  handleInputChange,
  submitAddress,
  toggleMapChoosing,
  chooseMapAddres,
  requestRide,
  price,
  status
}) => (
  <React.Fragment>
    <AbsContainer top={true}>
      <AddressInput
        value={toAddress}
        name={"toAddress"}
        onChange={handleInputChange}
        onSubmit={submitAddress}
        placeholder={"Where to?"}
        width={"90%"}
        disabled={status === "choosingFromMap"}
      />
      <Btn onClick={toggleMapChoosing}>
        {status === "choosingFromMap" ? "Stop choosing" : "Choose from map"}
      </Btn>
    </AbsContainer>
    <AbsContainer top={false}>
      {status === "choosingFromMap" && (
        <Button
          width={"90%"}
          onClick={chooseMapAddres}
          text={"Pick this place"}
        />
      )}
      {status === "findingDirections" && (
        <Button
          disabled={true}
          width={"90%"}
          onClick={null}
          text={"Finding directions"}
        />
      )}
      {status === "foundDirections" && (
        <Button
          width={"90%"}
          onClick={requestRide}
          text={`Request ride for $${price}`}
        />
      )}
      {status === "requesting" && (
        <Button width={"90%"} onClick={null} text={`Finding driver...`} />
      )}
    </AbsContainer>
  </React.Fragment>
);

export default UserElements;
