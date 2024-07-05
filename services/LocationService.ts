import LocationDto from "@/dto/LocationDto";
import ServiceUtils from "./ServiceUtils";


export default class LocationService {
    private readonly token: string

    constructor(token: string) {
        this.token = token;
    }

    public async findLocations(locationName: string, limit: number, locale: string): Promise<LocationDto[]> {
        return ServiceUtils.get(
            "https://graphhopper.com/api/1/geocode",
            {
                q: locationName,
                limit: limit,
                key: this.token,
                locale: locale,
            }
        )
            .then((data) => {
                const hits: any[] = data?.hits;

                return hits.map((hit) => {
                    const point: { lat: number, lng: number } = hit.point;
                    const lat: number = point.lat;
                    const lng: number = point.lng;

                    const extent: number[] = hit.extent;
                    const isExtentDefined = extent != undefined;

                    const minLat: number = isExtentDefined ? extent[1] : lat;
                    const maxLat: number = isExtentDefined ? extent[3] : lat;
                    const minLng: number = isExtentDefined ? extent[0] : lng;
                    const maxLng: number = isExtentDefined ? extent[2] : lng; 

                    return new LocationDto(
                        point?.lat,
                        point?.lng,
                        minLat,
                        maxLat,
                        minLng,
                        maxLng,
                        hit.name,
                        hit.country,
                        hit.city,
                        hit.state,
                        hit.street,
                        hit.housenumber,
                        hit.postcode,
                    );
                });
            })
    }
}
