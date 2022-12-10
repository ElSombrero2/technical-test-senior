import { StatusCodes } from "http-status-codes"
import { createResponse } from "../../../core/response"
import { AirQuality, DATASET, fetch, PARIS } from "../mock/air-quality.mock"
import { AirQualityService } from "../service/air-quality.service"
import { AirQualityController } from "./air-quality.controller"

 
describe('Air Quality Service', () => {
    
    let service!: AirQualityService 
    let controller: AirQualityController
    const find = (AirQuality as any).find as jest.Mock

    beforeEach(() => {
        service = new AirQualityService(AirQuality as any, fetch as any)
        controller = new AirQualityController(service)
    })

    test('Should find air quality with lon and lat', async () => {
        const lat = 140.32356, lon = 35.95633
        const response = await service.findAirQuality(lat, lon)
        expect(response).toEqual(createResponse(StatusCodes.OK, DATASET[0]))

    })

    test('Should find all Paris\'s air quality', async () => {
        const response = await controller.findParisAirQuality()
        expect(response).toEqual(createResponse(StatusCodes.OK, [PARIS]))
        
    })

    test('Should find the most polluated date of Paris', async () => {
        const response = await controller.findMostPolluateDate()
        expect(response).toEqual(createResponse(StatusCodes.OK, {ts: PARIS.ts, _id: PARIS._id}))
    })



})