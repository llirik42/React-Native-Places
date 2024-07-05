export default class WeatherDto {
    constructor(
        public description: string,
        public iconUrl: string,
        public temperature: number,
        public feelsLike: number,
        public pressure: number,
        public humidity: number,
        public visibility: number,
        public windSpeed: number,
    ) {
    }
}
