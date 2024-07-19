import { useNavigate } from "react-router-dom"
import ProdileInfo from "./Cards/ProfileInfo"
import SeachBar from "./SearchBar/SeachBar";
import { useEffect, useState } from "react";

function Navbar({ userInfo, searchNote, handleClearSearch }) {

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const onLogOut = () =>{
    localStorage.clear();
    navigate('/login');
  }

    const loggedInStatus = localStorage.getItem('token');


  const handleSearch = () => {
    if(searchQuery){
      searchNote(searchNote);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        Notes
      </h2>
      {loggedInStatus 
      ? 
        <>
          <SeachBar
            value={searchQuery}
            onChange={({target})=>{
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProdileInfo userInfo={userInfo} onLogOut={onLogOut}/></>
      :
        <div></div>
    }
    </div>
  )
}

export default Navbar
