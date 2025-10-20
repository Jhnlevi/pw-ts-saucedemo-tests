export interface LoginTestCase {
  id: string;
  description: string;
  type: string;
  username: string;
  password: string;
  expected: "Success" | "Failure";
  error?: Error;
}

interface Error {
  message: string;
  details?: ErrorDetail[];
}

interface ErrorDetail {
  field: string;
  message: string;
}

export const posLoginCases: LoginTestCase[] = [
  {
    id: "TC_LOGIN_0001",
    description: "Log in as 'standard user'",
    username: "standard_user",
    password: "secret_sauce",
    type: "positive",
    expected: "Success",
  },
  {
    id: "TC_LOGIN_0002",
    description: "Log in as 'problem user'",
    username: "problem_user",
    password: "secret_sauce",
    type: "positive",
    expected: "Success",
  },
  {
    id: "TC_LOGIN_0003",
    description: "Log in as 'performance glitch user'",
    username: "performance_glitch_user",
    password: "secret_sauce",
    type: "positive",
    expected: "Success",
  },
  {
    id: "TC_LOGIN_0004",
    description: "Log in as 'error user'",
    username: "error_user",
    password: "secret_sauce",
    type: "positive",
    expected: "Success",
  },
  {
    id: "TC_LOGIN_0005",
    description: "Log in as 'visual user'",
    username: "visual_user",
    password: "secret_sauce",
    type: "positive",
    expected: "Success",
  },
];
export const negLoginCases: LoginTestCase[] = [
  {
    id: "TC_LOGIN_0006",
    description: "Log in as 'locked out user'",
    type: "negative",
    username: "locked_out_user",
    password: "secret_sauce",
    expected: "Failure",
    error: {
      message: "Epic sadface: Sorry, this user has been locked out.",
    },
  },
  {
    id: "TC_LOGIN_0007",
    description: "Invalid username and password",
    type: "negative",
    username: "INVALID_USERNAME",
    password: "INVALID_PASSWORD",
    expected: "Failure",
    error: {
      message:
        "Epic sadface: Username and password do not match any user in this service",
    },
  },
  {
    id: "TC_LOGIN_0008",
    description: "Missing username",
    type: "negative",
    username: "",
    password: "secret_sauce",
    expected: "Failure",
    error: {
      message: "Epic sadface: Username is required",
    },
  },
  {
    id: "TC_LOGIN_0009",
    description: "Missing password",
    type: "negative",
    username: "standard_user",
    password: "",
    expected: "Failure",
    error: {
      message: "Epic sadface: Password is required",
    },
  },
  {
    id: "TC_LOGIN_0010",
    description: "Missing username and passwords",
    type: "negative",
    username: "",
    password: "",
    expected: "Failure",
    error: {
      message: "Epic sadface: Username is required",
    },
  },
];
