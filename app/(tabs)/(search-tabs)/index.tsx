import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slider } from '@react-native-assets/slider';
import LocationService from '@/app/services/LocationService';
import { BORDER_RADIUS } from '@/app/constants';
import StorageService from '@/app/services/StorageService';


const locationService: LocationService = new LocationService("location-service-key");

export default function SearchScreen() {
  const router = useRouter();

  const [locationName, setLocationName] = useState<string>("");
  const [locationsNumber, setLocationsNumber] = useState<number>(1);

  const onFindButtonPress = async () => {
    if (locationName.trim().length == 0) {
      Alert.alert("Ошибка", "Название не может быть пустым!");
      return;
    }
    
    try {
      const foundLocations = await locationService.findLocations(locationName, locationsNumber, "ru");
      await StorageService.putLocations(foundLocations);
      router.push("locationChoice");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.childContainer]}>
        <Text style={styles.headingText}>Название</Text>

        <TextInput
          style={[styles.textInput, styles.basicText]}
          onChangeText={setLocationName}
          autoCapitalize="words"
          inputMode="search"
          placeholder="Например: Москва"
        />
      </View>
      <View style={[styles.container, styles.childContainer]}>
        <Text style={styles.headingText}>Количество</Text>
        <Text style={[styles.label, styles.basicText]}>{locationsNumber}</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={{}}
            value={1}
            minimumValue={1}
            maximumValue={10}
            step={1}
            onValueChange={setLocationsNumber}
            thumbStyle={{
              backgroundColor: "#6464c8",
            }}
            trackStyle={{
              backgroundColor: "#bebebe",
            }}
          />
        </View>
      </View>
      <View style={[styles.container, styles.childContainer]}>
        <TouchableOpacity onPress={onFindButtonPress}>
          <Text style={styles.findButtonText}>Найти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  childContainer: {
    margin: 20,
    width: "75%"
  },
  headingText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  basicText: {
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    margin: 20,
    borderWidth: 0.4,
    borderRadius: 5,
  },
  label: {
    margin: 20,
  },
  sliderContainer: {
    width: "100%",
    margin: -10,
  },
  findButtonText: {
    fontSize: 22,
    backgroundColor: "white",
    padding: 15,
    borderRadius: BORDER_RADIUS
  },
})
