export const typeDefs = ["type AddPhoneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  addPhone(phoneNumber: String!): AddPhoneResponse!\n}\n","","type EmailSignInResponse {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  emailSignIn(email: String!, password: String!): EmailSignInResponse!\n}\n","type EmailSignUpResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Mutation {\n  emailSignUp(\n    email: String!\n    firstName: String!\n    lastName: String!\n    password: String!\n    age: Int!\n  ): EmailSignUpResponse!\n}\n","type FacebookConnectResolver {\n  ok: Boolean!\n  token: String\n  error: String\n  user: User\n}\n\ntype Mutation {\n  facebookConnect(token: String!): FacebookConnectResolver!\n}\n","type GetUserProfileResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  getUserProfile(id: Int!): GetUserProfileResponse!\n}\n","type GetUsersResponse {\n  ok: Boolean!\n  users: [User]!\n  error: String\n}\n\ntype Query {\n  getUsers: GetUsersResponse!\n}\n","type MeResponse {\n  ok: Boolean!\n  user: User\n  error: String\n}\n\ntype Query {\n  me: MeResponse\n}\n","type RequestPasswordResetResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  requestPasswordReset: RequestPasswordResetResponse!\n}\n","type ResetPasswordResponse {\n  ok: Boolean\n  error: String\n}\n\ntype Mutation {\n  resetPassword(key: String!, newPassword: String!): ResetPasswordResponse!\n}\n","type User {\n  id: Int!\n  email: String\n  facebookId: Int\n  firstName: String\n  lastName: String\n  age: Int\n  password: String\n  verifiedEmail: Boolean\n  loginType: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean\n  profilePhoto: String\n  createdAt: String\n  updatedAt: String\n  fullName: String\n}\n","type UpdateUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  updateUser(\n    email: String\n    firstName: String\n    lastName: String\n    password: String\n    age: Int\n    phoneNumber: Int\n  ): UpdateUserResponse!\n}\n","type VerifyEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  verifyEmail(key: String!): VerifyEmailResponse!\n}\n","type VerifyPhoneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  verifyPhone(key: String!): VerifyPhoneResponse!\n}\n"];
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
  facebookId: number | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  password: string | null;
  verifiedEmail: boolean | null;
  loginType: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean | null;
  profilePhoto: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  fullName: string | null;
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

export interface AddPhoneResponse {
  ok: boolean;
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
  user: User | null;
  error: string | null;
}

export interface FacebookConnectResolver {
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

export interface ResetPasswordResponse {
  ok: boolean | null;
  error: string | null;
}

export interface UpdateUserResponse {
  ok: boolean;
  error: string | null;
}

export interface VerifyEmailResponse {
  ok: boolean;
  error: string | null;
}
