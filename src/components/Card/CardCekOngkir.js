import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { currencyFloat } from '@constants'

const CardCekOngkir = ({ item, index, onPress, press }) => (
        <TouchableOpacity style={index == press? style.borderOngkir : style.borderOngkir2} onPress={onPress}>
            <View>
                <Text style={index == press? style.textService : style.textService2}>{item.service}</Text>
                <Text style={index == press? style.textServiceName : style.textServiceName2}>{item.description}</Text>
            </View>
            {item.cost.map((e) => (
            <View style={style.detail}>
                <Text style={index == press? style.textServiceDays : style.textServiceDays2}>{e.etd} hari</Text>
                <Text style={index == press? style.textPrice : style.textPrice2}>{currencyFloat(e.value)}</Text>
            </View>
            ))}
        </TouchableOpacity>
)

export default CardCekOngkir;
const style = StyleSheet.create({
    borderOngkir: {
        width: '100%',
        height: RFValue(88),
        backgroundColor: '#167BDE',
        borderRadius: RFValue(10),
        marginBottom: RFValue(10),
        padding: RFValue(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    borderOngkir2: {
        width: '100%',
        height: RFValue(88),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        marginBottom: RFValue(10),
        padding: RFValue(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detail : {
        alignItems: 'flex-end'
    },
    textService: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(13),
        color: 'white'
    },
    textService2: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(13),
        color: '#1579DD'
    },
    textServiceName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    },
    textServiceName2: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: '#1579DD'
    },
    textServiceDays: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        color: 'white'
    },
    textServiceDays2: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        color: '#1579DD'
    },
    textPrice: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(16),
        color: 'white'
    },
    textPrice2: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(16),
        color: '#1579DD'
    }
})