import { StatusCodes } from "http-status-codes"
import { createResponse } from "../../../core/response"
import { AirQuality, DATASET, fetch, PARIS, RESPONSE } from "../mock/air-quality.mock"
import { AirQualityService } from "./air-quality.service"

 
describe('Air Quality Service', () => {
    
    let service!: AirQualityService 
    const find = (AirQuality as any).find as jest.Mock

    beforeEach(() => {
        service = new AirQualityService(AirQuality as any, fetch as any)
        fetch.mockClear()
        AirQuality.mockClear()
        find.mockClear()
    })

    test('Should find air quality with lon and lat', async () => {
        const lat = 140.32356, lon = 35.95633
        const response = await service.findAirQuality(lat, lon)
        
        //Verify if fetch is called once
        expect(fetch.mock.calls.length).toBe(1)
        // Verify if fetch receive two arguments
        expect(fetch.mock.calls[0].length).toBe(2)

        // Verify if the method receive the correct URL and the current method
        expect(fetch.mock.calls[0].at(0)).toEqual(`${process.env.BASE_URI}/v2/nearest_city?key=${process.env.API_KEY}&lat=140.32356&lon=35.95633`)
        expect(fetch.mock.calls[0].at(1)).toEqual({method: 'GET'})
        const json = fetch.mock.results[0].value.json as jest.Mock

        // Verify if json returns the right value
        expect(json.mock.results[0].value).toEqual(RESPONSE)

        // Verify if the response is correct
        expect(response).toEqual(createResponse(StatusCodes.OK, DATASET[0]))

    })

    test('Should save air quality of Paris', async () => {
        await service.save()
        
        // Verify if AirQuality is instanciated once
        expect(AirQuality.mock.instances.length).toBe(1)
        
        const save = (AirQuality.mock.results[0].value.save) as jest.Mock
        
        // Verify if save is called once
        expect(save.mock.calls.length).toBe(1)
        
    })

    test('Should find all Paris\'s air quality', async () => {
        const response = await service.findParisAirQuality()

        // Verify if find is called only once 
        expect(find.mock.calls.length).toBe(1)
        
        // Verify if find returns the right value
        expect(find.mock.results[0].value).toEqual([PARIS])

        // Verify if the function returns the right value
        expect(response).toEqual(createResponse(StatusCodes.OK, [PARIS]))
        
    })

    test('Should find the most polluated date of Paris', async () => {
        const response = await service.findMostPolluateDate()

        // Verify if find is called only once
        expect(find.mock.calls.length).toBe(1)

        const limit = find.mock.results[0].value.limit as jest.Mock

        // Verify if the function is called only once and get the right args
        expect(limit.mock.calls.length).toBe(1)
        expect(limit.mock.calls[0].at(0)).toBe(1)

        const sort = limit.mock.results[0].value.sort as jest.Mock

        // Verify if the function is called only once and get the right args
        expect(sort.mock.calls.length).toBe(1)
        expect(sort.mock.calls[0].at(0)).toEqual([['aqius', -1]])

        // Verify if the function returns the right value
        expect(response).toEqual(createResponse(StatusCodes.OK, {ts: PARIS.ts, _id: PARIS._id}))
    })



})