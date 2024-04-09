
import {host} from '../config'

export const SignupApi=async(obj)=>{
 const response = await fetch(`${host}/user/signup`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj),
});
const json=await response.json();
return json
}