import PropTypes from "prop-types";
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

UserElements.propTypes = {
  toAddress: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  submitAddress: PropTypes.func.isRequired,
  toggleMapChoosing: PropTypes.func.isRequired,
  chooseMapAddres: PropTypes.func.isRequired,
  requestRide: PropTypes.func.isRequired,
  price: PropTypes.number,
  status: PropTypes.string.isRequired
};

export default UserElements;
