import Constants from "expo-constants";
import styled from "styled-components/native";
import { lighten, darken } from "polished";

export const Container = styled.View`
  flex: 1;
  padding: 32px;
  padding-top: ${Constants.statusBarHeight + 20}px;
`;
export const Title = styled.Text`
  font-size: 28px;
  color: #000045;
  font-family: "Roboto_300Light";
  margin-top: 24px;
`;

export const Description = styled.Text`
  font-size: 20px;
  font-family: "Roboto_300Light";
  margin-top: 4px;
  color: #5e5eff;
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 32px;
  justify-content: space-evenly;
`;

export const Item = styled.TouchableOpacity`
  background: #5e5eff;
  border: 5px solid #90aeff;
  border-width: 2px;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding-left: 8px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin: 0 6px;
  align-items: center;
  justify-content: space-evenly;

  text-align: center;
`;

export const ItemTitle = styled.Text`
  font-family: "Roboto_700Bold";
  text-align: center;
  font-size: 14px;
  color: #fccd3c;
`;

export const MapMarkerContainer = styled.View`
  width: 85px;
  height: 65px;
  background-color: #f53b6b;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: "Roboto_400Regular";
  color: #fff;
  font-size: 12px;
`;

export const MapMarkerImage = styled.Image`
  width: 90px;
  height: 45px;
`;
