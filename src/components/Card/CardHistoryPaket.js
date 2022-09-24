import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CardHistoryPaket = ({ item, index, onPress, press }) => (
    <TouchableOpacity onPress={onPress} style={index == press? style.btn : style.btn2}>
        <Text style={index == press? style.textDate : style.textDate2}>{item.date}</Text>
        <Text style={index == press? style.textStatus : style.textStatus2}>{item.desc}</Text>
    </TouchableOpacity>
)

export default CardHistoryPaket;
const style = StyleSheet.create({
    btn: {
        width: '100%',
        minHeight: RFValue(56),
        backgroundColor: 'white',
        marginBottom: RFValue(10),
        borderRadius: RFValue(10),
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(20),
        justifyContent: 'center',
    },
    btn2: {
        width: '100%',
        minHeight: RFValue(56),
        marginBottom: RFValue(10),
        borderRadius: RFValue(10),
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(20),
        justifyContent: 'center',
    },
    textDate: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11),
        color: '#1579DD',
        marginBottom: RFValue(-2)
    },
    textDate2: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11),
        color: 'white',
        marginBottom: RFValue(-2)
    },
    textStatus: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(10),
        color: '#1579DD',
    },
    textStatus2: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(10),
        color: 'white',
    }
})