import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../Redux/Hooks';
import { updateContact } from '../../Redux/Features/contactSlice';
import { IContact, IContactState } from '../../Types/contactsType';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  selectedContact: IContact;
  setallContacts: any;
}

const EditContact = ({ selectedContact, setallContacts }: Props) => {
  const navigate = useNavigate();

  const [contact, setContact] = useState<IContact>({ ...selectedContact });

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (contact.name.trim() && contact.phone.trim() && contact.email.trim()) {
      const updatedContact = {
        ...selectedContact,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
      };
  
      // Update the contact state variable immediately
      setContact(updatedContact);
  
      // Call the updateContact function
      dispatch(updateContact(updatedContact));
  
      setallContacts((prevstate: any) =>
        prevstate.map((contact: IContact) =>
          contact.name === selectedContact.name ? updatedContact : contact
        )
      );
  
      navigate('/');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} style={{ height: "100vh" }}>
      <div style={{height:"100%", position:"absolute"}}>
      <div   className="flex flex-col justify-center items-center p-5 " style={{justifyContent:"center", position:"relative",alignItems:"center"}}>
        <input
          type="text"
          className="rounded p-2 bg-white"
          value={contact.name}
          placeholder="Name"
          style={{ color: "black", margin: "1rem" }}
          name="name"
          id="contact_name"
          onChange={handleChange}
        />
        <input
          type="text"
          className="rounded p-2 bg-white"
          value={contact.phone}
          placeholder="Phone"
          style={{ color: "black", margin: "1rem" }}
          name="phone"
          id="contact_phone"
          onChange={handleChange}
        />
        <input
          type="text"
          className="rounded p-2 bg-white"
          value={contact.email}
          placeholder="Email"
          style={{ color: "black", margin: "1rem" }}
          name="email"
          id="contact_email"
          onChange={handleChange}
        />
        <button
          style={{
            border: "1px solid white",
            padding: "0rem 1rem",
            color: "white",
            fontSize: "12px",
            borderRadius: "10px",
          }}
          type="submit"
        >
          <EditIcon />
          Update
        </button>
      </div>
      </div>
    </form>
  );
};

export default EditContact;
