import { User } from "./User";
import {InputBar} from "./InputBar"
import { useEffect, useState } from "react";
import axios from 'axios';
export function Users(){
    const [filter,setFilter]=useState("");
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3004/api/v1/user/bulk?filter="+filter,{
            headers:{
                Authorization: "bearer "+localStorage.getItem("token")
            }
        }).then(response=>{
            setUsers(response.data.user);
            //console.log(users);
        })
    },[filter])
    return <div className="mx-2">
        <div className="text-slate-600 font-bold text-1xl">Users</div>
        {/* <InputBar value="Pay to: " example="Search" onChange={(e)=>{
            setFilter(e.target.value);
        }}/> */}
        <div>
            <input placeholder="Search " type="text" onChange={(e)=>{
                setFilter(e.target.value);
            }} className="w-full px-2 py-2 border rounded border-bg-slate-600 "/>
        </div>
        <div>
            {users.map((user)=> <User key={user._id} user={user}/>)}
        </div>
    </div>
}