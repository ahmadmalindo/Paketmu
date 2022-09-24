import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const NoDataSearch = (props) => (
    <View>
        <Image source={props.source} style={style.image}/>
        <Text style={props.style}>{props.label}</Text>
    </View>
)

export default NoDataSearch;
const style = StyleSheet.create({
    image: {
        width: RFValue(80),
        height: RFValue(80),
        alignSelf: 'center',
        marginTop: RFValue(35),
        marginBottom: RFValue(15)
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1579DD',
        fontSize: RFValue(14),
        alignSelf: 'center'
    }
})