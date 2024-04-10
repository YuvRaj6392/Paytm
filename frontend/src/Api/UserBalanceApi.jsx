import {host} from '../config'

export const userBalanceApi=async(token)=>{
 const response=await fetch(`${host}/account/balance`,{
  method:'get',
  headers:{
   'Content-type':'application/json',
   'authorization':"Bearer "+token
  }
 })
 const json=await response.json();
 return json
}
