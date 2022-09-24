import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, PanResponder, Dimensions, TextInput } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ScrollView } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import { ButtonConfirm, ModalSuccesStatus } from 'components';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

function ForgotPassword({ navigation }){

    const ForgotValidation = yup.object().shape({  
      email: yup
          .string() 
          .email('Format tidak email sesuai')
          .required('Email tidak boleh kosong'),
    })

    const [ isVisible, setIsVisible ] = useState(false)

    const handleConfirm = (val) => {
        
        if (val == 0) {
            navigation.navigate('signin')
        }
        else {
            auth()
                .sendPasswordResetEmail(val.email)
                .then((res) => {
                    setIsVisible(true)
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    return (
        <LinearGradient colors={['#1880E1', '#0041BB']} style={style.Container}>
        <StatusBar backgroundColor={'#1880E1'}/>
            <Icon name="close" color={'white'} size={25} onPress={() => handleConfirm(0)}/>
            <Image source={require ('@assets/image/rafiki3.png')} style={style.img}/>
            <Text style={style.textHead}>Lupa Pasword?</Text>
            <Text style={style.textSubHead}>Masukkan email kamu, kami akan segera kirim link untuk password kamu</Text>
            <Formik
                validationSchema={ForgotValidation}
                isValidating={true}
                initialValues={{ email: "" }}
                onSubmit={(values) => handleConfirm(values)}            
            >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
            <TextInput
                placeholder="Email Kamu"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholderTextColor={'#1579DD'}
                style={style.input}
            />
            {touched.email && errors.email &&
                <Text style={style.textError}>{errors.email}</Text>
            }
            <ButtonConfirm
                label='Kirim'
                onPress={() => handleSubmit()}
            />
            <ModalSuccesStatus
                isVisible={isVisible}
                source={require ('@assets/image/rafiki3.png')}
                style={style.imgAssets}
                email={values.email}
                label={'Yuk Cek Emailmu untuk Reset Password'}
                onPress={() => {setIsVisible(false), navigation.navigate('signin')}}
            />
            </>
            )}
            </Formik>
        </LinearGradient>   
    )
}

export default ForgotPassword;
const style = StyleSheet.create({
    Container: {
        flex: 1,
        padding: RFValue(20),
        // marginBottom: RFValue(180)
    },
    textHead: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(22),
        color: 'white',
        marginTop: RFValue(20),
        marginBottom: RFValue(-5)
    },
    textSubHead: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        color: 'white',
        marginBottom: RFValue(30)
    },
    img: {
        width: '80%',
        height: '30%',
        alignSelf: 'center',
        marginTop: RFValue(50),
        marginBottom: RFValue(20)
    },
    input: {
        width: '100%',
        height: RFValue(52),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(20),
        marginBottom: RFValue(50),
        fontFamily: 'Poppins-Regular'
    },
    textError: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: 'white',
        marginTop: RFValue(-40),
        marginLeft: RFValue(10),
        marginBottom: RFValue(30)
    },
    imgAssets: {
        width: '70%',
        height: '35%',
        marginBottom: RFValue(30)
    }
})