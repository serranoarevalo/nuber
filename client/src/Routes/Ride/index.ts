import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API } from "../../keys";
import RideContainer from "./RideContainer";
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API
})(RideContainer);
