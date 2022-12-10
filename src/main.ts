import { load } from './modules/database/database.module'
import { app } from './modules/express/express.module'
import fs from 'fs'
import { RegisterAirQuality } from './app/air-quality/air-quality.router'

export async function main(){
    try{
      if(!fs.existsSync('logs')) fs.mkdirSync('logs')
      console.clear()
      await load()
      RegisterAirQuality('/air', app)
      app.listen(process.env.APP_PORT, () => console.log(`Documentation On: http://localhost:${process.env.APP_PORT}/api`))
    }catch(e){ 
      console.error('And Error Occured: ', e)
      process.exit(-1) 
    }
}