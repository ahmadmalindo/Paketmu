import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Animated from "react-native-reanimated";

const InputData2 = (props) => (
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

        {props.password2 &&
            <TouchableOpacity onPress={() => props.onPress(2)} style={style.showPassword}>
                <Text style={style.textShow}>Show</Text>
            </TouchableOpacity>
        }
    </TouchableOpacity>
)

export default InputData2;
const style = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: RFValue(35),
        color: 'white'
    },
    input2: {
        borderBottomWidth: 1,
        height: RFValue(40),
        borderBottomColor: 'white',
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
        color: 'white'
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
        color: 'white',
        marginTop: RFValue(-20),
        // marginLeft: RFValue(10),
        marginBottom: RFValue(30)
    },
})