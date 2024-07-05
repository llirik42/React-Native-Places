import LocationDto from "@/dto/LocationDto";
import PlaceDto from "@/dto/PlaceDto";
import ServiceUtils from "./ServiceUtils";


export default class PlaceService {
    private readonly token: string

    constructor(token: string) {
        this.token = token;
    }

    public async findPlaces(location: LocationDto, limit: number): Promise<string[]> {
        return ServiceUtils.get(
            "https://api.opentripmap.com/0.1/ru/places/bbox",
            {
                lon_min: location.minLng,
                lat_min: location.minLat,
                lon_max: location.maxLng,
                lat_max: location.maxLat,
                kinds: "interesting_places",
                limit: limit,
                "apikey": this.token,
                format: "geojson",
            }
        ).then((data) => {
            return data?.features?.map((item: { id: string }) => item.id)
        })
    }

    public async findPlaceInfo(placeId: string, language: string): Promise<PlaceDto> {
        return ServiceUtils.get(
            `https://api.opentripmap.com/0.1/ru/places/xid/${placeId}`,
            {
                apikey: this.token,
                lang: language
            }
        ).then((data) => {
            const rates: string[] = ["0", "1", "2", "3", "1h", "2h", "3h"];
            const rate: string | undefined = data.rate;

            const popularity: number | undefined = rate == undefined ? undefined : (
                Math.min(rates.indexOf(rate) + 1, 5)
            );

            return new PlaceDto(
                data.name,
                popularity,
                data.otm,
                data.wikipedia,
                data.preview?.source,
                data.url,
                data.wikipedia_extracts?.text,
            );
        });
    }
}
