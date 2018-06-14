import axios from "axios";
import { GOOGLE_MAPS_API } from "./keys";

interface IGeocode {
  lat: number;
  lng: number;
  error?: boolean;
}

export const geocode = async (address: string): Promise<IGeocode> => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API}`;
  const { status, data } = await axios.get(URL);
  if (status === 200) {
    const { results } = data;
    const place = results[0];
    const {
      geometry: {
        location: { lat, lng }
      }
    } = place;
    return {
      lat,
      lng
    };
  } else {
    return {
      lat: 0,
      lng: 0,
      error: true
    };
  }
};

interface IReverseGeocode {
  address: string;
  error?: boolean;
}

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<IReverseGeocode> => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API}`;
  const { status, data } = await axios.get(URL);
  if (status === 200) {
    const { results } = data;
    const firstAddress = results[0];
    const address = firstAddress.formatted_address;
    return {
      address
    };
  } else {
    return {
      address: "",
      error: true
    };
  }
};

export const clamp = (min, max) => value =>
  value < min ? min : value > max ? max : value;
