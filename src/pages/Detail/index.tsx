import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Linking } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import {
  Container,
  PointImage,
  PointName,
  PointService,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
  Site,
  SiteTitle,
} from "./styles";

import api from "../../services/api";

interface Params {
  id: number;
}

interface Point {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    site: string;
    city: string;
    uf: string;
  };
  service: {
    type: string;
  };
}

const Detail: React.FC = () => {
  const [point, setPoint] = useState<Point>({} as Point);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`/points/${routeParams.id}`).then((response) => {
      setPoint(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Contato via App 'Do Bairro'",
      recipients: [point.point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${point.point.whatsapp}&text=Olá, tenho interesse em saber mais sobre o seu comércio`
    );
  }

  function handleNavigateToSite(site: string) {
    if (site === "") return;
    navigation.navigate("Site", { site });
  }

  if (!point.point) {
    // TODO criar componente de loading
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#fccd3c" />
        </TouchableOpacity>

        <PointImage
          source={{
            uri: point.point.image,
          }}
        />
        <PointName>{point.point.name}</PointName>
        <PointService>{point.service.type}</PointService>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {point.point.city}, {point.point.uf}
          </AddressContent>
        </Address>
        {point.point.site !== "" && (
          <Site>
            <SiteTitle onPress={() => handleNavigateToSite(point.point.site)}>
              Site
            </SiteTitle>
            <Icon
              name="external-link"
              size={20}
              onPress={() => handleNavigateToSite(point.point.site)}
            />
          </Site>
        )}
      </Container>
      <Footer>
        <Button onPress={handleComposeMail} activeOpacity={0.7}>
          <Icon name="mail" size={20} color="#f9f9f5" />
          <ButtonText>Email</ButtonText>
        </Button>
        <Button onPress={handleWhatsapp} activeOpacity={0.7}>
          <FontAwesome name="whatsapp" size={20} color="#f9f9f5" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
