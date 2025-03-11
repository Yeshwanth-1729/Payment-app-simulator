import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { InputBar } from "../components/InputBar";
import { MyButton } from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export function Signin(){
    const navigate=useNavigate();
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    return <>
        <div className="flex justify-center bg-slate-400 h-screen">
            <div className="flex justify-center flex-col">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Signin"}/>
                    <InputBar value={"UserName"} example={"Saaho@99"} onChange={(e)=>{
                        setUserName(e.target.value);
                    }}/>
                    <InputBar value={"Password"} example={"*******"} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                    {/* <MyButton value={"Signin"} onClick={async ()=>{
                        const response=await axios.post("http://localhost:3004/api/v1/user/signin/",{
                            username:userName,
                            password:password,
                        })
                        console.log(response.data);
                        if(response.status==121){
                            navigate("/signin");
                        }
                        if(response.data.flag){
                            localStorage.setItem("token",response.data.token);
                            navigate("/home")
                        }else{
                            navigate("/signup");
                        }
                    }}></MyButton> */}
                    <MyButton
                    value={"Signin"}
                    onClick={async () => {
                        try {
                        const response = await axios.post("http://localhost:3004/api/v1/user/signin/", {
                            username: userName,
                            password: password,
                        });

                        console.log(response.data);

                        if (response.status === 401) {
                            navigate("/signin");
                            return;
                        }
                        if (response.data.flag) {
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("username",userName);
                            navigate("/home");
                        } else {
                            alert("Invalid credentials!");
                        }
                        } catch (error) {
                        console.error("Error signing in:", error);
                        alert("Something went wrong. Please try again later.");
                        }
                    }}
                    ></MyButton>

                    
                    <BottomWarning label={"Didn't have an account ?"} linkText={"signup"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    </>
}
