import CredButton from "../CredButton";
import { Link } from "react-router-dom";
export default function CreationAndLogin({title,desc,showFirstLastName,buttonName,handler}) {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="flex justify-center flex-col w-[85%] sm:w-[30%] h-auto bg-white border-red-200 rounded-md py-8 gap-3 ">
          <p className="font-extrabold text-black text-center">{title}</p>
          <p className="font-thin  text-gray-400 text-black text-center">{desc}</p>
          {showFirstLastName && (
            <>
            <p className="font-semibold w-[75%] m-auto">First Name</p> 
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px] " type="text" placeholder="John" />
            <p className="font-semibold  w-[75%] m-auto">Last Name</p> 
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" placeholder="Doe" />
          </>
          )
          }
          <p className="font-semibold  w-[75%] m-auto">E-mail</p> 
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" placeholder="johndoe@gmail.com" />
            <p className="font-semibold  w-[75%] m-auto">Password</p> 
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text"/>
            <CredButton buttonName={buttonName} handler={handler} />
            {
              showFirstLastName 
              ?
              <p className="m-auto">Already have an account? <Link to='/signin'><span className="text-blue-500">Sign In</span></Link></p>
              :
              <p className="m-auto">Don't have an account? <Link to='/signup'><span className="text-blue-500">Sign up</span></Link></p>
            }
        </div>
    </div>
  )
}
