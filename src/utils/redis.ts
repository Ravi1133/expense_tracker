import {createClient} from "redis"
export const redisClient=createClient({
        url:"redis://localhost:6379"
    })
        redisClient.on("error",(err)=>console.log(`Redis Client Error `,err))
    
export const redisConnect=async()=>{
    try{
        if(!redisClient.isOpen){
            await redisClient.connect()
            console.log("Redis connected")
        }
    }catch(err){
        console.log("err in redis connection",err)
    }
}
