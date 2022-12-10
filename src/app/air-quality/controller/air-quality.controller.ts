import { createResponse } from "../../../core/response";
import { AirQualityService } from "../service/air-quality.service";


export class AirQualityController{

    constructor(private service: AirQualityService){}

    public async findAirQuality(lat: number, lon: number){
        try{ return  await this.service.findAirQuality(lat, lon) }
        catch(e){ throw e }
    }


}