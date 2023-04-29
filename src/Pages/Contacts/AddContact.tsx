import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../Redux/Hooks';
import { addNewContact } from '../../Redux/Features/contactSlice';
import { IContact } from '../../Types/contactsType';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const AddNewContact = () => {

  const navigate = useNavigate();

  const [contact, setContact] = useState<IContact>({
    name: '',
    phone: '',
    email: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
    console.log(contact)
  };

  const handleAddContact = () => {
    dispatch(addNewContact(contact));
    navigate("/")
  };

  return (
    <div style={{height:"100vh"}}>
      <div className='flex flex-col justify-center items-center p-5'>

      <input type="text" className='rounded p-2 bg-white '  placeholder='Name' style={{color:"black", margin:"1rem"}}   name="name" id="contact_name" onChange={handleChange} />
      <input type="text" className='rounded p-2 bg-white '  placeholder='Phone'  style={{color:"black", margin:"1rem"}}  name="phone" id="contact_phone" onChange={handleChange} />
      <input type="text"  className='rounded p-2 bg-white ' placeholder='Email'  style={{color:"black", margin:"1rem"}}  name="email" id="contact_email" onChange={handleChange} />
      <button style={{border:"1px solid white", padding:"0rem 1rem", color:"white", fontSize:"12px", borderRadius:"10px"}} onClick={handleAddContact}>  <AddIcon/>Add</button>

      </div>

    </div>
  );
};

export default AddNewContact;
