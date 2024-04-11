import {host} from '../config'

export const userBalanceApi=async()=>{
 const response=await fetch(`${host}/account/balance`,{
  method:'get',
  headers:{
   'Content-type':'application/json',
   'authorization':"Bearer "+localStorage.getItem("token")
  }
 })
 const json=await response.json();
 return json
}
