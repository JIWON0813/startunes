import { FaSearch } from "react-icons/fa";
import classes from "./Header.module.css";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

export default function Header({}){
    return (
        <>
          <div className={classes.header_container}>
            <div className={classes.icon}>
            <IoPaperPlaneOutline />
            </div>
            <div className={classes.title}>
            <span >StarTunes</span> 
            </div>
            <div className={classes.icon}>
            <IoIosSearch  /> 
            </div>  
          </div>     
      </>
    )
}