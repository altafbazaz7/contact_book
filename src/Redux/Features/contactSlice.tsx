import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/Store';
import { IContact, IContactState } from '../../Types/contactsType';

 const initialState: IContactState = {
    contacts: [],
    contact: {name: '', phone: '', email: '' },
    error: false,
  };
  

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addNewContact: (state, action: PayloadAction<IContact>) => {
        const newContact = action.payload;
        const existingContacts: IContact[] | null = JSON.parse(localStorage.getItem("CONTACTS") || '[]');
        const updatedContacts: IContact[] = [...existingContacts as [], newContact];
        localStorage.setItem("CONTACTS", JSON.stringify(updatedContacts));
        state.contacts = updatedContacts;
      },

      deleteContact: (state, action: PayloadAction<string>) => {
        const contactToDelete = action.payload;
        const existingContacts: IContact[]  = JSON.parse(localStorage.getItem("CONTACTS") || '[]');
        const updatedContacts: IContact[] = existingContacts ? existingContacts.filter(contact => contact.name !== contactToDelete) : [];
        localStorage.setItem("CONTACTS", JSON.stringify(updatedContacts));
        state.contacts = updatedContacts;
      },

      updateContact: (state, action: PayloadAction<IContact>) => {
        const updatedContact = action.payload;
        const existingContacts: IContact[] = JSON.parse(
          localStorage.getItem('CONTACTS') || '[]'
        );
        const updatedContacts: IContact[] = existingContacts.map((contact) => {
          if (contact.name === updatedContact.name) {
            return updatedContact;
          } else {
            return contact;
          }
        });
        localStorage.setItem('CONTACTS', JSON.stringify(updatedContacts));
        state.contacts = updatedContacts;
      },
    

      
  },
});

export const { addNewContact, deleteContact, updateContact } = contactSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;

export default contactSlice.reducer;
