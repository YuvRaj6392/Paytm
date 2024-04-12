import {host} from '../config'

export const TransferFundsApi=async(to,amount)=>{
 const obj={
  to,
  amount:parseInt(amount)
 }
 const response=await fetch(`${host}/account/transfer`,{
  method:'post',
  headers:{
   'Content-Type':'application/json',
   'Authorization':"Bearer "+localStorage.getItem("token")
  },
  body:JSON.stringify(obj)
 });
 const json=await response.json();
 return json
}