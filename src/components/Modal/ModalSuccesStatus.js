import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";

const ModalSuccesStatus = (props) => (
    <Modal isVisible={props.isVisible}>
        <View style={style.contentModal}>
            <Image source={props.source} style={props.style}/>
            {props.email &&
            <Text style={style.textEmail}>{props.email}</Text>
            }
            {props.label &&
            <View style={{paddingHorizontal: RFValue(20)}}>
                <Text style={style.textEmailVerif}>{props.label}</Text>
            </View>
            }
            {props.label2 &&
            <View style={{paddingHorizontal: RFValue(40)}}>
                <Text style={style.textEmailVerif2}>{props.label2}</Text>
            </View>
            }
            {props.onPress &&
            <TouchableOpacity style={style.btn} onPress={props.onPress}>
                <Text style={style.textOK}>OK</Text>
            </TouchableOpacity>
            }
        </View>
    </Modal>
)

export default ModalSuccesStatus;
const style = StyleSheet.create({
    contentModal: {
        width: '90%',
        minHeight: RFValue(321),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btn: {
        width: '60%',
        height: RFValue(40),
        backgroundColor: '#1579DD',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textEmail: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(10),
        color: '#1579DD'
    },
    textEmailVerif: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(12),
        color: '#1579DD',
        marginBottom: RFValue(25),
        textAlign: 'center',
    },
    textEmailVerif2: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(14),
        color: '#1579DD',
        marginBottom: RFValue(25),
        textAlign: 'center',
    },
    textOK: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    }
})