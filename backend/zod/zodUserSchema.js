const z=require("zod");
const signupSchema=z.object({
 username:z.string().email(),
 firstName:z.string(),
 lastName:z.string(),
 password:z.string().min(8)
})

const signinSchema=z.object({
 username:z.string().email(),
 password:z.string().min(8)
})

const updatePasswordSchema=z.string().min(8)

module.exports={
 signupSchema,signinSchema,updatePasswordSchema
}