import {host} from '../config'

export const SigninApi=async(obj)=>{
 const response = await fetch(`${host}/user/signin`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj),
});
const json=await response.json();
return json
}