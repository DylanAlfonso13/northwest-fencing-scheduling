export interface Contact {
  firstName: string;
  lastName: string;
  fenceLength: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  subdivision?: string;
  cityType: string;
  isHOA: string;
  survey?: File | null;
  fenceType: string;
  details?: string;
}
