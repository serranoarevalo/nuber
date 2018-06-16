import { ObservableQuery } from "apollo-client";
import { MutationFn } from "react-apollo";

export type status =
  | "idle"
  | "requesting"
  | "choosingFromMap"
  | "findingDirections"
  | "foundDirections";

export interface IHomeContainerState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  fromAddress: string;
  toLat: number;
  toLng: number;
  toAddress: string;
  distance: string;
  duration: string;
  price: number | undefined;
  hasRequest: boolean;
  request: any;
  status: status;
}

export interface IHomeContainerProps {
  history: any;
  google: any;
  loading: boolean;
  MeQuery: any;
  GetDriversQuery: any;
  GetRideRequestQuery: any;
  ReportLocationMutation: MutationFn;
  RequestRideMutation: MutationFn;
  UpdateRideMutation: MutationFn;
  GetRideQuery: ObservableQuery;
}

export interface IHomePresenterProps {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  me: any;
  redirectToVerify: () => void;
  loading: boolean;
  mapRef: any;
  showMarker: boolean;
}

export interface IUserElementsProps {
  toAddress: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  submitAddress: () => Promise<void>;
  toggleMapChoosing: () => void;
  chooseMapAddres: () => void;
  requestRide: () => void;
  price: number | undefined;
  status: status;
}

export interface IDriverElementsProps {
  hasRequest: boolean;
  request: any;
  acceptRide: () => void;
}
