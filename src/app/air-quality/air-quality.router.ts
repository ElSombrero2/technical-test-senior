import { Application, Request, Response } from 'express'
import { call } from '../../core/response';
import { AirQualityController } from './controller/air-quality.controller';
import { AirQualityModel } from './models/air-quality.entity';
import { AirQualityService } from './service/air-quality.service';

export const RegisterAirQuality = (base: string, app: Application) => {

    const service = new AirQualityService(AirQualityModel)
    const controller = new AirQualityController(service)

    app.get(`${base}/quality`, async (req: Request, res: Response) => call(res, controller, 'findAirQuality', req.query.lat, req.query.lon))

}