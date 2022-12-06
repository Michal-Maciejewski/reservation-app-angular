export interface IRandomUsers {
  id: number,
  uid:  number,
  password:  string,
  first_name:  string,
  last_name:  string,
  username:  string,
  email:  string,
  avatar:  string,
  gender:  string,
  phone_number: string,
  social_insurance_number:  string,
  date_of_birth: Date,
  address: {
    city: string,
    street_name: string,
    street_address: string,
    zip_code: string,
    state: string,
    country: string,
    coordinates: {
        lat: number,
        lng: number
    }
  }  
}