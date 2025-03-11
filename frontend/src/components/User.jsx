import {MyButton} from './MyButton';
import { useNavigate } from 'react-router-dom';
export function User({user}){
    const navigate=useNavigate();
    return <>
        <div className="flex flex-row justify-between shadow-slate-500">
            <div className="flex flex-col justify-center font-bold px-2">{user.firstname+" "+user.lastname}</div>
            <div className="flex ">
                <MyButton value={"Send Money"} onClick={()=>{
                    navigate("/SendMoney?id="+user._id+"&name="+user.firstname);
                    console.log("clicked");
                }}/>
            </div>
        </div>
    </>
}