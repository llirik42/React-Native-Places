export default class PlaceDto {
    constructor(
        public name: string,
        public popularity: number | undefined,
        public mapLink: string,
        public wikipediaLink: string | undefined,
        public previewLink: string | undefined,
        public placeUrl: string | undefined,
        public description: string | undefined,
    ) {
    }
}
