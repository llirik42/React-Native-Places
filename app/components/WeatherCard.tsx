import { BORDER_RADIUS } from '../constants';
import { StyleSheet, Text, View, Image } from 'react-native'
import WeatherDto from '@/app/dto/WeatherDto';


export default function WeatherCard({weather}: {weather: WeatherDto | null}) {
  const getTemperatureRepr = (temperature: number) => {
    return `${Math.round(temperature)}°`;
  }

  const getWindSpeedRepr = (windSpeed: number) => {
    return `${Math.round(windSpeed)} м/с`;
  }

  const getHumidityRepr = (humidity: number) => {
    return `${Math.round(humidity)}%`;
  }

  return weather == null ? (<></>) : (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        <Text style={styles.temperature}>{getTemperatureRepr(weather.temperature)}</Text>
        <Text style={styles.description}>{weather.description}</Text>
      </View>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.additionalDataContainer}>
          <View style={styles.blockContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>Ощущается как </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>Ветер</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>Влажность</Text>
            </View>
          </View>
          <View style={[styles.blockContainer, styles.valuesContainer]}>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>{getTemperatureRepr(weather.feelsLike)}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>{getWindSpeedRepr(weather.windSpeed)}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.addinitionalData}>{getHumidityRepr(weather.humidity)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: weather.iconUrl
            }}
            alt=""
            style={styles.image}
          /> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1cde21",
    borderRadius: BORDER_RADIUS,
    paddingVertical: 10,
  },
  mainInfoContainer: {
    marginVertical: 0,
    alignItems: "center",
    borderRadius: 15,
  },
  additionalInfoContainer: {
    marginLeft: 15,
    flexDirection: "row",
  },
  additionalDataContainer: {
    flexDirection: "row",
    width: "50%",
  },
  blockContainer: {
    justifyContent: "space-evenly",
  },
  itemContainer: {
    margin: 0,
  },
  valuesContainer: {
    marginLeft: 30,
  },
  addinitionalData: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "flex-end",
    width: "50%",
  },
  temperature: {
    fontWeight: "bold",
    fontSize: 35,
  },
  description: {
    fontWeight: "bold",
    fontSize: 26,
  },
  image: {
    marginRight: 20,
    width: 75,
    height: 75,
  },
})
