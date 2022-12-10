import { Response } from 'express';

export interface DataResponse<T>{ data: T, status: number }
export interface MessageResponse{ message: string }

export const message = (message: string) => ({message})
export const send = (res: Response, data: DataResponse<any>) => res.status(data.status).json(data.data)

export function createResponse<T>(status: number, data: T): DataResponse<T>{ return {status, data} }

export async function call(res: Response, controller: any, name: string, ...args: any[]){
    try{
        const result = await controller[name].apply(controller, args)
        send(res, result)
    }catch(e){ send(res, e as any) }
}

