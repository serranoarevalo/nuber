export const typeDefs = [
  "type SignS3URLResponse {\n  ok: Boolean!\n  signedUrl: String\n  fileUrl: String\n  error: String\n}\n\ntype Mutation {\n  signS3URL(fileName: String!, fileType: String!): SignS3URLResponse!\n}\n",
  "type AddPlaceResponse {\n  ok: Boolean!\n  place: Place\n  error: String\n}\n\ntype Mutation {\n  addPlace(\n    address: String!\n    name: String!\n    latlong: String!\n    fav: Boolean\n  ): AddPlaceResponse!\n}\n",
  "type DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  deletePlace(placeId: Int!): DeletePlaceResponse!\n}\n",
  "type EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  editPlace(\n    placeId: Int!\n    name: String\n    latlong: String\n    address: String\n    fav: Boolean\n  ): EditPlaceResponse!\n}\n",
  "type GetPlaceResponse {\n  ok: Boolean!\n  place: Place\n  error: String\n}\n\ntype Query {\n  getPlace(placeId: Int!): GetPlaceResponse!\n}\n",
  "type GetPlacesResponse {\n  ok: Boolean!\n  places: [Place]\n  error: String\n}\n\ntype Query {\n  getPlaces: GetPlacesResponse!\n}\n",
  "type Place {\n  id: Int!\n  name: String!\n  lat: String!\n  long: String!\n  address: String!\n  fav: Boolean!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type GetRideResponse {\n  ok: Boolean!\n  ride: Ride\n  error: String\n}\n\ntype Query {\n  getRide(rideId: Int!): GetRideResponse!\n}\n",
  "type GetRideHistoryResponse {\n  ok: Boolean!\n  rides: [Ride]\n  error: String\n}\n\ntype Query {\n  getRideHistory: GetRideHistoryResponse!\n}\n",
  "type RequestRideResponse {\n  ok: Boolean!\n  ride: Ride\n  error: String\n}\n\ntype Mutation {\n  requestRide(\n    pickUpLocation: String!\n    pickUpCoords: String!\n    dropOffLocation: String!\n    paymentMethod: String!\n    price: Float!\n  ): RequestRideResponse!\n}\n",
  "type Ride {\n  id: Int!\n  status: String!\n  driverRating: Float\n  passengerRating: Float\n  passenger: User!\n  driver: User\n  pickUpLocation: String\n  pickUpCoords: String!\n  dropOffLocation: String\n  price: Float\n  paymentMethod: String!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type UpdateRideResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  updateRide(\n    rideId: Int!\n    status: String\n    driverRating: Float\n    passengerRating: Float\n  ): UpdateRideResponse!\n}\n",
  "type AddPhoneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  addPhone(phoneNumber: String!): AddPhoneResponse!\n}\n",
  "type CompletePhoneSignInResponse {\n  ok: Boolean!\n  token: String\n  error: String\n}\n\ntype Mutation {\n  completePhoneSignIn(\n    key: String!\n    phone: String!\n  ): CompletePhoneSignInResponse!\n}\n",
  "type EmailSignInResponse {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  emailSignIn(email: String!, password: String!): EmailSignInResponse!\n}\n",
  "type EmailSignUpResponse {\n  ok: Boolean!\n  token: String\n  error: String\n}\n\ntype Mutation {\n  emailSignUp(\n    phoneNumber: String!\n    email: String!\n    firstName: String!\n    lastName: String!\n    password: String!\n    age: Int!\n    profilePhoto: String!\n  ): EmailSignUpResponse!\n}\n",
  "type FacebookConnectResponse {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  facebookConnect(\n    email: String\n    firstName: String!\n    lastName: String!\n    userID: String!\n  ): FacebookConnectResponse!\n}\n",
  "type GetUserProfileResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  getUserProfile(id: Int!): GetUserProfileResponse!\n}\n",
  "type GetUsersResponse {\n  ok: Boolean!\n  users: [User]!\n  error: String\n}\n\ntype Query {\n  getUsers: GetUsersResponse!\n}\n",
  "type MeResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  me: MeResponse\n}\n",
  "type RequestPasswordResetResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  requestPasswordReset: RequestPasswordResetResponse!\n}\n",
  "type RequestPhoneSignInResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  requestPhoneSignIn(phoneNumber: String!): RequestPhoneSignInResponse!\n}\n",
  "type ResetPasswordResponse {\n  ok: Boolean\n  error: String\n}\n\ntype Mutation {\n  resetPassword(key: String!, newPassword: String!): ResetPasswordResponse!\n}\n",
  "type Confirmation {\n  id: Int!\n  userId: Int!\n  user: User!\n  sent: Boolean!\n  key: String!\n  type: String!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type User {\n  id: Int!\n  email: String\n  facebookId: String\n  firstName: String\n  lastName: String\n  age: Int\n  password: String\n  verifiedEmail: Boolean\n  loginType: String!\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean\n  profilePhoto: String\n  createdAt: String\n  updatedAt: String\n  fullName: String\n  confirmations: [Confirmation]\n  isDriver: Boolean\n  balance: Float\n  carPlates: String\n  ridesAsPassenger: [Ride]!\n  ridesAsDriver: [Ride]!\n  places: [Place]\n}\n",
  "type UpdateUserResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Mutation {\n  updateUser(\n    email: String\n    firstName: String\n    lastName: String\n    password: String\n    age: Int\n    phoneNumber: String\n    profilePhoto: String\n  ): UpdateUserResponse!\n}\n",
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
  isDriver: boolean | null;
  balance: number | null;
  carPlates: string | null;
  ridesAsPassenger: Array<Ride>;
  ridesAsDriver: Array<Ride>;
  places: Array<Place> | null;
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
  pickUpLocation: string | null;
  pickUpCoords: string;
  dropOffLocation: string | null;
  price: number | null;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  id: number;
  name: string;
  lat: string;
  long: string;
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
  error: string | null;
}

export interface GetRideHistoryResponse {
  ok: boolean;
  rides: Array<Ride> | null;
  error: string | null;
}

export interface RequestRideResponse {
  ok: boolean;
  ride: Ride | null;
  error: string | null;
}

export interface UpdateRideResponse {
  ok: boolean;
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
