import React from "react"
import { useState } from "react"
import { NavLink ,useNavigate} from "react-router-dom"
import axios from "axios";


const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const submitHandler = (e) => {
        e.preventDefault();
        const user = {
            userID:email,
            password
        }
        axios.post("http://localhost:5000/user/register",user)
        .then((res)=>{
            console.log(res.data);
            res.data.message ? alert(res.data.message) : alert("User Registered successfully");


            setEmail("");
            setPassword("");
            !res.data.message && navigate("/login");
        })
        .catch((err)=>{
            alert("failed to register")
        })

    

    }

    return (
        <>
            <div className="container-main">
                <div className="main">
                    <form onSubmit={submitHandler} >
                        <div className="heading">Register</div>
                        <div className="field">
                            <input type="email" name="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="buttons">
                            <div className="button">
                                <NavLink to="/login"> <button>Login</button></NavLink>
                            </div>
                            <div className="text-center font-weight-bold p-1">or</div>
                            <div className="button">
                                <button type="submit">register</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Register