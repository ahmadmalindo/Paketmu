import { createStackNavigator } from "react-navigation-stack";

import { Dashboard, CekOngkir, Account } from "../../scence/index";
import Tabs from '../Tabs'

const AppNavigatorConfig = {
    initialRouteName: "dashboard",
    headerMode: "none"
}

const RouteConfigs = {
    dashboard : Tabs,
    cekongkir: CekOngkir,
    account: Account
}

export default createStackNavigator(RouteConfigs, AppNavigatorConfig);