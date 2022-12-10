const PARIS = {
    "_id": "639493f80af433c11da62267",
    "ts": "2022-12-10T14:00:00.000Z",
    "aqius": 63,
    "mainus": "p2",
    "aqicn": 28,
    "maincn": "p1",
    "__v": 0
}

const DATASET = [{
    "result": {
      "pollution": PARIS
    }
}]

const RESPONSE = {
    "status": "success",
    "data": {
      "city": "Inashiki",
      "state": "Ibaraki",
      "country": "Japan",
      "location": {
        "type": "Point",
        "coordinates": [
          140.32356,
          35.95633
        ]
      },
      "current": {
        "pollution": PARIS,
        "weather": {
          "ts": "2022-12-10T14:00:00.000Z",
          "tp": 9,
          "pr": 1009,
          "hu": 84,
          "ws": 0.89,
          "wd": 112,
          "ic": "04n"
        }
      }
    }
}

const fetch = jest.fn(() => ({json: jest.fn(() => RESPONSE) }))

const AirQuality = jest.fn(() => ({
    save: jest.fn(() => RESPONSE)
}));

(AirQuality as any).find = jest.fn((args) => {
    if(args) return {limit: jest.fn(() => ({sort: jest.fn(() => ([{ts: PARIS.ts, _id: PARIS._id}]))}))}
    return [PARIS]
});

export {DATASET, AirQuality, RESPONSE, fetch, PARIS }