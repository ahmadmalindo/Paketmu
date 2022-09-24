import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import MMKVStorage from 'react-native-mmkv-storage';
import Animated, { BounceIn, BounceInDown, BounceOut, SlideInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

class AuthCheck extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    performTimeConsumingTask = async () => {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve('result');
            }, 1000),
        );
    };

    async componentDidMount() {

        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            const storage = new MMKVStorage.Loader().initialize();

            const session = await storage.getString('token'); 

            this.props.navigation.navigate(session ? 'dashboard' : 'signin')
        }
    }

    render() {
        return (
            <LinearGradient colors={['#1880E1', '#0041BB']} style={style.Container}>
                <Animated.View style={style.content} entering={BounceIn}>
                    <Image source={require ('@assets/image/bxs_package.png')} style={style.img}/>
                    <Text style={style.textHead}>Paketmu</Text>
                    <Text style={style.textSubHead}>Lacak dan Cek Ongkir Paketmu</Text>
                </Animated.View>
            </LinearGradient>
        );
    }
}

export default connect(null, null)(AuthCheck);

const style = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '60%',
        height: '30%',
        marginBottom: RFValue(20)
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: RFValue(700)
    },
    textHead: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(30),
        color: 'white'
    },
    textSubHead: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(14),
        color: 'white'
    }
})