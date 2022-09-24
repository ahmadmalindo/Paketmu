import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthStack from "./auth";
import AppStack from "./app";

const RootNavigator = createSwitchNavigator({
    auth: AuthStack,
    app: AppStack
});

export default createAppContainer(RootNavigator)