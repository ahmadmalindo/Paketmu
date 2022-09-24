import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";
import { InputData } from 'components';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

function ModalUpdateProfile({ isVisible, onPress }){

    const UpdateUser = yup.object().shape({
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
    })

    const [ show, setShow ] = useState(false);
    const [ show2, setShow2 ] = useState(false);
    const [ show3, setShow3 ] = useState(false);
    const [ show4, setShow4 ] = useState(false);
    const [ secure,  setSecure ] = useState(true);
    const [ visible, setVisible ] = useState(false)

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
            else {
                setShow4(true)
            }
        }
        else {
            setSecure(!secure)
        }
    }

    const handleUpdateUser = (val) => {

        auth()
            .currentUser.updateProfile({
                displayName: val.username
            })
            .then((res) => {
                    console.log('a', res)
            })
            .catch((err) => {
                alert(err)
            })
        auth()
            .currentUser.updateEmail(val.email)
            .then((res) => {
                    console.log('b', res)
                })
            .catch((err) => {
                alert(err)
            })
        auth()
            .currentUser.updatePassword(val.password)
            .then((res) => {
                console.log('c', res)
            })
            .catch((err) => {
                alert(err)
            })

            setVisible(true)
            setTimeout(() => {
                onPress()
            }, 1000)
    }

    return (
        <Modal isVisible={isVisible}>
            <View style={style.contentModal}>
                <Formik 
                    validationSchema={UpdateUser}
                    isValidating={true}
                    initialValues={{ username: "", email: "", password: "" }}
                    onSubmit={(values) => handleUpdateUser(values)}   
                >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                <View style={style.contentInput}>
                    <InputData
                        placeholder='Username'
                        value={values.username}
                        onChangeText={handleChange('username')}
                        isError={touched.username && errors.username}
                        errorMessage={errors.username}
                        show={show}
                        onPress={(val) => handlePress(val)}
                    />
                    <InputData
                        placeholder='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        isError={touched.email && errors.email}
                        errorMessage={errors.email}
                        show={show2}
                        onPress={(val) => handlePress(val)}
                    />
                    <InputData
                        password
                        placeholder='Password'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        isError={touched.password && errors.password}
                        errorMessage={errors.password}
                        show={show3}
                        secureTextEntry={secure}
                        onPress={(val) => handlePress(val)}
                    />
                </View>
                <TouchableOpacity style={style.btn} onPress={() => handleSubmit()}>
                    <Text style={style.textUpdateProfile}>Update Profil</Text>
                </TouchableOpacity>
                </>
                )}
                </Formik>
                <TouchableOpacity style={style.btn2} onPress={onPress}>
                    <Text style={style.textUpdateProfileCancel}>Batal</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={visible}>
                <ActivityIndicator color={'#167BDE'} size={'large'}/>
            </Modal>  
        </Modal>
    )
}

export default ModalUpdateProfile;
const style = StyleSheet.create({
    contentModal: {
        width: '100%',
        minHeight: RFValue(387),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        padding: RFValue(25),
    },
    contentInput: {
        marginTop: RFValue(20),
    },
    btn: {
        width: '100%',
        height: RFValue(50),
        backgroundColor: '#1579DD',
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RFValue(5)
    },
    btn2: {
        width: '100%',
        height: RFValue(20),
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textUpdateProfile: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    },
    textUpdateProfileCancel: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(14),
        color: '#1579DD'
    }
})