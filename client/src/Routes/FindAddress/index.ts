import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API } from "../../keys";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API })(
  FindAddressContainer
);
