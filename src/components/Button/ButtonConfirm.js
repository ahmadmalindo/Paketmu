import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const ButtonConfirm = (props) => (
    <TouchableOpacity onPress={props.onPress} style={style.btn}>
        <Text style={style.text}>{props.label}</Text>
    </TouchableOpacity>
)

export default ButtonConfirm;
const style = StyleSheet.create({
    btn: {
        width: '100%',
        height: RFValue(40),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: '#167BDE'
    }
})