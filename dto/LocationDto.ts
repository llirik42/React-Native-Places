export default class LocationDto {
    constructor(
        public lat: number,
        public lng: number,
        public minLat: number,
        public maxLat: number,
        public minLng: number,
        public maxLng: number,
        public name: string,
        public country: string | undefined,
        public city: string | undefined,
        public state: string | undefined,
        public street: string | undefined,
        public houseNumber: string | undefined,
        public postCode: string | undefined,
    ) {}
}
