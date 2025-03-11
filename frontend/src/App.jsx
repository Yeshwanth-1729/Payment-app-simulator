import { BrowserRouter,Router,Routes,Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { HomePage } from "./pages/HomePage";
import { Payment } from "./pages/Payment";
import { SendMoney } from "./pages/SendMoney";
import { Blank } from "./pages/Blank";
function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blank/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/sendmoney" element={<SendMoney/>}/>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  </>
}
export default App;