import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CardSelectCourrier = ({ item, onPress, select, index }) => (
    <TouchableOpacity onPress={onPress} style={index == select? style.btn2 : style.btn}>
        <Text style={index == select? style.text2 : style.text}>{item.courrier}</Text>
    </TouchableOpacity>
)

export default CardSelectCourrier;

const style = StyleSheet.create({
    btn: {
        minWidth: RFValue(70),
        height: RFValue(27),
        borderRadius: RFValue(6),
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn2: {
        minWidth: RFValue(70),
        height: RFValue(27),
        borderRadius: RFValue(6),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11),
        color: 'white'
    },
    text2: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11),
        color: '#1579DD'
    }
})