/* eslint-disable */
import { gql } from '@apollo-orbit/angular';
import { TypedDocumentNode as DocumentNode } from '@apollo-orbit/angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  /** user details */
  user: User;
};

export type CreditsFilterDto = {
  createdAt?: InputMaybe<RangeValidator>;
};

export type CreditsHistoryModel = {
  __typename?: 'CreditsHistoryModel';
  date: Scalars['DateTime']['output'];
  invalidCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  validCount: Scalars['Int']['output'];
};

export type CreditsHistoryTotals = {
  __typename?: 'CreditsHistoryTotals';
  invalidCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  validCount: Scalars['Int']['output'];
};

export type EmailChecks = {
  __typename?: 'EmailChecks';
  is_catchall: Scalars['Boolean']['output'];
  is_role: Scalars['Boolean']['output'];
  smtp_block: Scalars['Boolean']['output'];
  smtp_connect: Scalars['Boolean']['output'];
  syntax_valid: Scalars['Boolean']['output'];
};

/** Access control list for files */
export enum FileAcl {
  Private = 'PRIVATE',
  PublicRead = 'PUBLIC_READ'
}

export type FileVerificationInput = {
  fileId: Scalars['String']['input'];
};

export type FileVerificationModel = {
  __typename?: 'FileVerificationModel';
  _id: Scalars['ID']['output'];
  completedAt: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  originalFile: Scalars['String']['output'];
  startedAt: Maybe<Scalars['DateTime']['output']>;
  status: FileVerificationStatus;
  totalRows: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['ID']['output'];
  verifiedFile: Maybe<Scalars['String']['output']>;
};

export enum FileVerificationStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Imported = 'IMPORTED',
  Processing = 'PROCESSING',
  Queued = 'QUEUED'
}

export type FinalizeUploadResponse = {
  __typename?: 'FinalizeUploadResponse';
  _id: Scalars['ID']['output'];
  acl: FileAcl;
  filename: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  key: Scalars['String']['output'];
  marked: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  presigned_url: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  uploadRuleId: Maybe<Scalars['ID']['output']>;
  uploaded_at: Scalars['DateTime']['output'];
};

export type GenerateTempUploadInput = {
  contentType: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  mediaCode: Scalars['String']['input'];
};

export type GoogleLoginInput = {
  authuser?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  prompt?: InputMaybe<Scalars['String']['input']>;
  scope: Scalars['String']['input'];
};

export type InvoiceModel = {
  __typename?: 'InvoiceModel';
  currency: Scalars['String']['output'];
  invoiceDate: Scalars['DateTime']['output'];
  orderId: Scalars['String']['output'];
  subTotal: Scalars['Float']['output'];
  taxAmount: Maybe<Scalars['Float']['output']>;
  totalAmount: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type InvoiceModel_Edge = {
  __typename?: 'InvoiceModel_Edge';
  cursor: Scalars['String']['output'];
  node: InvoiceModel;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MediaObject = {
  __typename?: 'MediaObject';
  fileId: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type MessageResponseModel = {
  __typename?: 'MessageResponseModel';
  message: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkVerify: FileVerificationModel;
  buyPlan: PlanBuyResponse;
  checkEmail: VerificationModel;
  creditsByRange: Array<CreditsHistoryModel>;
  creditsHistory: CreditsHistoryTotals;
  finalizeUpload: FinalizeUploadResponse;
  generateTempUpload: TempUploadResponse;
  getInvoice: InvoiceModel;
  getInvoices: PaginatedInvoiceResponse;
  getOrder: OrderModel;
  getOrders: PaginatedOrderResponse;
  getSubscription: SubscriptionModel;
  getSubscriptions: PaginatedSubscriptionResponse;
  getTotalCredits: TotalCreditsResponse;
  loginWithEmail: AuthResponse;
  loginWithGoogle: AuthResponse;
  refreshToken: RefreshTokenResponse;
  register: User;
  resetPassword: MessageResponseModel;
  sendOtp: MessageResponseModel;
  updateProfile: User;
  updateProfileImage: User;
  verifyOtp: VerifyOtpResponse;
};


export type MutationBulkVerifyArgs = {
  input: FileVerificationInput;
};


export type MutationBuyPlanArgs = {
  planId: Scalars['String']['input'];
};


export type MutationCheckEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreditsByRangeArgs = {
  input: CreditsFilterDto;
};


export type MutationFinalizeUploadArgs = {
  fileId: Scalars['String']['input'];
};


export type MutationGenerateTempUploadArgs = {
  input: GenerateTempUploadInput;
};


export type MutationGetInvoiceArgs = {
  invoiceId: Scalars['String']['input'];
};


export type MutationGetInvoicesArgs = {
  input: PaginatedInvoiceDto;
};


export type MutationGetOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationGetOrdersArgs = {
  input: PaginatedOrderDto;
};


export type MutationGetSubscriptionArgs = {
  id: Scalars['String']['input'];
};


export type MutationGetSubscriptionsArgs = {
  input: PaginatedSubscriptionDto;
};


export type MutationLoginWithEmailArgs = {
  input: LoginInput;
};


export type MutationLoginWithGoogleArgs = {
  input: GoogleLoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationResetPasswordArgs = {
  input: SetPasswordInput;
};


export type MutationSendOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UserDto;
};


export type MutationUpdateProfileImageArgs = {
  fileId: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type OrderModel = {
  __typename?: 'OrderModel';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  gateway: PaymentGateway;
  metadata: Maybe<Scalars['JSON']['output']>;
  plan: PlanModel;
  status: OrderPaymentStatus;
  user: User;
};

export type OrderModel_Edge = {
  __typename?: 'OrderModel_Edge';
  cursor: Scalars['String']['output'];
  node: OrderModel;
};

export enum OrderPaymentStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type PaginatedInvoiceDto = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  sortDirection?: Scalars['Int']['input'];
  sortField?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedInvoiceResponse = {
  __typename?: 'PaginatedInvoiceResponse';
  edges: Array<InvoiceModel_Edge>;
  pageInfo: PageInfo;
};

export type PaginatedOrderDto = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  sortDirection?: Scalars['Int']['input'];
  sortField?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedOrderResponse = {
  __typename?: 'PaginatedOrderResponse';
  edges: Array<OrderModel_Edge>;
  pageInfo: PageInfo;
};

export type PaginatedSubscriptionDto = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  sortDirection?: Scalars['Int']['input'];
  sortField?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedSubscriptionResponse = {
  __typename?: 'PaginatedSubscriptionResponse';
  edges: Array<SubscriptionModel_Edge>;
  pageInfo: PageInfo;
};

export enum PaymentGateway {
  Cashfree = 'CASHFREE'
}

export type PlanBuyResponse = {
  __typename?: 'PlanBuyResponse';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  gateway: PaymentGateway;
  metadata: Maybe<Scalars['JSON']['output']>;
  /** temporary payment session for checkingout in payment gateway  */
  payment_session_id: Scalars['String']['output'];
  plan: Scalars['ID']['output'];
  status: OrderPaymentStatus;
  user: Scalars['ID']['output'];
};

export type PlanModel = {
  __typename?: 'PlanModel';
  _id: Scalars['ID']['output'];
  active: Scalars['Boolean']['output'];
  buttonLabel: Scalars['String']['output'];
  buttonStyle: Scalars['String']['output'];
  credits: Scalars['Int']['output'];
  features: Array<Scalars['String']['output']>;
  highlight: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  recommended: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
  plans: Array<PlanModel>;
  userInfo: User;
};

export type RangeValidator = {
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SubscriptionModel = {
  __typename?: 'SubscriptionModel';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  left_credits: Scalars['Float']['output'];
  plan: PlanModel;
  status: SubscriptionStatus;
  total_credits: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubscriptionModel_Edge = {
  __typename?: 'SubscriptionModel_Edge';
  cursor: Scalars['String']['output'];
  node: SubscriptionModel;
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Utilized = 'UTILIZED'
}

export type TempUploadResponse = {
  __typename?: 'TempUploadResponse';
  _id: Scalars['ID']['output'];
  presignedData: Scalars['JSON']['output'];
};

export type TotalCreditsResponse = {
  __typename?: 'TotalCreditsResponse';
  remaining_credits: Scalars['Int']['output'];
  total_credits: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  /** Unique identifier for the user */
  _id: Scalars['ID']['output'];
  /** Timestamp when the user was created */
  createdAt: Scalars['DateTime']['output'];
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Profile image of the user */
  image: Maybe<MediaObject>;
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Phone Number of the user */
  phone: Maybe<Scalars['String']['output']>;
  /** Timestamp when the user was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type UserDto = {
  /** Name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Phone Number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type VerificationModel = {
  __typename?: 'VerificationModel';
  checks: EmailChecks;
  domain: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  mx_record: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  username: Maybe<Scalars['String']['output']>;
};

export type VerifyOtpInput = {
  email: Scalars['String']['input'];
  otpToken: Scalars['String']['input'];
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOtpResponse';
  reset_token: Scalars['String']['output'];
};

export type UserFieldsFragment = { __typename?: 'User', _id: string, updatedAt: any, phone: string | null, name: string, email: string, createdAt: any, image: { __typename?: 'MediaObject', key: string } | null };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginWithEmailMutationData = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: (
      { __typename?: 'User' }
      & UserFieldsFragment
    ) } };

export type LoginWithGoogleMutationVariables = Exact<{
  input: GoogleLoginInput;
}>;


export type LoginWithGoogleMutationData = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: (
      { __typename?: 'User' }
      & UserFieldsFragment
    ) } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutationData = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', accessToken: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutationData = { __typename?: 'Mutation', register: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) };

export type FinalizeUploadMutationVariables = Exact<{
  fileId: Scalars['String']['input'];
}>;


export type FinalizeUploadMutationData = { __typename?: 'Mutation', finalizeUpload: { __typename?: 'FinalizeUploadResponse', _id: string, acl: FileAcl, uploaded_at: any, uploadRuleId: string | null, size: number, presigned_url: string, mimeType: string, key: string, marked: boolean, hash: string, filename: string } };

export type GenerateTempUploadMutationVariables = Exact<{
  input: GenerateTempUploadInput;
}>;


export type GenerateTempUploadMutationData = { __typename?: 'Mutation', generateTempUpload: { __typename?: 'TempUploadResponse', _id: string, presignedData: any } };

export type SendOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendOtpMutationData = { __typename?: 'Mutation', sendOtp: { __typename?: 'MessageResponseModel', message: string, timestamp: any } };

export type ResetPasswordMutationVariables = Exact<{
  input: SetPasswordInput;
}>;


export type ResetPasswordMutationData = { __typename?: 'Mutation', resetPassword: { __typename?: 'MessageResponseModel', timestamp: any, message: string } };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;


export type VerifyOtpMutationData = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpResponse', reset_token: string } };

export type BuyPlanMutationVariables = Exact<{
  planId: Scalars['String']['input'];
}>;


export type BuyPlanMutationData = { __typename?: 'Mutation', buyPlan: { __typename?: 'PlanBuyResponse', gateway: PaymentGateway, payment_session_id: string, amount: number, plan: string, status: OrderPaymentStatus, user: string, metadata: any | null } };

export type PlansQueryVariables = Exact<{ [key: string]: never; }>;


export type PlansQueryData = { __typename?: 'Query', plans: Array<{ __typename?: 'PlanModel', _id: string, active: boolean, buttonLabel: string, buttonStyle: string, credits: number, features: Array<string>, highlight: boolean | null, name: string, price: number, recommended: boolean | null }> };

export type UpdateProfileMutationVariables = Exact<{
  input: UserDto;
}>;


export type UpdateProfileMutationData = { __typename?: 'Mutation', updateProfile: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) };

export type UpdateProfileImageMutationVariables = Exact<{
  fileId: Scalars['String']['input'];
}>;


export type UpdateProfileImageMutationData = { __typename?: 'Mutation', updateProfileImage: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) };

export type BulkVerifyMutationVariables = Exact<{
  input: FileVerificationInput;
}>;


export type BulkVerifyMutationData = { __typename?: 'Mutation', bulkVerify: { __typename?: 'FileVerificationModel', verifiedFile: string | null, user: string, updatedAt: any, totalRows: number | null, status: FileVerificationStatus, startedAt: any | null, originalFile: string, createdAt: any, completedAt: any | null, _id: string } };

export type SingleEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SingleEmailMutationData = { __typename?: 'Mutation', checkEmail: { __typename?: 'VerificationModel', username: string | null, status: string, mx_record: string | null, email: string, domain: string | null, checks: { __typename?: 'EmailChecks', syntax_valid: boolean, smtp_connect: boolean, smtp_block: boolean, is_role: boolean, is_catchall: boolean } } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  _id
  updatedAt
  phone
  name
  email
  createdAt
  image {
    key
  }
}
    ` as DocumentNode<UserFieldsFragment, unknown>;
export const LOGIN_WITH_EMAIL_MUTATION = gql`
    mutation LoginWithEmail($input: LoginInput!) {
  loginWithEmail(input: $input) {
    accessToken
    refreshToken
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}` as DocumentNode<LoginWithEmailMutationData, LoginWithEmailMutationVariables>;

export function gqlLoginWithEmailMutation(variables: LoginWithEmailMutationVariables): { mutation: typeof LOGIN_WITH_EMAIL_MUTATION, variables: typeof variables } {
  return {
    mutation: LOGIN_WITH_EMAIL_MUTATION,
    variables
  };
}

export const LOGIN_WITH_GOOGLE_MUTATION = gql`
    mutation LoginWithGoogle($input: GoogleLoginInput!) {
  loginWithGoogle(input: $input) {
    accessToken
    refreshToken
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}` as DocumentNode<LoginWithGoogleMutationData, LoginWithGoogleMutationVariables>;

export function gqlLoginWithGoogleMutation(variables: LoginWithGoogleMutationVariables): { mutation: typeof LOGIN_WITH_GOOGLE_MUTATION, variables: typeof variables } {
  return {
    mutation: LOGIN_WITH_GOOGLE_MUTATION,
    variables
  };
}

export const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    accessToken
  }
}
    ` as DocumentNode<RefreshTokenMutationData, RefreshTokenMutationVariables>;

export function gqlRefreshTokenMutation(variables: RefreshTokenMutationVariables): { mutation: typeof REFRESH_TOKEN_MUTATION, variables: typeof variables } {
  return {
    mutation: REFRESH_TOKEN_MUTATION,
    variables
  };
}

export const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}` as DocumentNode<RegisterMutationData, RegisterMutationVariables>;

export function gqlRegisterMutation(variables: RegisterMutationVariables): { mutation: typeof REGISTER_MUTATION, variables: typeof variables } {
  return {
    mutation: REGISTER_MUTATION,
    variables
  };
}

export const FINALIZE_UPLOAD_MUTATION = gql`
    mutation FinalizeUpload($fileId: String!) {
  finalizeUpload(fileId: $fileId) {
    _id
    acl
    uploaded_at
    uploadRuleId
    size
    presigned_url
    mimeType
    key
    marked
    hash
    filename
  }
}
    ` as DocumentNode<FinalizeUploadMutationData, FinalizeUploadMutationVariables>;

export function gqlFinalizeUploadMutation(variables: FinalizeUploadMutationVariables): { mutation: typeof FINALIZE_UPLOAD_MUTATION, variables: typeof variables } {
  return {
    mutation: FINALIZE_UPLOAD_MUTATION,
    variables
  };
}

export const GENERATE_TEMP_UPLOAD_MUTATION = gql`
    mutation GenerateTempUpload($input: GenerateTempUploadInput!) {
  generateTempUpload(input: $input) {
    _id
    presignedData
  }
}
    ` as DocumentNode<GenerateTempUploadMutationData, GenerateTempUploadMutationVariables>;

export function gqlGenerateTempUploadMutation(variables: GenerateTempUploadMutationVariables): { mutation: typeof GENERATE_TEMP_UPLOAD_MUTATION, variables: typeof variables } {
  return {
    mutation: GENERATE_TEMP_UPLOAD_MUTATION,
    variables
  };
}

export const SEND_OTP_MUTATION = gql`
    mutation SendOtp($email: String!) {
  sendOtp(email: $email) {
    message
    timestamp
  }
}
    ` as DocumentNode<SendOtpMutationData, SendOtpMutationVariables>;

export function gqlSendOtpMutation(variables: SendOtpMutationVariables): { mutation: typeof SEND_OTP_MUTATION, variables: typeof variables } {
  return {
    mutation: SEND_OTP_MUTATION,
    variables
  };
}

export const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPassword($input: SetPasswordInput!) {
  resetPassword(input: $input) {
    timestamp
    message
  }
}
    ` as DocumentNode<ResetPasswordMutationData, ResetPasswordMutationVariables>;

export function gqlResetPasswordMutation(variables: ResetPasswordMutationVariables): { mutation: typeof RESET_PASSWORD_MUTATION, variables: typeof variables } {
  return {
    mutation: RESET_PASSWORD_MUTATION,
    variables
  };
}

export const VERIFY_OTP_MUTATION = gql`
    mutation VerifyOtp($input: VerifyOtpInput!) {
  verifyOtp(input: $input) {
    reset_token
  }
}
    ` as DocumentNode<VerifyOtpMutationData, VerifyOtpMutationVariables>;

export function gqlVerifyOtpMutation(variables: VerifyOtpMutationVariables): { mutation: typeof VERIFY_OTP_MUTATION, variables: typeof variables } {
  return {
    mutation: VERIFY_OTP_MUTATION,
    variables
  };
}

export const BUY_PLAN_MUTATION = gql`
    mutation BuyPlan($planId: String!) {
  buyPlan(planId: $planId) {
    gateway
    payment_session_id
    amount
    plan
    status
    user
    metadata
  }
}
    ` as DocumentNode<BuyPlanMutationData, BuyPlanMutationVariables>;

export function gqlBuyPlanMutation(variables: BuyPlanMutationVariables): { mutation: typeof BUY_PLAN_MUTATION, variables: typeof variables } {
  return {
    mutation: BUY_PLAN_MUTATION,
    variables
  };
}

export const PLANS_QUERY = gql`
    query Plans {
  plans {
    _id
    active
    buttonLabel
    buttonStyle
    credits
    features
    highlight
    name
    price
    recommended
  }
}
    ` as DocumentNode<PlansQueryData, PlansQueryVariables>;

export function gqlPlansQuery(): { query: typeof PLANS_QUERY } {
  return {
    query: PLANS_QUERY
  };
}

export const UPDATE_PROFILE_MUTATION = gql`
    mutation UpdateProfile($input: UserDto!) {
  updateProfile(input: $input) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}` as DocumentNode<UpdateProfileMutationData, UpdateProfileMutationVariables>;

export function gqlUpdateProfileMutation(variables: UpdateProfileMutationVariables): { mutation: typeof UPDATE_PROFILE_MUTATION, variables: typeof variables } {
  return {
    mutation: UPDATE_PROFILE_MUTATION,
    variables
  };
}

export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
    mutation UpdateProfileImage($fileId: String!) {
  updateProfileImage(fileId: $fileId) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}` as DocumentNode<UpdateProfileImageMutationData, UpdateProfileImageMutationVariables>;

export function gqlUpdateProfileImageMutation(variables: UpdateProfileImageMutationVariables): { mutation: typeof UPDATE_PROFILE_IMAGE_MUTATION, variables: typeof variables } {
  return {
    mutation: UPDATE_PROFILE_IMAGE_MUTATION,
    variables
  };
}

export const BULK_VERIFY_MUTATION = gql`
    mutation BulkVerify($input: FileVerificationInput!) {
  bulkVerify(input: $input) {
    verifiedFile
    user
    updatedAt
    totalRows
    status
    startedAt
    originalFile
    createdAt
    completedAt
    _id
  }
}
    ` as DocumentNode<BulkVerifyMutationData, BulkVerifyMutationVariables>;

export function gqlBulkVerifyMutation(variables: BulkVerifyMutationVariables): { mutation: typeof BULK_VERIFY_MUTATION, variables: typeof variables } {
  return {
    mutation: BULK_VERIFY_MUTATION,
    variables
  };
}

export const SINGLE_EMAIL_MUTATION = gql`
    mutation SingleEmail($email: String!) {
  checkEmail(email: $email) {
    checks {
      syntax_valid
      smtp_connect
      smtp_block
      is_role
      is_catchall
    }
    username
    status
    mx_record
    email
    domain
  }
}
    ` as DocumentNode<SingleEmailMutationData, SingleEmailMutationVariables>;

export function gqlSingleEmailMutation(variables: SingleEmailMutationVariables): { mutation: typeof SINGLE_EMAIL_MUTATION, variables: typeof variables } {
  return {
    mutation: SINGLE_EMAIL_MUTATION,
    variables
  };
}
