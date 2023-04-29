import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/Hooks";
import { useNavigate } from "react-router-dom";
import { IContact } from "../../Types/contactsType";
import { deleteContact } from "../../Redux/Features/contactSlice";
import EditContact from "./EditContact";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AllContacts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const localStorageContacts: string | any = localStorage.getItem("CONTACTS");
  const parsedContacts: IContact[] | any = JSON.parse(localStorageContacts);
  const [allContacts, setallContacts] = useState([]);
  const [editbox , seteditbox] =useState(false);
  const [selectedName , setselectedName] =useState('false');


  useEffect(() => {
    setallContacts(parsedContacts);
  }, []);

  const handleDeleteContact = (name: string) => {
    dispatch(deleteContact(name));
    setallContacts((prevContacts) =>
      prevContacts.filter((contact: IContact) => contact.name !== name)
    );
  };
  const [selectedContact, setSelectedContact] = useState<IContact | any>(null);


  const handleEditContact = (name: string) => {
    seteditbox(true);
    const selectedContact = allContacts.find((contact : IContact) => contact.name === name);
    setSelectedContact(selectedContact);
    console.log(selectedContact,"selectedContact")
  };

  return (
    <>
    
    {editbox || allContacts.length > 0 ? (
  <button style={{ position: "absolute", left: "50%", top: "10%", fontSize: "20px" }} className="rounded" onClick={() => navigate("/addcontact")}>
    Add Contact
  </button>
) : null}


    {
      editbox ? (
        <EditContact selectedContact={selectedContact} setallContacts={setallContacts}/>
      ):
      <>
             <div style={{position:"absolute",   top:"20%", left:"25%", display:"flex", flexDirection:"row", flexWrap:"wrap", gap:"5rem"}}>


{/* //////////////////////////////////////////////////////////////////////////////// 
/////////////////////////    CONDITIONAL RENDERING /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
*/}
  {allContacts?.length != 0 ? (
    allContacts?.map((contact: [] | any, index: number) => {
      return (
        <>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", border:"1px solid silver", padding:"1rem", borderRadius:"20px", color:"white", backgroundColor:"#063970", fontSize:"12px"}}     >
        <h1 className="text-2xl font-bold mb-2">{contact.name}</h1>
        <h1 className="text-lg font-medium mb-2">{contact.email}</h1>
        <h1 className="text-lg font-medium mb-2">{contact.phone}</h1>
          <div className="flex flex-row">
          <button className="bg-red-500 text-black font-semibold px-4 py-2 rounded mr-2" onClick={() => handleDeleteContact(contact.name)}>
     <DeleteIcon/> 
        </button>
        <button className="bg-blue-500 text-black font-semibold px-4 py-2 rounded" onClick={() => handleEditContact(contact.name)}>
        <EditIcon/>
        </button>


          </div>
          

      </div>


    </>
      );
    })
  ) : (
    <>
    <h1 className="text-xl font-bold underline">No Contact Present</h1>
    <button className=" rounded" onClick={() => navigate("/addcontact")}>Add Contact</button>
  </>
  
  )}
</div>
      </>
    }
     
    </>
  );
};

export default AllContacts;
