import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import LocationDto from '@/dto/LocationDto'
import { BORDER_RADIUS } from '@/constants';


const getRepr = (x: any) => {
  return x == undefined ? "" : String(x) + ", "
}

const getLocationAddressRepr = (location: LocationDto): string => {
  const strs: (string | undefined)[] = [
    location.country,
    location.state,
    location.city,
    location.houseNumber
  ];

  let tmp = "";
  for (const str of strs) {
    tmp += getRepr(str);
  } 

  return tmp.substring(0, tmp.length - 2);
}

export default function LocationCard({location, onPress}: {location: LocationDto, onPress: () => void}) {  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationDescription}>{getLocationAddressRepr(location)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: "white",
    padding: 10,
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 8,
  },
  locationDescription: {
    fontSize: 14,
  },
})
