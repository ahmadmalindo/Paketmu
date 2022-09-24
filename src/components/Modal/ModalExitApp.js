import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";

const ModalExitApp = (props) => (
    <Modal isVisible={props.isVisible}>
        <View style={style.contentModal}>
            <Text style={style.textCancel}>Yakin Ingin Keluar?</Text>
            <View style={style.rowViewSelect}>
                <TouchableOpacity onPress={() => props.onPress(1)} style={style.btn}>
                    <Text style={style.textOK}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPress(2)} style={style.btn2}>
                    <Text style={style.textCancel}>Batal</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
)

export default ModalExitApp;
const style = StyleSheet.create({
    contentModal: {
        width: '80%',
        height: RFValue(137),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btn: {
        width: '40%',
        height: RFValue(40),
        backgroundColor: '#1579DD',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: RFValue(25)
    },
    btn2: {
        width: '20%',
        height: RFValue(40),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    rowViewSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: RFValue(15)
    },
    textOK: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    },
    textCancel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: '#1579DD'
    }
})