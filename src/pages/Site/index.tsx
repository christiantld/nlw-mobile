import React from "react";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

interface Params {
  site: string;
}

const Site: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as Params;

  const pointSite = routeParams.site;
  console.log(pointSite);

  return (
    <WebView style={{ flex: 1 }} source={{ uri: `http://${pointSite}` }} />
  );
};

export default Site;
