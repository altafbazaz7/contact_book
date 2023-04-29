import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddNewContact from "./Pages/Contacts/AddContact";
import AllContacts from "./Pages/Contacts/AllContacts";
import { QueryClient, QueryClientProvider } from 'react-query';
import CovidMap from "./Pages/Dashboard/MapAndChart";
import Sidebar from "./components/Sidebar/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<AllContacts />} />
        <Route path="/addcontact" element={<AddNewContact />} />
        <Route path="/covidmap" element={<CovidMap />} />

      </Routes>
    </QueryClientProvider>
  );
};

export default App;
