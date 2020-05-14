import React, { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

export default function withSuspense(Component) {
  console.log(Component.props);
  return class extends React.Component {
    render() {
      return (
        <Suspense
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          }
        >
          <Component />
        </Suspense>
      );
    }
  };
}
