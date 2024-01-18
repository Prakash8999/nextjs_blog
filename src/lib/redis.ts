import {Redis} from 'ioredis'


const redisUrl = () =>{
	if(process.env.REDIS_URL ){
		return process.env.REDIS_URL
	}
	throw new Error("Redis Url is not exist")
}
  


export const redisClient = new Redis(redisUrl());