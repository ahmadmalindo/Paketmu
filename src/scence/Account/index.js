import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, FlatList, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Feather';
import { ModalUpdateProfile, ModalSuccesStatus, ModalExitApp } from '@components'
import MMKVStorage from "react-native-mmkv-storage";
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';

const storage = new MMKVStorage.Loader().initialize()

function Account({ navigation }){

    const account = storage.getMap('user')

    let user = []

    if (account !== null) {
        user = account.user
    }

    const [ visible, setVisible ] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ isActive, setIsActive ] = useState(false)

    const Status = (val) => {

        let rtr

        if (val == true) {
            rtr = ['Verified', '#02C338', 'white']
        }
        else {
            rtr = ['Not Verified', '#ED0303', 'white']
        }

        return rtr
    }

    const handlePress = (val) => {
        
        if (val == 1) {
            setIsActive(true)
            setTimeout(() => {
                setIsActive(false)
                storage.clearStore()
                navigation.navigate('signin')
            }, 1000)
        }
        else {
            setShow(false)
        }
    }

    const handleVerif = () => {
        auth()
            .currentUser.sendEmailVerification()
            .then((res) => {
                console.log(res)
                setIsVisible(true)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <>
        <LinearGradient colors={['#1880E1', '#0041BB']} style={style.container}>
        <StatusBar backgroundColor={'#1880E1'}/>
            <Text style={style.tittle}>Akun</Text>
            <Image source={require ('@assets/icon/Profile.png')} style={style.img}/>
            <Text style={style.textName}>{user.displayName}</Text>
            <View style={style.contentRowPhone}>
                {user.phoneNumber == null ?
                <Text style={style.textPhone}>{user.email}</Text>
                :
                <Text style={style.textPhone}>{user.phoneNumber}</Text>
                }
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image source={require ('@assets/icon/pen.png')}/>
                </TouchableOpacity>
            </View>
            <View style={[style.labelVerif, {backgroundColor: Status(user.emailVerified)[1]}]}>
                <Text style={style.textVerif}>{Status(user.emailVerified)[0]}</Text>
            </View>
            <View>
                {user.emailVerified !== true &&
                <>
                <Text style={style.textConfirmVerif}>Sudah Verifikasi Akun?</Text>
                <TouchableOpacity style={style.btnSendVerif} onPress={() => handleVerif()}>
                    <Text style={style.textQuestionVerif}>Verifikasi Akun</Text>
                </TouchableOpacity>
                </>
                }
                <TouchableOpacity style={style.contentLogOut} onPress={() => setShow(true)}>
                    <Text style={style.textLogOut}>Keluar</Text>
                    <Icon name="log-out" color={'white'} size={20}/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
        <ModalUpdateProfile
            isVisible={visible}
            onPress={() => setVisible(false)}
        />
        <ModalSuccesStatus
            isVisible={isVisible}
            source={require ('../../assets/image/rafiki.png')}
            email={user.email}
            label={'Yuk Cek Emailmu untuk verifikasi'}
            style={style.imgAssets}
            onPress={() => setIsVisible(false)}
        />
        <ModalExitApp
            isVisible={show}
            onPress={(val) => handlePress(val)}
        />
        <Modal isVisible={isActive}>
            <ActivityIndicator color={'#167BDE'} size={'large'}/>
        </Modal>
        </>
    )
}


export default Account;
const style = StyleSheet.create({
    container: {
        height: '100%',
        marginBottom: RFValue(100)
    },
    tittle: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(20),
        alignSelf: 'center',
        marginTop: RFValue(30),
        marginBottom: RFValue(50)
    },
    img: {
        width: '24%',
        height: '12%',
        alignSelf: 'center',
        marginBottom: RFValue(20)
    },
    textName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(16),
        color: 'white',
        alignSelf: 'center'
    },
    contentRowPhone: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: RFValue(10)
    },
    textPhone: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: 'white',
        marginRight: RFValue(5)
    },
    labelVerif: {
        minWidth: RFValue(64),
        height: RFValue(18),
        borderRadius: RFValue(4),
        backgroundColor: '#02C338',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: RFValue(40),
        paddingHorizontal: RFValue(10)
    },
    textVerif: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(10),
        color: 'white',
    },
    textConfirmVerif: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(10),
        color: 'white',
        alignSelf: 'center',
        marginBottom: RFValue(10)
    },
    btnSendVerif: {
        width: '43%',
        height: RFValue(40),
        borderRadius: RFValue(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: RFValue(10)
    },
    textQuestionVerif: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(12),
        color: '#1579DD',
    },
    contentLogOut: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textLogOut: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(12),
        color: 'white',
        marginRight: RFValue(5)
    },
    imgAssets: {
        width: '70%',
        height: '35%',
        marginBottom: RFValue(30)
    }
})