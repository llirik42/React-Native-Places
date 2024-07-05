import WeatherDto from "@/dto/WeatherDto";
import LocationDto from "@/dto/LocationDto";
import ServiceUtils from "./ServiceUtils";


export default class WeatherService {
    private readonly token: string

    constructor(token: string) {
        this.token = token;
    }

    public async findWeather(location: LocationDto, units: string, language: string): Promise<WeatherDto> {
        return ServiceUtils.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                lat: location.lat,
                lon: location.lng,
                appid: this.token,
                units: units,
                lang: language,
            },
        ).then((data) => {
            const weatherData: any = data.weather[0];
            const mainData: any = data.main;

            return new WeatherDto(
                weatherData.description,
                `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`,
                mainData.temp,
                mainData.feels_like,
                mainData.pressure,
                mainData.humidity,
                data.visibility,
                data.wind.speed
            );
        })
    }
}
