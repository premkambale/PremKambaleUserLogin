import React from "react"
import { useState } from "react"
import "./dashboard.css";
import Header from "./Header";


const Dashboard = () => {
    return (
        <>
            <div className="dash-main">
                <div className="dash-sub">
                    <Header/>
                </div>
            </div>
        </>
    )
}

export default Dashboard