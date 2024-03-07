

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar";
import { Posts } from "../components/Posts";


export const Dashboard = () => {
    return <div className="h-full bg-gray-100">
        <Appbar />
        <div className="m-8">
            <Posts />
        </div>
    </div>
}