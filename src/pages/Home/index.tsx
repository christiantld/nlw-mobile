import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import {
  Container,
  Main,
  CustonButton,
  Title,
  Description,
  ActionText,
  ButtonIcon,
} from "./styles";

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECitiesResponse {
  nome: string;
}

const Home: React.FC = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUfResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<IBGECitiesResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cities = response.data.map((city) => city.nome);

        setCities(cities);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    if (selectedCity === "0") return;

    navigation.navigate("Points", { uf: selectedUf, city: selectedCity });
  }

  function handleSelectedUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectedCity(city: string) {
    setSelectedCity(city);
  }

  return (
    <>
      <Container source={require("../../assets/131.png")} resizeMethod="auto">
        <Main>
          <Title>Do Bairro</Title>
          <Description>
            Uma forma simples de conectar a comunidade de moradores com o
            comércio local.
          </Description>
          <RNPickerSelect
            placeholder={{ label: "Selecione um estado" }}
            Icon={() => <Icon name="chevron-down" size={20} color="#fccd3c" />}
            style={{
              placeholder: {
                fontFamily: "Roboto_400Regular",
                alignItems: "center",
                fontSize: 16,
                color: "#5e5eff",
              },
              viewContainer: {
                height: 60,
                backgroundColor: "#f9f9f5",
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
                paddingTop: 5,
              },
              iconContainer: {
                padding: 20,
              },
            }}
            onValueChange={(value) => handleSelectedUf(value)}
            items={ufs.map((uf) => ({ label: uf, value: uf }))}
          />
          <RNPickerSelect
            placeholder={{ label: "Selecione uma cidade" }}
            Icon={() => <Icon name="chevron-down" size={20} color="#fccd3c" />}
            style={{
              placeholder: {
                fontFamily: "Roboto_400Regular",
                alignItems: "center",
                fontSize: 16,
                color: "#5e5eff",
              },
              viewContainer: {
                height: 60,
                backgroundColor: "#f9f9f5",
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
                paddingTop: 5,
              },
              iconContainer: {
                padding: 20,
              },
            }}
            onValueChange={(value) => handleSelectedCity(value)}
            items={cities.map((city) => ({ label: city, value: city }))}
          />
        </Main>
        <CustonButton onPress={handleNavigateToPoints} activeOpacity={0.7}>
          <ButtonIcon>
            <Text>
              <Icon name="arrow-right" color="#f9f9f5" size={24} />
            </Text>
          </ButtonIcon>
          <ActionText>Descubra estabelecimentos</ActionText>
        </CustonButton>
      </Container>
    </>
  );
};

export default Home;
