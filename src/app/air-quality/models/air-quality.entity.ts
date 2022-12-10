import mongoose from 'mongoose'

const AirQualitySchema = new mongoose.Schema({
    ts: { type: mongoose.Schema.Types.Date }, 
    aqius: { type: mongoose.Schema.Types.Number }, 
    mainus: { type: mongoose.Schema.Types.String }, 
    aqicn: { type: mongoose.Schema.Types.Number}, 
    maincn: { type: mongoose.Schema.Types.String }
})

const AirQualityModel = mongoose.model('empoyee', AirQualitySchema)
declare type AirQuality = typeof AirQualityModel

export { AirQuality, AirQualityModel, AirQualitySchema }