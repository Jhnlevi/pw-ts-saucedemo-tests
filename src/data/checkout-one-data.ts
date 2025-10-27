export interface CheckoutOneTestCase {
  id: string;
  description: string;
  type: string;
  data: Data;
  expected: "Success" | "Failure";
  error?: Error;
}

interface Data {
  firstName: string;
  lastName: string;
  zipCode: string;
}

interface Error {
  message: string;
  details?: ErrorDetail[];
}

interface ErrorDetail {
  field: string;
  message: string;
}

export const posCheckoutOne: CheckoutOneTestCase[] = [
  {
    id: "TC_Checkout_0001",
    description:
      "Checkout step one: User can enter first name, last name, and postal code.",
    type: "positive",
    data: {
      firstName: "Standard User First Name",
      lastName: "Standard User Last Name",
      zipCode: "1111ABC",
    },
    expected: "Success",
  },
];
export const negCheckoutOne: CheckoutOneTestCase[] = [
  {
    id: "TC_Checkout_0002",
    description:
      "Checkout step one: Error message appears when both 'Last Name' and 'Postal Code' are empty.",
    type: "negative",
    data: {
      firstName: "Standard User First Name",
      lastName: "",
      zipCode: "",
    },
    expected: "Failure",
    error: {
      message: "Checkout step one fails when provided with missing data.",
      details: [
        {
          field: "lastName",
          message: "Required",
        },
        {
          field: "postalCode",
          message: "Required",
        },
      ],
    },
  },
  {
    id: "TC_Checkout_0003",
    description:
      "Checkout step one: Error message appears when both 'First Name' and 'Postal' are empty.",
    type: "negative",
    data: {
      firstName: "",
      lastName: "Standard User Last Name",
      zipCode: "",
    },
    expected: "Failure",
    error: {
      message: "Checkout step one fails when provided with missing data.",
      details: [
        {
          field: "firstName",
          message: "Required",
        },
        {
          field: "postalCode",
          message: "Required",
        },
      ],
    },
  },
  {
    id: "TC_Checkout_0004",
    description:
      "Checkout step one: Error message appears when both 'First Name' and 'Last Name' are empty.",
    type: "negative",
    data: {
      firstName: "",
      lastName: "",
      zipCode: "1111ABC",
    },
    expected: "Failure",
    error: {
      message: "Checkout step one fails when provided with missing data.",
      details: [
        {
          field: "firstName",
          message: "Required",
        },
        {
          field: "lastName",
          message: "Required",
        },
      ],
    },
  },
  {
    id: "TC_Checkout_0005",
    description:
      "Checkout step one: Error message appears all fields are empty.",
    type: "negative",
    data: {
      firstName: "",
      lastName: "",
      zipCode: "",
    },
    expected: "Failure",
    error: {
      message: "Checkout step one fails when provided with missing data.",
      details: [
        {
          field: "firstName",
          message: "Required",
        },
        {
          field: "lastName",
          message: "Required",
        },
        {
          field: "postalCode",
          message: "Required",
        },
      ],
    },
  },
];
