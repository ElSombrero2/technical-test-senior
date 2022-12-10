import fetch from "node-fetch-commonjs";
import { AirQuality } from "../models/air-quality.entity";
import QueryString from 'query-string'
import { createResponse, DataResponse } from "../../../core/response";
import { StatusCodes } from "http-status-codes";

export class AirQualityService{

    constructor(private Model: AirQuality){}

    public static save(){

    }


    public async findAirQuality(lat: number, lon: number): Promise<DataResponse<any>>{
        try{
            const query = QueryString.stringify({ lat, lon, key: process.env.API_KEY })
            const res = await fetch(process.env.BASE_URI + '/v2/nearest_city?' + query, { method: 'GET' })
            const json = await res.json() as any
            return createResponse(StatusCodes.OK, {result: {pollution: json.data.current.pollution}})
        }catch(e){ throw createResponse(StatusCodes.INTERNAL_SERVER_ERROR, e) }
    }

}