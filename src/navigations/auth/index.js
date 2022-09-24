import { createStackNavigator } from "react-navigation-stack";
import { SignInandUp, ForgotPassword } from "../../scence";
import AuthCheck from '../../index'

const AuthNavigatorConfig = {
    initialRouteName: "authCheck",
    headerMode: "none",
}

const RouteConfigs = {
    authCheck: AuthCheck,
    signin: SignInandUp,
    forgotpassword : ForgotPassword
}

export default createStackNavigator(RouteConfigs, AuthNavigatorConfig)
