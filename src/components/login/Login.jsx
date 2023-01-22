import React, { useMemo, useContext } from "react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";

const Login = ( ) => {



    const navigate = useNavigate();
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        const loginDetails = {
            userID,
            password
        }
        axios.post("http://localhost:5000/user/login", loginDetails)
            .then((res) => {
                const { user, message } = res.data;

                alert(message);

                setPassword("");
                setUserID("");

                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate("/dashboard")
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return (
        <>
            <div className="container-main">
                <div className="main">
                    <form onSubmit={submitHandler}  >
                        <div className="heading">Login</div>
                        <div className="field">
                            <input type="email" name="email" placeholder="email" value={userID} onChange={e => setUserID(e.target.value)} />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="buttons">
                            <div className="button">
                                <button type="submit">Login</button>
                            </div>
                            <div className="text-center font-weight-bold p-1">or</div>
                            <div className="button">
                                <NavLink to="/register"><button>register</button></NavLink>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login