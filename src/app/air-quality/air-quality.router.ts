import { Application, Request, Response } from 'express'
import { call } from '../../core/response';
import { AirQualityController } from './controller/air-quality.controller';
import { AirQualityModel } from './models/air-quality.entity';
import { AirQualityService } from './service/air-quality.service';
import { fork } from 'child_process'
import fetch from 'node-fetch-commonjs';

export const RegisterAirQuality = (base: string, app: Application) => {

    const service = new AirQualityService(AirQualityModel, fetch as any)
    const controller = new AirQualityController(service)

    app.get(`${base}/quality`, async (req: Request, res: Response) => call(res, controller, 'findAirQuality', req.query.lat, req.query.lon))
    app.get(`${base}/paris`, async (req: Request, res: Response) => call(res, controller, 'findParisAirQuality'))
    app.get(`${base}/paris/most-polluate`, async (req: Request, res: Response) => call(res, controller, 'findMostPolluateDate'))

    const child = fork('./cron.js')
    child.on('message', async () => await service.save())

}