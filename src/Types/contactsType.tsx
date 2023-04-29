export interface IContact {
    name: string;
    phone: string;
    email: string;
  }
  
  export interface IContactState {
    contacts: IContact[];
    contact: IContact;
    error: boolean;
  }
  


