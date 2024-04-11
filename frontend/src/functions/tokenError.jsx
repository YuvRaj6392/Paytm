

export const tokenError=(json)=>{
 if(json.msg=="Token is required" || json.msg=="Token has expired" || json.msg=="Invalid token"){
  return true
 }
 return false
}