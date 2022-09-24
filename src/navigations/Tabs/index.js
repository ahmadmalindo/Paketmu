import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import { View, Text, Image } from "react-native";
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Dashboard, CekOngkir, Account } from "../../scence";


const TabNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: '#262626',
        inactiveTintColor: '#B4B4B4',
        showLabel: false,
        style: {
            height: RFValue(55),
            backgroundColor:'#0067CA',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopColor: '#0000',
            position: 'absolute',
            paddingTop: RFValue(12),
            paddingBottom: RFValue(5),
        },
        tabBarPosition: "bottom",
        animationEnabled: true,
        swipeEnabled: true,
        unmountInactiveRoutes: true,
    },
 
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            switch(routeName){
                case 'home':
                    return <View style={style.menu}>
                        <Image source={focused ? require ('@assets/icon/tabs2.png') : require ('@assets/icon/tabs2filled.png')}/>
                        <Text style={ focused ? style.labelColor : style.label }>Cek Ongkir</Text>
                    </View>
                    break;
                case 'transaksi':
                    return <View style={style.menu}>
                        <Image source={focused ? require ('@assets/icon/tabs1.png') : require ('@assets/icon/tabs1filled.png')}/>
                        <Text style={ focused ? style.labelColor : style.label }>Lacak Paket</Text>
                    </View>
                    break;
                case 'akun':
                    return <View style={style.menu}>
                        <Image source={focused ? require ('@assets/icon/tabs3.png') : require ('@assets/icon/tabs3filled.png')}/>
                        <Text style={ focused ? style.labelColor : style.label }>Akun</Text>
                    </View>
                    break;      
            }
            
        },
    }),
}

const RouteConfigs = {
    home: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: "Cek Ongkir",
        }
        
    },
    transaksi:    {
        screen: CekOngkir,
        navigationOptions: {
            tabBarLabel: "Lacak Paket",
        }
        
    },
    akun:    {
        screen: Account,
        navigationOptions: {
            tabBarLabel: "Akun",
        }
        
    },
    
}
export default createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const style = ({
    icon:{
        
    },
    menu:{
        flex : 1,
        alignItems: 'center',
    },
    labelColor:{
        marginTop: RFValue(5),
        fontSize: RFValue(10),
        color: 'white',
        fontFamily: 'Poppins-Regular'
    },
    label :{
        marginTop: RFValue(5),
        fontSize: RFValue(10),
        color: '#0057AA',
        fontFamily: 'Poppins-Regular',
    },


})
