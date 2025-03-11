import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
export const HomePage=()=>{
    const username=localStorage.getItem("username");
    return <>
        <Appbar userName={username}></Appbar>
        <Users />
    </>
}