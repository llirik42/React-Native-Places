import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { BORDER_RADIUS } from '@/constants';
import WeatherDto from '@/dto/WeatherDto';


class WeatherProperty {
  constructor(public title: string, public producer: (weather: WeatherDto) => string) {}
}

export default function WeatherCard({weather}: {weather: WeatherDto | null}) {
  const pascalesToMillimeters = (p: number) => {
    return p / 133.332;
  }

  const getTemperatureRepr = (temperature: number) => `${Math.round(temperature)}°`;

  const getWindSpeedRepr = (weather: WeatherDto) => `${Math.round(weather.windSpeed)} м/с`;

  const getHumidityRepr = (weather: WeatherDto) => `${Math.round(weather.humidity)}%`;

  const getPressureRepr = (weather: WeatherDto) => `${Math.round(pascalesToMillimeters(weather.pressure * 100))} мм рт. ст.`
  
  const getVisibilityRepr = (weather: WeatherDto) => {
    const visibility: number = weather.visibility;
    
    return visibility >= 1000
      ? `${Math.round(weather.visibility / 1000)} км`
      : `${weather.visibility} м`
  };

  const properties: WeatherProperty[] = [
    new WeatherProperty(
      "Ощущается как",
      (weather: WeatherDto) => getTemperatureRepr(weather.feelsLike)
    ),
    new WeatherProperty(
      "Ветер",
      getWindSpeedRepr,
    ),
    new WeatherProperty(
      "Влажность",
      getHumidityRepr,
    ),
    new WeatherProperty(
      "Давление",
      getPressureRepr,
    ),
    new WeatherProperty(
      "Видимость",
      getVisibilityRepr,
    ),
  ];

  return weather == null ? (<></>) : (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        <Text style={styles.temperature}>{getTemperatureRepr(weather.temperature)}</Text>
        <Text style={styles.description}>{weather.description}</Text>
      </View>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.additionalDataContainer}>
          <View style={styles.blockContainer}>
            {properties.map((item) => (
              <View style={styles.itemContainer} key={item.title}>
                <Text style={styles.addinitionalData}>{item.title}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.blockContainer, styles.valuesContainer]}>
            {properties.map((item) => (
              <View style={styles.itemContainer} key={item.title}>
                <Text style={styles.addinitionalData}>{item.producer(weather)}</Text>
              </View>
            ))}
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
