export type CustomerAddress = {
  active: boolean;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type CustomerPhone = {
  active: boolean;
  number: string;
  type: string;
};

export type CustomerEmail = {
  active: boolean;
  email: string;
  type: string;
};

export type Customer = {
  id: string;
  customerId: string;
  status: string;
  firstName: string;
  lastName: string;
  addresses: CustomerAddress[];
  phones: CustomerPhone[];
  emails: CustomerEmail[];
  loanIds: string[];
};
