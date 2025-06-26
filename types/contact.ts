export interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2?: string
  city: string
  subdivision?: string
  cityType: string
  isHOA: string
  fenceLength: string
  fenceType: string
  survey?: File | null
  details?: string
}

// reusable “blank” contact
export const emptyContact: Contact = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  subdivision: '',
  cityType: '',
  isHOA: '',
  fenceLength: '',
  fenceType: '',
  survey: null,
  details: ''
}

