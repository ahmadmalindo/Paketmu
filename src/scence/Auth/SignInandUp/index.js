import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, PanResponder, Dimensions, ActivityIndicator } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from "native-base";
import { InputData2, ButtonConfirm, ModalSuccesStatus } from 'components';
import auth from '@react-native-firebase/auth';
import MMKVStorage from "react-native-mmkv-storage";
import Modal from 'react-native-modal';

function SignInandUp({ navigation }){

    const storage = new MMKVStorage.Loader().initialize();

    const [ isActive, setIsActive ] = useState(0);
    const [ show, setShow ] = useState(false);
    const [ show2, setShow2 ] = useState(false);
    const [ show3, setShow3 ] = useState(false);
    const [ show4, setShow4 ] = useState(false);
    const [ show5, setShow5 ] = useState(false);
    const [ secure, setSecure ] = useState(true);
    const [ secure2, setSecure2 ] = useState(true);
    const [ visible, setVisible ] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false)

    const RegisterValidation = yup.object().shape({
      username: yup
          .string()
          .min(3, ({ min }) => `Username minimal ${min} karakter`)
          .max(50, ({ max }) => `Username minimal ${max} karakter` ) 
          .required('Username harus diisi'),
      email: yup
          .string() 
          .email('Format tidak email sesuai')
          .required('Email tidak boleh kosong'),
      password: yup
          .string()
          .min(8, ({ min }) => `Password minimal ${min} karakter`)
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password Harus Mengandung Huruf Besar, Huruf Kecil dan Angka")
          .required('Password tidak boleh kosong'),
      confirmPassword: yup
          .string()
          .min(8, ({ min }) => `Password minimal ${min} karakter`)
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password Harus Mengandung Huruf Besar, Huruf Kecil dan Angka")
          .oneOf([yup.ref('password'), null], 'Password Harus Sama')
          .required('Password tidak boleh kosong'),
    })

    const LoginValidation = yup.object().shape({  
      email: yup
          .string() 
          .email('Format tidak email sesuai')
          .required('Email tidak boleh kosong'),
      password: yup
          .string()
          .min(8, ({ min }) => `Password minimal ${min} karakter`)
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password Harus Mengandung Huruf Besar, Huruf Kecil dan Angka")
          .required('Password tidak boleh kosong'),
    })

    const handleActive = (val) => {
        
        if (val == 0) {
            setIsActive(1)
        }
        else {
            setIsActive(0)
        }
    }

    const handlePress = (val) => {
        
        if (val == 0) {
            if (show == false) {
                setShow(true)
            }
            else if (show2 == false) {
                setShow2(true)
            }
            else if (show3 == false) {
                setShow3(true)
            }
            else if (show4 == false) {
                setShow4(true)
            }
            else {
                setShow5(true)
            }
        }
        else if (val == 1) {
            setSecure(!secure)
        }
        else {
            setSecure2(!secure2)
        }
    }

    const handleRegister = (values) => {
        
        auth()
            .createUserWithEmailAndPassword(values.email, values.confirmPassword)
            .then((res) => {
                res.user.updateProfile({
                    displayName: values.username
                })
                setIsVisible(true)
                setTimeout(() => {
                    setIsVisible(false)
                    setIsActive(0)
                },1000)
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                    }

                    if (err.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    }
            })
    }

    const handleLogin = (values) => {

        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                storage.setMap('user', res)
                storage.setString('token', res.user.uid)
                setVisible(true)
                setTimeout(() => {
                    navigation.navigate('dashboard')
                    setVisible(false)
                }, 1000)
            })
            .catch((err) => {
                alert(err.message)
            })   
    }   

    return (
        <ScrollView style={{flex: 1}}>
        <LinearGradient colors={['#1880E1', '#0041BB']} style={style.Container}>
        <StatusBar backgroundColor={'#1880E1'}/>
        {isActive !== 0 ?
        <View>
            <Text style={style.textHead}>Selamat Datang</Text>
            <Text style={style.textSubHead}>Yuk lengkapi Data Dirimu!</Text>
        </View>
        :
        <View>
            <Text style={style.textHead}>Hallo</Text>
            <Text style={style.textSubHead}>Yuk masukkan email dan password kamu!</Text>
        </View>
        }
        <View style={style.contentRow}>
            <TouchableOpacity style={isActive == 0 ? style.btn : style.btnActive} onPress={() => handleActive(0)}>
                <Text style={isActive == 0 ? style.textBtn : style.textBtnActive}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={isActive == 1 ? style.btn : style.btnActive} onPress={() => handleActive(1)}>
                <Text style={isActive == 1 ? style.textBtn : style.textBtnActive}>Login</Text>
            </TouchableOpacity>
        </View>
        {isActive !== 0 ?
        <Formik
            validationSchema={RegisterValidation}
            isValidating={true}
            initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={(values) => handleRegister(values)}            
        >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
            <View>
                <InputData2
                    placeholder='Username'
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onPress={(val) => handlePress(val)}
                    isError={touched.username && errors.username}
                    errorMessage={errors.username}
                    show={show}
                />
                <InputData2
                    placeholder='Email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onPress={(val) => handlePress(val)}
                    isError={touched.email && errors.email}
                    errorMessage={errors.email}
                    show={show3}
                />
                <InputData2
                    password
                    placeholder='Password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    isError={touched.password && errors.password}
                    errorMessage={errors.password}
                    secureTextEntry={secure}
                    onPress={(val) => handlePress(val)}
                    show={show4}
                />
                <InputData2
                    password2
                    placeholder='Confirm Password'
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    isError={touched.confirmPassword && errors.confirmPassword}
                    errorMessage={errors.confirmPassword}
                    secureTextEntry={secure2}
                    onPress={(val) => {handlePress(val)}}
                    show={show5}
                />
            </View>
        <ButtonConfirm
            label='Daftar'
            onPress={() => handleSubmit()}
        />
        </>
        )}
        </Formik>
        :
        <Formik
            validationSchema={LoginValidation}
            isValidating={true}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleLogin(values)}            
        >
        {({handleChange, handleSubmit, values, errors, touched }) => (
        <>
            <View>
                <InputData2
                    placeholder='Email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onPress={(val) => handlePress(val)}
                    isError={touched.email && errors.email}
                    errorMessage={errors.email}
                    show={show3}
                />
                <InputData2
                    password
                    placeholder='Password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    isError={touched.password && errors.password}
                    errorMessage={errors.password}
                    secureTextEntry={secure}
                    onPress={(val) => handlePress(val)}
                    show={show4}
                />
                <Text style={style.textQuest}>Belum punya akun? <Text style={style.textQuestBold} onPress={() => handleActive(0)}>Register</Text></Text>
                <Text style={style.textQuestBold} onPress={() => navigation.navigate('forgotpassword')}>Lupa Password?</Text>
            </View>
        <ButtonConfirm
            label='Masuk'
            onPress={() => handleSubmit()}
        />
        </>
        )}
        </Formik>
        }
        </LinearGradient> 
        <Modal isVisible={visible}>
            <ActivityIndicator color={'#167BDE'} size={'large'}/>
        </Modal>  
        <ModalSuccesStatus
            isVisible={isVisible}
            source={require ('@assets/image/rafiki2.png')}
            label2={'Yeay Kamu Berhasil Membuat Akun!'}
            style={style.imgAsset}
        />
        </ScrollView>
    )
}

export default SignInandUp;
const style = StyleSheet.create({
    Container: {
        padding: RFValue(20),
        height: '110%',
        marginBottom: RFValue(250)
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
    contentRow: {
        flexDirection: 'row',
        width: '100%',
        height: RFValue(67),
        backgroundColor: 'white',
        borderRadius: RFValue(15),
        padding: RFValue(10),
        alignItems: 'center',
        marginBottom: RFValue(50)
    },
    btn: {
        width: '50%',
        height: RFValue(56),
        backgroundColor: 'white',
        borderRadius: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnActive: {
        width: '50%',
        height: RFValue(56),
        backgroundColor: '#167BDE',
        borderRadius: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnActive: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(14),
        color: 'white',
    },
    textBtn: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(14),
        color: '#167BDE',
    },
    textQuest: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        color: 'white',
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(-5)
    },
    textQuestBold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(12),
        color: 'white',
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(50)
    }
})