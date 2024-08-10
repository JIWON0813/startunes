import { FaPaperPlane, FaSearch } from "react-icons/fa";
import classes from "./Header.module.css";
import Link from "next/link";

export default function Header({}){
    return (
        <>
          <div className={classes.header_container}>
            <div className={classes.icon}>
            <FaPaperPlane  />
            </div>
            <div className={classes.title}>
            <span >StarTunes</span> 
            </div>
            <div className={classes.icon}>
            <FaSearch  /> 
            </div>  
          </div>     
      </>
    )
}