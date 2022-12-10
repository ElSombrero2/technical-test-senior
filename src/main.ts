import { load } from './modules/database/database.module'
import { app } from './modules/express/express.module'
import fs from 'fs'

export async function main(){
    try{
      if(!fs.existsSync('logs')) fs.mkdirSync('logs')
      await load()
      console.clear()
      app.listen(process.env.APP_PORT, () => console.log(`Documentation On: http://localhost:${process.env.APP_PORT}/api`))
    }catch(e){ 
      console.error('And Error Occured: ', e)
      process.exit(-1) 
    }
}