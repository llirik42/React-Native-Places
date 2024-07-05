import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationDto from "../dto/LocationDto";
import WeatherDto from '../dto/WeatherDto';
import PlaceDto from '../dto/PlaceDto';


export default class StorageService {
    private static readonly LOCATIONS_KEY = "locations";
    private static readonly PLACES_KEY = "places";
    private static readonly WEATHER_KEY = "weather";

    public static async putLocations(locations: LocationDto[]): Promise<void> {
        return this.putValue(locations, StorageService.LOCATIONS_KEY);
    }
    
    public static async putPlaces(places: PlaceDto[]): Promise<void> {
        return this.putValue(places, StorageService.PLACES_KEY);
    }

    public static async putWeather(weather: WeatherDto): Promise<void> {
        return this.putValue(weather, StorageService.WEATHER_KEY);
    }

    public static async getLocations(): Promise<LocationDto[]> {
        return this.getValue(StorageService.LOCATIONS_KEY, []);
    }

    public static async getPlaces(): Promise<PlaceDto[]> {
        return this.getValue(StorageService.PLACES_KEY, []);
    }

    public static async getWeather(): Promise<WeatherDto | null> {
        return this.getValue(StorageService.WEATHER_KEY, null);
    }

    public static async hasLocations(): Promise<boolean> {
        return this.hasValue(StorageService.LOCATIONS_KEY);
    }

    public static async hasPlaces(): Promise<boolean> {
        return this.hasValue(StorageService.PLACES_KEY);
    }

    public static async hasWeather(): Promise<boolean> {
        return this.hasValue(StorageService.WEATHER_KEY);
    }

    private static async putValue<Type>(arg: Type, key: string): Promise<void> {
        return AsyncStorage.setItem(key, JSON.stringify(arg));         
    }

    private static async getValue<Type>(key: string, defaultValue: Type): Promise<Type> {
        const rawData: string | null = await AsyncStorage.getItem(key);
        return rawData == null ? defaultValue : JSON.parse(rawData);
    }

    private static async hasValue(key: string): Promise<boolean> {
        return await AsyncStorage.getItem(key) != null;
    }
}
