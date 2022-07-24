export type UserResponseRaw = {
  name: { first: string; last: string; title: string };
  email: string;
  picture: { thumbnail: string };
  phone: string;
  registered: { date: string; age: number };
};

export type UserResponsePending = {
  type: "pending";
};

export type UserResponseRejected = {
  type: "rejected";
  error: string;
};

export type User = {
  name: string;
  email: string;
  imgSrc: string;
  phone: string;
  registrationDate: string;
  registrationAge: number;
};

export type UserResponseFulfilled = {
  type: "fulfilled";
  data: User[];
};

export type UserResponse =
  | UserResponsePending
  | UserResponseRejected
  | UserResponseFulfilled;
