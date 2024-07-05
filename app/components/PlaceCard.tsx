import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import PlaceDto from '../dto/PlaceDto'
import { Collapsible } from '@/components/Collapsible'
import { Image } from 'expo-image';
import { BORDER_RADIUS } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons'


type AbstractComponentProps = {
  property: any | undefined,
  producer: (property: any) => any,
}

type PlaceComponentProps = {
  place: PlaceDto,
}

function PropertyComponent(props: AbstractComponentProps) {
  return props.property == undefined
    ? <></>
    : props.producer(props.property);
}

function PopularityComponent(props: PlaceComponentProps) {
  const place: PlaceDto = props.place;
  const popularity: number | undefined = place.popularity;

  return (
    <View>
      {popularity == undefined
        ? <></>
        : <Text style={styles.popularityText}>{place.popularity + "/5"}</Text>
      }
    </View>
  );
}

function PlaceUrlComponent(props: PlaceComponentProps) {
  const place: PlaceDto = props.place;
  const placeUrl: string | undefined = place.placeUrl;

  return (
    <View>
      {placeUrl == undefined
        ? <></>
        : (
          <TouchableOpacity onPress={() => Linking.openURL(placeUrl)}>
            <View style={{
              borderWidth: 1,
              width: 18,
              height: 18,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}>
              <Ionicons name='information' size={15} />  
            </View>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

function NameComponent(props: PlaceComponentProps) {
  return (
    <View style={styles.nameContainer}>
      <Text style={styles.nameText}>{props.place.name}</Text>
    </View>
  );
}

function ImageComponent(props: PlaceComponentProps) {
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);

  return (
    <PropertyComponent
      property={props.place.previewLink}
      producer={(imageLink) => (
        <View style={styles.parentImageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: imageLink
              }}
              alt='place image'
              contentFit='contain'
              style={[
                styles.image,
                {
                  aspectRatio: (width / height)
                },
              ]}
              onLoad={(event) => {
                setHeight(event.source.height);
                setWidth(event.source.width);
              }}
            />
          </View>
        </View>
      )}
    />
  );
}

function PopularityPlaceUrlComponent(props: PlaceComponentProps) {
  const place: PlaceDto = props.place;
  const popularity: number | undefined = place.popularity;
  const placeUrl: string | undefined = place.placeUrl;

  return popularity == undefined && placeUrl == undefined
    ? <></>
    : (
      <View style={styles.popularityPlaceUrlContainer}>
        <PlaceUrlComponent place={place} />
        <PopularityComponent place={place} />      
      </View>
    );
}

function MainInfoComponent(props: PlaceComponentProps) {
  const place: PlaceDto = props.place;
  const placeUrl: string | undefined = place.placeUrl;

  return (
    <View>
        <PopularityPlaceUrlComponent place={place} />
        <NameComponent place={place} />
        <ImageComponent place={place} />
    </View>
  );
}

function DescriptionComponent(props: PlaceComponentProps) {
  return (
    <PropertyComponent
      property={props.place.description}
      producer={(description) => (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
    />
  );
}

function WikipediaLinkComponent(props: PlaceComponentProps) {
  return ( 
    <PropertyComponent
      property={props.place.wikipediaLink}
      producer={(wikipediaLink) => (
        <TouchableOpacity onPress={() => Linking.openURL(wikipediaLink)}>
          <View style={styles.wikipediaLinkContainer}>
            <Text style={styles.wikipediaLinkText}>Статья на Википедии</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

function DetailsComponent(props: PlaceComponentProps) {
  const place: PlaceDto = props.place;

  return place.description == undefined && place.wikipediaLink == undefined
    ? <></>
    : (
      <Collapsible title='Подробнее'>
        <View style={styles.detailsContainer}>
          <DescriptionComponent place={place} />
          <WikipediaLinkComponent place={place} />
        </View>
      </Collapsible>
    );
}

export default function PlaceCard({place}: {place: PlaceDto}) {
  return (
    <View style={styles.container}>
      <MainInfoComponent place={place} />
      <DetailsComponent place={place} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    padding: 5,
  },
  popularityPlaceUrlContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginRight: 15,
    justifyContent: "space-between",
  },
  popularityText: {
    fontSize: 12,
    backgroundColor: "#eeeeee",
    borderRadius: BORDER_RADIUS,
    padding: 5,
  },
  nameContainer: {
    backgroundColor: "white",
    borderRadius: 15,
  },
  nameText: {
    fontSize: 28,
    textAlign: "center",
  },
  parentImageContainer: {
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: 15,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: BORDER_RADIUS,
  },
  detailsContainer: {
    alignItems: "center",
  },
  descriptionContainer: {
    padding: 5,
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#eeeeee",
  },
  descriptionText: {
    fontSize: 11,
  },
  wikipediaLinkContainer: {
    marginTop: 5,
  },
  wikipediaLinkText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
})
