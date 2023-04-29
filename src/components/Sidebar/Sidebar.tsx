import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();


  const [active, setActive] = useState('contacts');

  const handleSetActive = (tab : any) => {
    setActive(tab);
  };

  return (
   <>
            <div style={{width:"15%",display:"flex",  flexDirection:"column", alignItems:'center',  position:"absolute", left:"0%", top:"0%", height:"100vh", borderRight:'1px solid white'}}>

      <div style={{marginTop:"25%", }}>
              <button  style={{padding:'1rem',marginTop:"1rem", border:"1px solid silver", borderRadius:'10px', color:"white", width:"100%"}} onClick={() => navigate("/")}>Contacts</button>
              <button style={{padding:'1rem',marginTop:"1rem", border:"1px solid silver", borderRadius:'10px', color:"white", width:"100%"}}  onClick={() => navigate("/covidmap")}>Covid Graph & Maps</button>
              </div>
            </div>
            

   </>
  );
};

export default Sidebar;
