 import { Typography } from "@mui/material";
import Home from "./home/page";
import Register from "./register/page";
import Login from "./login/page";
import HeaderCom from "./components/headerCom";
import MainLayout from "./layouts/MainLayout";
export default function Page() {
  return (
    <>
   <HeaderCom/>
   <Home/>
      {/* <Login /> */}
      {/* <MainLayout/> */}
    </>
  ); 
}
