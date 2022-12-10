import fetch from "node-fetch-commonjs";
import { AirQuality } from "../models/air-quality.entity";
import QueryString from 'query-string'
import { createResponse, DataResponse, message } from "../../../core/response";
import { StatusCodes } from "http-status-codes";
import { FindAirQualityDto } from "../models/dto/find-air-quality.dto";
import { logger } from "../../../modules/logger/logger.module";
import { DateTimeDto } from "../models/dto/datetime.dto";

export class AirQualityService{

    constructor(private Model: AirQuality){}

    public async save(){
        try{
            const result = await this.findAirQuality(48.856613, 2.352222)
            const quality = new this.Model(result.data.result.pollution)
            await quality.save()
            logger.log({level: 'info', message: `[${new Date().toString()}] Data Registered!`})
        }catch(e){ logger.log({level: 'warn', message: `[${new Date().toString()}] Data not saved because API does not update the air quality`}) }
    }

    public async findAirQuality(lat: number, lon: number): Promise<DataResponse<{result: {pollution: FindAirQualityDto}}>>{
        try{
            const query = QueryString.stringify({ lat, lon, key: process.env.API_KEY })
            const res = await fetch(process.env.BASE_URI + '/v2/nearest_city?' + query, { method: 'GET' })
            const pollution = (await res.json() as any).data.current.pollution as FindAirQualityDto
            return createResponse(StatusCodes.OK, {result: {pollution}})
        }catch(e){ throw createResponse(StatusCodes.INTERNAL_SERVER_ERROR, e) }
    }

    public async findParisAirQuality(): Promise<DataResponse<FindAirQualityDto[]>>{
        try{ return createResponse(StatusCodes.OK, await this.Model.find() as FindAirQualityDto[]) }
        catch(e){ throw createResponse(StatusCodes.INTERNAL_SERVER_ERROR, message('Internal Server Error')) }
    }

    public async findMostPolluateDate(): Promise<DataResponse<DateTimeDto>>{
        const res =  (await this.Model.find({}, ['ts']).limit(1).sort([['aqius', -1]])) as unknown as DateTimeDto[]
        try{ return createResponse(StatusCodes.OK, res[0]) }
        catch(e){ throw createResponse(StatusCodes.INTERNAL_SERVER_ERROR, message('Internal Server Error')) }
    }

}