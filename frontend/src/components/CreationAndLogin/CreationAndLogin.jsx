import { useSetRecoilState } from "recoil";
import CredButton from "../CredButton";
import { Link } from "react-router-dom";
import { firstNameAtom, lastNameAtom, passwordAtom, usernameAtom } from "../../store/atoms/userAtom";
import { CredInputHandler } from "../../functions/CredInputHandler";

export default function CreationAndLogin({title, desc, showFirstLastName, buttonName, handler}) {
  const setFirstName = useSetRecoilState(firstNameAtom);
  const setLastName = useSetRecoilState(lastNameAtom);
  const setUsername = useSetRecoilState(usernameAtom);
  const setPassword = useSetRecoilState(passwordAtom);
  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="flex justify-center flex-col w-[85%] sm:w-[30%] h-auto bg-white border-red-200 rounded-md py-8 gap-3 ">
        <p className="text-3xl font-extrabold text-black text-center">{title}</p>
        <p className="font-thin text-gray-400 text-black text-center">{desc}</p>
        {showFirstLastName && (
          <>
            <p className="font-semibold w-[75%] m-auto">First Name</p>
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" placeholder="John" onInput={CredInputHandler(setFirstName)} />
            <p className="font-semibold w-[75%] m-auto">Last Name</p>
            <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" placeholder="Doe" onInput={CredInputHandler(setLastName)} />
          </>
        )}
        <p className="font-semibold w-[75%] m-auto">E-mail</p>
        <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" placeholder="johndoe@gmail.com" onInput={CredInputHandler(setUsername)} />
        <p className="font-semibold w-[75%] m-auto">Password</p>
        <input className="border border-blue-300 w-[75%] m-auto shadow-md h-[35px]" type="text" onInput={CredInputHandler(setPassword)} />
        <CredButton buttonName={buttonName} handler={handler} />
        {showFirstLastName ? (
          <p className="m-auto">
            Already have an account? <Link to="/signin"><span className="text-blue-500">Sign In</span></Link>
          </p>
        ) : (
          <p className="m-auto">
            Don't have an account? <Link to="/signup"><span className="text-blue-500">Sign up</span></Link>
          </p>
        )}
      </div>
    </div>
  );
}
