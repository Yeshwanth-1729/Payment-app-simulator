import { Heading } from "../components/Heading"
import { InputBar } from "../components/InputBar"
import { MyButton } from "../components/MyButton"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'; 
export const Signup=()=>{
    const [firstName,setFirstName] =useState("");
    const [lastName,setLastName] =useState("");
    const [userName,setUserName] =useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return <>
        <div className="bg-slate-500 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"SignUp"}></Heading>
                    <InputBar onChange={(event)=>{
                        setFirstName(event.target.value);
                    }} value={"FirstName"} example={"Yeshwanth"}></InputBar>
                    <InputBar onChange={(event)=>{
                        setLastName(event.target.value);
                    }} value={"LastName"} example={"Reddy"}></InputBar>
                    <InputBar onChange={(event)=>{
                        setUserName(event.target.value);
                    }} value={"UserName"} example={"Saaho_99"}></InputBar>
                    <InputBar onChange={(event)=>{
                        setPassword(event.target.value);
                        //console.log(password);
                    }} value={"Password"} example={"saaho@123"}></InputBar>
                    <MyButton value={"Signup"} onClick={async ()=>{
                        const response=await axios.post("http://localhost:3004/api/v1/user/signup/",{
                            firstname:firstName,
                            lastname:lastName,
                            username:userName,
                            password:password
                        })
                        //console.log("reached");
                        //localStorage.setItem("token",response.data.token);
                        //console.log("reached");
                        if(response.status==200){
                            navigate("/signin");
                        }
                    }}></MyButton>
                    <BottomWarning label={"If you already have an Acc -->"} linkText={"signin ?"} to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    </>
}