import Constants from "expo-constants";
import styled from "styled-components/native";

export const Container = styled.ImageBackground`
  flex: 1;
  margin-top: 80px;
  padding: 32px;
  padding-top: ${Constants.statusBarHeight + 20}px;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const SmallLogo = styled.Text`
  font-family: "HomemadeApple_400Regular";
  font-size: 18px;
  padding: 0 10px;
  color: #5e5eff;
`;

export const Title = styled.Text`
  font-family: "HomemadeApple_400Regular";
  justify-content: flex-end;
  font-size: 40px;
  padding: 0 10px;
  color: #5e5eff;
  max-width: 260px;
  margin-top: 64px;
`;

export const Description = styled.Text`
  font-size: 22px;

  font-family: "Roboto_300Light";
  color: #000045;
  max-width: 260px;
`;

export const CustonButton = styled.TouchableOpacity`
  height: 68px;
  margin-bottom: 48px;
  flex-direction: row;
  background: #f53b6b;
  border-radius: 35px;
  overflow: hidden;
  align-items: center;
`;

export const ActionText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-family: "Roboto_400Regular";
  font-size: 16px;
`;

export const ButtonIcon = styled.View`
  height: 68px;
  width: 68px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;
