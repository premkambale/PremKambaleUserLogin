import React, { useEffect, useMemo, useState } from 'react'
import { useContext } from 'react';
import userContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import axios from 'axios';


const Header = () => {

    const { user, logout } = useContext(userContext);
    const [file, setFile] = useState({})
    const [addFile, setAddFile] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [files, setFiles] = useState([])



    useEffect(() => {
        axios.get(`http://localhost:5000/userfiles/getfiles/${user._id}`)
            .then((res) => {
                setFiles(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:5000/userfiles/createfile';
        const formData = {
            user: user._id,
            filename: file.name
        }
        axios.post(url, formData)
            .then((res) => {
                alert("File Uploaded Successfully")
            })
            .catch((err) => {
                console.log(err)
            })
        setFile({});
        setAddFile(!addFile)



    }

    var deleteHandler = (_id) => {
        const url = 'http://localhost:5000/userfiles/deletefiles';

        axios.delete(`${url}/${_id}`)
            .then((res) => {
                alert("File Deleted Successfully");
            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <>
            <div className="header-main">
                <h1 className='text-center'>{user.userID}</h1>
                <div className="actions">
                    <NavLink to="/login"><button className='btn btn-secondary' onClick={() => logout()}>Logout</button></NavLink>
                    <button className='btn btn-secondary mx-2' onClick={() => setAddFile(!addFile)}>Add File</button>
                    <button className='btn btn-secondary mx-2' onClick={() => setShowFiles(!showFiles)}>View Files</button>

                </div>

            </div>


            {
                addFile == true && (
                    <>
                        <div className="container-main m-auto mt-3" style={{ height: "54vh" }}>
                            <div className="main">
                                <form onSubmit={handleSubmit}  >
                                    <div className="field py-5 text-center cursor-pointer ">
                                        <input type="file" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                    <div className="buttons">
                                        <div className="button">
                                            <button type="submit">Upload</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }

            {
                showFiles == true && (
                    <>
                        <div className="container-main m-auto mt-3" style={{ width: "100%" }}>

                            {
                                files.length < 1  ? (
                                    <>
                                        <h3>No Files</h3>
                                    </>
                                )
                                    :
                                    <div className="main">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">sr.No</th>
                                                    <th scope="col">File</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    files.map((file, index) => {
                                                        return (<>
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td>{file.filename}</td>
                                                                <td ><button className='btn btn-danger' onClick={() => deleteHandler(file._id)}>Delete</button></td>
                                                            </tr>
                                                        </>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                    </>
                )
            }

        </>

    )
}

export default Header
