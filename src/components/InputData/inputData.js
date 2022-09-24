import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Animated from "react-native-reanimated";

const InputData = (props) => (
    <TouchableOpacity onPress={() => props.onPress(0)}>
        {props.show == true ?
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            style={style.input}
            secureTextEntry={props.secureTextEntry}
        />
        :
        <View
            style={style.input2}
        />
        }
        {props.show == true ?
            <View style={style.viewShowTrue}>
                <Text style={style.textShow}>{props.placeholder}</Text>
            </View>
        :
            <View style={style.viewShowFalse}>
                <Text style={style.textShow}>{props.placeholder}</Text>
            </View>
        }

        {props.isError &&
            <Text style={style.textError}>{props.errorMessage}</Text>
        }

        {props.password &&
            <TouchableOpacity onPress={() => props.onPress(1)} style={style.showPassword}>
                <Text style={style.textShow}>Show</Text>
            </TouchableOpacity>
        }
    </TouchableOpacity>
)

export default InputData;
const style = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#1579DD',
        marginBottom: RFValue(35),
    },
    input2: {
        borderBottomWidth: 1,
        height: RFValue(40),
        borderBottomColor: '#1579DD',
        marginBottom: RFValue(35),
    },
    viewShowFalse: {
        width: '100%',
        position: 'absolute',
        top: RFValue(13),
    },
    viewShowTrue: {
        width: '100%',
        position: 'absolute',
        top: RFValue(-13)
    },
    textShow: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(11),
        color: '#1579DD'
    },
    showPassword: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: RFValue(15),
        right: RFValue(5)
    },
    textError: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: '#E63350',
        marginTop: RFValue(-20),
        // marginLeft: RFValue(10),
        marginBottom: RFValue(25)
    },
})