import Notecard from "../../components/Cards/Notecard";
import Navbar from "../../components/Navbar";
import { MdAdd } from 'react-icons/md'
import AddEditNote from "./AddEditNote";
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import ExmptyCard from "../../components/EmptyCard/ExmptyCard";
import AddNoteSVG from '../../assets/images/add-note.svg'
import NoDataSVG from '../../assets/images/no-data.svg'

function Home() {
    const[openAddEditModal, setOpenAddEditModal] = useState({
      isShown : false,
      type : "add",
      data : null,
    });

    const [showToastMsg, setShowToastMes] = useState({
      isShown : false,
      message : "",
      type : "add"
    })

    const [allNotes, setAllNotes] = useState([])
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const [isSearch, setIsSearch] = useState(false);

    const handleEdit = (noteDetails) =>{
      setOpenAddEditModal({
        isShown : true,
        data : noteDetails,
        type : 'edit'
      })
    }

    const showToastMessage = (message, type) => {
      setShowToastMes({
        isShown : true,
        message,
        type
      })
    }

    const handleCloseToast = () => {
      setShowToastMes({
        isShown : false,
        messgae : ""
      })
    }

    // Get the user Info
    const getUserInfo = async () => {
      try{
        const response = await axiosInstance.get("/get-user");

        if(response.data && response.data.user){
          setUserInfo(response.data.user);
        }
      }
      catch(err){
        if(err.response.status === 401){
          localStorage.clear();
          navigate('/login');
        }
      }
    };

    // Get All Notes
    const getAllNotes = async () => {
      try {
        const response = await axiosInstance.get('/get-all-notes');

        if(response.data && response.data.notes){
          setAllNotes(response.data.notes);
        }
      } 
      catch (error) {
        console.log("An unexpected error occured. Please try again");
      }
    }

    // Delete Note
    const deleteNode = async (data) => {
      const noteId = data._id;
      try {
        const response = await axiosInstance.delete("/delete-note/"+noteId);

        if(response.data && !response.data.error){
          showToastMessage("Note Deleted Successfully", "delete");
          getAllNotes();
        }
        
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          console.log("An unexpected error occured. Please try again");
        }
      }
    }

    // Search Note
    const searchNote = async (query) => {
      try{
        const response = await axiosInstance.get('/search-notes', {
          params : { query },
        });
        
        if(response.data && response.data.notes){
          setIsSearch(true);
          setAllNotes(response.data.notes);
        }
      }
      catch(err){
        console.log(err);
      }
    }

    const handleClearSearch = () => {
      searchNote(false);
      getAllNotes();
    }

    const updateIsPineed = async (noteData) => {
      const noteId = noteData._id;
      try {
        const response = await axiosInstance.put("/update-note-pinned/"+noteId, {
          "isPinned" : !noteData.isPinned
        });

        if(response.data && !response.data.error){
          showToastMessage("Note Pinned");
          getAllNotes();
        }
        
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(()=>{
      getAllNotes();
      getUserInfo();
      return () => {}
    }, []);
  return (
    <>
      <Navbar userInfo={userInfo} searchNote={searchNote} handleClearSearch={handleClearSearch}/>

      <div className="container mx-auto">
        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item, index) => (
            <Notecard 
              key={item._id}
              title={item.title}
              date = {item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={()=> handleEdit(item)}
              onDelete={()=>deleteNode(item)}
              onPinNote={()=>updateIsPineed(item)}
            />
          ))}
        </div> : 
          <ExmptyCard imgSrc={isSearch ? NoDataSVG : AddNoteSVG} message={isSearch ? `Oops! No Data found macthing your search..`:`Start creating your first note Click the 'Add' button. Let's get's start.`}/>
        }
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{
          setOpenAddEditModal({isShown : true, type : 'add', data : null})
      }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {()=>{
        }}
        style={{
            overlay : {
                backgroundColor : "rgba(0,0,0,0.2)",
            },
        }}
        contentLabel = ""
        className = "w-[40%] m-h-3/4 bg-white rounded-md mx-auto mt-14 p-5">
            
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          
          onClose={()=>{setOpenAddEditModal({
            isShown : false,
            type : 'add',
            data : null
          });}}

          getAllNotes={getAllNotes}
          showToastMessage = {showToastMessage}
        />
        </Modal>
        <Toast
          isShown = {showToastMsg.isShown}
          message = {showToastMsg.message}
          type = {showToastMsg.type}
          onClose = {handleCloseToast}
           />
    </>
  )
}

export default Home