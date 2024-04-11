import { useRecoilValue } from 'recoil';
import {host} from '../config'

export const FetchUsersApi=async(input)=>{
 
 const response=await fetch(`${host}/user/bulk?filter=${input}`,{
  method:'get',
  headers:{
   'Content-Type':'application/json',
   'Authorization':"Bearer "+localStorage.getItem("token")
  }
 });
 const json=await response.json();
 return json
}