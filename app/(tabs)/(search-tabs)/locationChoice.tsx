import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react'
import LocationDto from '@/app/dto/LocationDto';
import LocationCard from '@/app/components/LocationCard';
import { View, FlatList } from 'react-native';
import StorageService from '@/app/services/StorageService';
import WeatherService from '@/app/services/WeatherService';
import PlaceService from '@/app/services/PlaceService';


const weatherService: WeatherService = new WeatherService("weather-service-key");
const placeService: PlaceService = new PlaceService("place-service-key");

export default function LocationChoiceScreen() {
  const [foundLocations, setFoundLocations] = useState<LocationDto[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async() => {
      const hasLocations: boolean = await StorageService.hasLocations();
      
      if (!hasLocations) {
        console.error("Locations not found in storage");
        return;
      }

      setFoundLocations(await StorageService.getLocations());
    }

    fetchLocations();
  }, []);

  const onLocationSelect = async (index: number) => {
    const location: LocationDto = foundLocations[index];
    
    const promises: Promise<any>[] = [];
    promises.push(weatherService.findWeather(location, "metric", "ru"));
    
    try {
      // Free policy of PlaceService supports less than 10 requests per second
      const placeIds: string[] = await placeService.findPlaces(location, 9);
      for (const id of placeIds) {
        promises.push(placeService.findPlaceInfo(id, "ru"));
      }
    } catch(e) {
      console.error(e);
      return;
    }

    try {
      const result = await Promise.all(promises);
      await StorageService.putWeather(result[0]);
      result.shift();
      await StorageService.putPlaces(result);
    } catch(e) {
      console.error(e);
      return;
    }
    
    router.push("(location-info-tabs)");
  }

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 10, marginVertical: 5,}}
        data={foundLocations}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item, index}) => {          
          return (
            <View style={{marginVertical: 5,}}>
              <LocationCard location={item} onPress={() => onLocationSelect(index)} />
            </View>
          ); 
          }}
        />
    </View>
  )
}
