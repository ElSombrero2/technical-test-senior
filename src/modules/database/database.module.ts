import mongoose from 'mongoose'

async function load(){
    try{
        console.log(process.env.APP_DATABASE)
        mongoose.set('strictQuery', true)
        let db = await mongoose.connect(process.env.APP_DATABASE as string)
        return db
    }catch(e) { throw e }
}

export { load }