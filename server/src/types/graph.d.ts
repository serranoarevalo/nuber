export const typeDefs = [
  "type GetChatResponse {\n  ok: Boolean!\n  chat: Chat\n  error: String\n}\n\ntype Query {\n  getChat: GetChatResponse!\n}\n",
  "type Message {\n  user: User!\n  message: String\n  chatRoom: Chat\n}\n\ntype Chat {\n  participants: [User]\n  messages: [Message]\n}\n",
  "type SignS3URLResponse {\n  ok: Boolean!\n  signedUrl: String\n  fileUrl: String\n  error: String\n}\n\ntype Mutation {\n  signS3URL(fileName: String!, fileType: String!): SignS3URLResponse!\n}\n",
  "type AddPlaceResponse {\n  ok: Boolean!\n  place: Place\n  error: String\n}\n\ntype Mutation {\n  addPlace(\n    address: String!\n    name: String!\n    lat: Float!\n    lng: Float!\n    fav: Boolean\n  ): AddPlaceResponse!\n}\n",
  "type DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  deletePlace(placeId: Int!): DeletePlaceResponse!\n}\n",
  "type EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  editPlace(\n    placeId: Int!\n    name: String\n    latlong: String\n    address: String\n    fav: Boolean\n  ): EditPlaceResponse!\n}\n",
  "type GetPlaceResponse {\n  ok: Boolean!\n  place: Place\n  error: String\n}\n\ntype Query {\n  getPlace(placeId: Int!): GetPlaceResponse!\n}\n",
  "type GetPlacesResponse {\n  ok: Boolean!\n  places: [Place]\n  error: String\n}\n\ntype Query {\n  getPlaces: GetPlacesResponse!\n}\n",
  "type Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  fav: Boolean!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type GetRideResponse {\n  ok: Boolean!\n  ride: Ride\n  isDriver: Boolean\n  error: String\n}\n\ntype Query {\n  getRide(rideId: Int): GetRideResponse!\n}\n",
  "type GetRideHistoryResponse {\n  ok: Boolean!\n  rides: [Ride]\n  error: String\n}\n\ntype Query {\n  getRideHistory: GetRideHistoryResponse!\n}\n",
  "type GetRideRequestResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Query {\n  getRideRequest: GetRideRequestResponse!\n}\n",
  "type RequestRideResponse {\n  ok: Boolean!\n  ride: Ride\n  error: String\n}\n\ntype Mutation {\n  requestRide(\n    pickUpLocation: String!\n    dropOffLocation: String!\n    pickUpLat: Float!\n    pickUpLng: Float!\n    dropOffLat: Float!\n    dropOffLng: Float!\n    price: Float!\n    distance: String!\n    duration: String!\n  ): RequestRideResponse!\n}\n",
  "type Subscription {\n  rideRequest: Ride\n}\n",
  "type Subscription {\n  rideUpdate: Ride\n}\n",
  "type Ride {\n  id: Int!\n  status: String!\n  driverRating: Float\n  passengerRating: Float\n  passenger: User!\n  driver: User\n  pickUpLocation: String!\n  dropOffLocation: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffLng: Float!\n  dropOffLat: Float!\n  price: Float\n  paymentMethod: String!\n  createdAt: String!\n  updatedAt: String!\n  distance: String!\n  duration: String!\n}\n",
  "type UpdateRideResponse {\n  ok: Boolean!\n  ride: Ride\n  error: String\n}\n\ntype Mutation {\n  updateRide(\n    rideId: Int!\n    status: String\n    driverRating: Float\n    passengerRating: Float\n    driverId: Int\n  ): UpdateRideResponse!\n}\n",
  "type AddPhoneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  addPhone(phoneNumber: String!): AddPhoneResponse!\n}\n",
  "type CompletePhoneSignInResponse {\n  ok: Boolean!\n  token: String\n  error: String\n}\n\ntype Mutation {\n  completePhoneSignIn(\n    key: String!\n    phone: String!\n  ): CompletePhoneSignInResponse!\n}\n",
  "type EmailSignInResponse {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  emailSignIn(email: String!, password: String!): EmailSignInResponse!\n}\n",
  "type EmailSignUpResponse {\n  ok: Boolean!\n  token: String\n  error: String\n}\n\ntype Mutation {\n  emailSignUp(\n    phoneNumber: String!\n    email: String!\n    firstName: String!\n    lastName: String!\n    password: String!\n    age: Int!\n    profilePhoto: String!\n  ): EmailSignUpResponse!\n}\n",
  "type FacebookConnectResponse {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  facebookConnect(\n    email: String\n    firstName: String!\n    lastName: String!\n    userID: String!\n  ): FacebookConnectResponse!\n}\n",
  "type GetDriversResponse {\n  drivers: [User]\n}\n\ntype Query {\n  getDrivers: GetDriversResponse!\n}\n",
  "type Subscription {\n  getDriver: User\n}\n",
  "type GetUserProfileResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  getUserProfile(id: Int!): GetUserProfileResponse!\n}\n",
  "type GetUsersResponse {\n  ok: Boolean!\n  users: [User]!\n  error: String\n}\n\ntype Query {\n  getUsers: GetUsersResponse!\n}\n",
  "type MeResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  me: MeResponse\n}\n",
  "type RequestPasswordResetResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  requestPasswordReset: RequestPasswordResetResponse!\n}\n",
  "type RequestPhoneSignInResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  requestPhoneSignIn(phoneNumber: String!): RequestPhoneSignInResponse!\n}\n",
  "type ResetPasswordResponse {\n  ok: Boolean\n  error: String\n}\n\ntype Mutation {\n  resetPassword(key: String!, newPassword: String!): ResetPasswordResponse!\n}\n",
  "type Confirmation {\n  id: Int!\n  userId: Int!\n  user: User!\n  sent: Boolean!\n  key: String!\n  type: String!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type User {\n  id: Int!\n  email: String\n  facebookId: String\n  firstName: String\n  lastName: String\n  age: Int\n  password: String\n  verifiedEmail: Boolean\n  loginType: String!\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean\n  profilePhoto: String\n  createdAt: String\n  updatedAt: String\n  fullName: String\n  confirmations: [Confirmation]\n  isDriving: Boolean\n  balance: Float\n  carPlates: String\n  ridesAsPassenger: [Ride]!\n  ridesAsDriver: [Ride]!\n  places: [Place]\n  lastLat: Float\n  lastLng: Float\n  isTaken: Boolean\n  isRiding: Boolean\n  lastOrientation: Float\n  currentRideId: Int\n}\n",
  "type UpdateUserResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Mutation {\n  updateUser(\n    email: String\n    firstName: String\n    lastName: String\n    password: String\n    age: Int\n    phoneNumber: String\n    profilePhoto: String\n    isDriving: Boolean\n    lastLat: Float\n    lastLng: Float\n    lastOrientation: Float\n  ): UpdateUserResponse!\n}\n",
  "type VerifyEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  verifyEmail(key: String!): VerifyEmailResponse!\n}\n",
  "type VerifyPhoneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  verifyPhone(key: String!): VerifyPhoneResponse!\n}\n"
];
/* tslint:disable */

export interface Query {
  me: MeResponse | null;
}

export interface MeResponse {
  ok: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: number;
  email: string | null;
  facebookId: string | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  password: string | null;
  verifiedEmail: boolean | null;
  loginType: string;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean | null;
  profilePhoto: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  fullName: string | null;
  confirmations: Array<Confirmation> | null;
  isDriving: boolean | null;
  balance: number | null;
  carPlates: string | null;
  ridesAsPassenger: Array<Ride>;
  ridesAsDriver: Array<Ride>;
  places: Array<Place> | null;
  lastLat: number | null;
  lastLng: number | null;
  isTaken: boolean | null;
  isRiding: boolean | null;
  lastOrientation: number | null;
  currentRideId: number | null;
}

export interface Confirmation {
  id: number;
  userId: number;
  user: User;
  sent: boolean;
  key: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ride {
  id: number;
  status: string;
  driverRating: number | null;
  passengerRating: number | null;
  passenger: User;
  driver: User | null;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffLng: number;
  dropOffLat: number;
  price: number | null;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  distance: string;
  duration: string;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  fav: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Mutation {
  verifyPhone: VerifyPhoneResponse;
}

export interface VerifyPhoneMutationArgs {
  key: string;
}

export interface VerifyPhoneResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  getDriver: User | null;
}

export interface GetChatResponse {
  ok: boolean;
  chat: Chat | null;
  error: string | null;
}

export interface Chat {
  participants: Array<User> | null;
  messages: Array<Message> | null;
}

export interface Message {
  user: User;
  message: string | null;
  chatRoom: Chat | null;
}

export interface SignS3URLResponse {
  ok: boolean;
  signedUrl: string | null;
  fileUrl: string | null;
  error: string | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  place: Place | null;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface GetPlaceResponse {
  ok: boolean;
  place: Place | null;
  error: string | null;
}

export interface GetPlacesResponse {
  ok: boolean;
  places: Array<Place> | null;
  error: string | null;
}

export interface GetRideResponse {
  ok: boolean;
  ride: Ride | null;
  isDriver: boolean | null;
  error: string | null;
}

export interface GetRideHistoryResponse {
  ok: boolean;
  rides: Array<Ride> | null;
  error: string | null;
}

export interface GetRideRequestResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface RequestRideResponse {
  ok: boolean;
  ride: Ride | null;
  error: string | null;
}

export interface UpdateRideResponse {
  ok: boolean;
  ride: Ride | null;
  error: string | null;
}

export interface AddPhoneResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneSignInResponse {
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  token: string | null;
  error: string | null;
  user: User | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  token: string | null;
  error: string | null;
  user: User | null;
}

export interface GetDriversResponse {
  drivers: Array<User> | null;
}

export interface GetUserProfileResponse {
  ok: boolean;
  user: User | null;
  error: string | null;
}

export interface GetUsersResponse {
  ok: boolean;
  users: Array<User>;
  error: string | null;
}

export interface RequestPasswordResetResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestPhoneSignInResponse {
  ok: boolean;
  error: string | null;
}

export interface ResetPasswordResponse {
  ok: boolean | null;
  error: string | null;
}

export interface UpdateUserResponse {
  ok: boolean;
  user: User | null;
  error: string | null;
}

export interface VerifyEmailResponse {
  ok: boolean;
  error: string | null;
}
