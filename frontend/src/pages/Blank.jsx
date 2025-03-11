import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
export function Blank(){
    const navigate=useNavigate();
    useEffect(()=>{
        navigate("/signup")
    },[])
    return <>
    </>
}