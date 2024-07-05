import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import PlaceDto from '@/dto/PlaceDto';
import PlaceCard from '@/components/PlaceCard';
import StorageService from '@/services/StorageService';


export default function PlacesScreen() {
  const [places, setPlaces] = useState<PlaceDto[]>([]);

  useEffect(() => {
    const fetchPlaces = async() => {
      const hasPlaces: boolean = await StorageService.hasPlaces();

      if (!hasPlaces) {
        console.error("Places not found in storage");
        return;
      }

      setPlaces(await StorageService.getPlaces());
    }
    
    fetchPlaces();
  }, []);

  return (
    <View style={{marginHorizontal: 10, marginVertical: 5,}}>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={places}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return item.name.trim().length == 0
            ? <></>
            : (
              <View style={{marginVertical: 5,}}><PlaceCard place={item}/></View>
            )
        }}
      />
    </View>
  )
}
