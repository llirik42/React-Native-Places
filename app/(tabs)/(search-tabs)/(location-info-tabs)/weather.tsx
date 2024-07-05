import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'
import WeatherCard from '@/app/components/WeatherCard'
import WeatherDto from '@/app/dto/WeatherDto';
import StorageService from '@/app/services/StorageService';


export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherDto | null>(null);

  useEffect(() => {
    const fetchWeather = async() => {
      const hasWeather: boolean = await StorageService.hasWeather();
      
      if (!hasWeather) {
        console.error("Weather not found in storage!");
        return;
      }
      
      setWeather(await StorageService.getWeather());
    }
    
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <WeatherCard weather={weather} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
})
