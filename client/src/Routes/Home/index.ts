import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API } from "../../keys";
import HomeContainer from "./HomeContainer";
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API
})(HomeContainer);
