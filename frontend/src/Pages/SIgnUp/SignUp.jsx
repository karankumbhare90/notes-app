import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/Input/PasswordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!fullName){
            setError("Please enter your name.");
            return;
        }

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        
        if(!password){
            setError("Please enter the Password");
            return;
        }
        setError("");

        // Signup API Call

        try {
            const response = await axiosInstance.post('/create-account', {
                fullName : fullName,
                email : email,
                password : password
            })

            // Handle Registration response
            if(response.data && response.data.error){
                setError(response.data.message);
                return;
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate('/dashboard');
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occured, Please try again");
            }
        }
    };
    return (
        <>
          <Navbar/>
    
          <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form action="" onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">SignUp</h4>
                    <input 
                        type="text" 
                        name="fullName" 
                        id="fullName" 
                        placeholder="Fullname"
                        className="input-box"
                        value={fullName} 
                        onChange={(e)=>{setFullName(e.target.value)}}
                        />
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Email" 
                        className="input-box"
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
    
                    <PasswordInput
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder="Password"
                    />
    
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
    
                    <button type="submit" className="btn-primary">
                        Create an account
                    </button>
                    <p className="text-sm text-center mt-4">Aleary have an account ?{" "}<Link to='/login' className="font-medium text-primary hover:underline">Login</Link></p>
                </form>
            </div>
          </div>
        </>
      )
    }

export default SignUp
