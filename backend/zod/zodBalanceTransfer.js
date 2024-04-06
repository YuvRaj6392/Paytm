const z=require('zod');

const transferSchema=z.object({
 to:z.string(),
 amount:z.number()
})

module.exports={
 transferSchema
}