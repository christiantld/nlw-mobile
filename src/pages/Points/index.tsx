import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import * as Location from "expo-location";
import api from "../../services/api";

import {
  Container,
  Title,
  Description,
  MapContainer,
  ItemsContainer,
  Item,
  ItemTitle,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
} from "./styles";

interface Service {
  id: number;
  name: string;
  image_url: string;
}

interface Point {
  id: number;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
}

interface Params {
  city: string;
  uf: string;
}

const Points: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number[]>([0]);
  const [initialPositon, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [points, setPoints] = useState<Point[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  // Get services from api
  useEffect(() => {
    api.get("/services").then((response) => {
      setServices(response.data);
    });
  }, []);

  // Get mobile location
  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Oops...", "Precisamos da sua permissão para continuar ");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get("/points", {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          service: selectedService,
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, [selectedService]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate("Detail", { id });
  }

  function handleSelectService(id: number) {
    setSelectedService([id]);
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#fccd3c" />
        </TouchableOpacity>
        <Title>Bem-Vindo</Title>
        <Description>Descubra no mapa o comércio perto de você. </Description>
        <MapContainer>
          {initialPositon[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPositon[0] === 0}
              initialRegion={{
                latitude: initialPositon[0],
                longitude: initialPositon[1],
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  onPress={() => handleNavigateToDetail(point.id)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage
                      source={{
                        uri: point.image,
                      }}
                    />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </Marker>
              ))}
            </MapView>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {services.map((service) => (
            <Item
              key={service.id}
              onPress={() => handleSelectService(service.id)}
              activeOpacity={0.7}
              style={
                selectedService.includes(service.id) ? styles.selected : {}
              }
            >
              <SvgUri width={58} height={58} uri={service.image_url} />
              <ItemTitle>{service.name}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  mapMarker: {
    width: 90,
    height: 80,
  },
  selected: {
    backgroundColor: "#f53b6b",
  },
});
export default Points;
