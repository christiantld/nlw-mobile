import Constants from "expo-constants";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 32px;
  padding-top: ${Constants.statusBarHeight + 20}px;
`;

export const PointImage = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 10px;
  margin-top: 32px;
`;

export const PointName = styled.Text`
  color: #000045;
  font-size: 28px;
  font-family: "Roboto_400Regular";
  margin-top: 24px;
`;

export const PointService = styled.Text`
  color: #5e5eff;
  font-size: 16px;
  font-family: "Roboto_300Light";
  margin-top: 8px;
`;

export const Address = styled.View`
  margin-top: 32px;
`;

export const AddressTitle = styled.Text`
  color: #000045;
  font-size: 16px;
  font-family: "Roboto_700Bold";
`;

export const AddressContent = styled.Text`
  color: #5e5eff;
  font-size: 24px;
  font-family: "Roboto_300Light";
`;

export const Footer = styled.View`
  border-top-width: 3px;
  border-color: #ddd;
  padding: 20px 32px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  width: 48%;
  background-color: #f53b6b;
  border-radius: 30px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #f9f9f5;
  font-size: 16px;
  font-family: "Roboto_400Regular";
`;

export const Site = styled.View`
  margin-top: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90px;

  svg {
    padding-left: 8px;
  }
`;

export const SiteTitle = styled.Text`
  color: #000045;
  font-size: 20px;
  font-family: "Roboto_400Regular";
`;
