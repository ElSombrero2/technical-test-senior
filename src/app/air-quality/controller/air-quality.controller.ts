import { DataResponse } from "../../../core/response";
import { FindAirQualityDto } from "../models/dto/find-air-quality.dto";
import { AirQualityService } from "../service/air-quality.service";


export class AirQualityController{

    constructor(private service: AirQualityService){}

    public async findAirQuality(lat: number, lon: number): Promise<DataResponse<{result: {pollution: FindAirQualityDto}}>>{
        try{ return  await this.service.findAirQuality(lat, lon) }
        catch(e){ throw e }
    }

    public async findParisAirQuality(){
        try{ return await this.service.findParisAirQuality() }
        catch(e){ throw e }
    }

    public async findMostPolluateDate(){
        try{ return await this.service.findMostPolluateDate() }
        catch(e){ throw e }
    }


}