import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import cekUtils from "@utils/CekUtils";
import { API_KEY_RAJA, BASE_URL_2 } from "@constants/BASE_URL";

function ModalCekOngkir({ isVisible, onPress, cek }){

    const [ provinceFrom, setProvinceFrom ] = useState();
    const [ provinceTo, setProvinceTo ] = useState();
    const [ cityFrom, setCityFrom ] = useState();
    const [ cityTo, setCityTo ] = useState();
    const [ courier, setCourier ] = useState()
    const [ weight, setWeight ] = useState('');
    const [ visible, setVisible ] = useState(false)

    const ProvinceCek = async() => {

        let params = {
            key : API_KEY_RAJA
        }
        
        await cekUtils.ProvinceCek(params)
    }

    const CityCekFrom = async(itemValue) => {
        
        setProvinceFrom(itemValue)

        let params = {
            key : API_KEY_RAJA,
            province: itemValue
        }
        
        await cekUtils.CityCekFrom(params)
    }

    const CityCekTo = async(itemValue) => {
        
        setProvinceTo(itemValue)
        
        let params = {
            key : API_KEY_RAJA,
            province: itemValue
        }
        
        await cekUtils.CityCekTo(params)
    }

    const ConfirmCek = async () => {
        
        let params = {
            origin: cityFrom,
            destination: cityTo,
            weight: parseInt(weight),
            courier: courier,
            key: API_KEY_RAJA
        }
        
        const status = await cekUtils.OngkirCek(params)
        
        if (status == 200){
            setVisible(true)
            setTimeout(() => {
                onPress()
                setVisible(false)
            }, 1000)
        }
        else {
            Alert.alert('Perhatian', 'isi field yang belum di isi')
        }
    }

    useEffect(() => {
        ProvinceCek()
        CityCekTo()
    }, [])

    const provinceId = cek.province
    const city = cek.city
    const city2 = cek.cityTo

    return (
        <Modal isVisible={isVisible}>
            <View style={style.contentModal}>
                <Text style={style.textHead}>Pilih Kota Asal</Text>
                <View style={style.contentKotaAsal}>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Pilih Provinsi</Text>
                        <View style={style.viewPick}>
                            <Picker
                                selectedValue={provinceFrom}
                                onValueChange={(itemValue) => CityCekFrom(itemValue)}
                                style={style.itemPick}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label='Pilih Provinsi' value='0' />
                            {provinceId.map((e) => (
                                <Picker.Item label={e.province} value={e.province_id} />
                            ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Pilih Kota</Text>
                        <View style={style.viewPick}>
                            <Picker
                                selectedValue={cityFrom}
                                onValueChange={(itemValue) => setCityFrom(itemValue)}
                                style={style.itemPick}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label='Pilih Kota' value='0' />
                            {city.map((e) => (
                                <Picker.Item label={e.city_name} value={e.city_id} />
                            ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <Text style={style.textHead}>Pilih Kota Tujuan</Text>
                <View style={style.contentKotaAsal}>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Pilih Provinsi</Text>
                        <View style={style.viewPick}>
                            <Picker
                                selectedValue={provinceTo}
                                onValueChange={(itemValue) => CityCekTo(itemValue)}
                                style={style.itemPick}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label='Pilih Provinsi' value='0' />
                            {provinceId.map((e) => (
                                <Picker.Item label={e.province} value={e.province_id} />
                            ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Pilih Kota</Text>
                        <View style={style.viewPick}>
                            <Picker
                                selectedValue={cityTo}
                                onValueChange={(itemValue) => setCityTo(itemValue)}
                                style={style.itemPick}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label='Pilih Kota' value='0' />
                            {city2.map((e) => (
                                <Picker.Item label={e.city_name} value={e.city_id} />
                            ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={style.contentBeratBarang}>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Berat Barang</Text>
                        <View style={style.viewInput}>
                            <View style={style.viewKg}>
                                <Text style={style.textKg}>Gr</Text>
                            </View>
                            <TextInput
                                value={weight}
                                onChangeText={(val) => setWeight(val)}
                                style={style.textInput}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                    <View style={{width: '55%'}}>
                        <Text style={style.textSubHead}>Kurir</Text>
                        <View style={style.viewPick}>
                            <Picker
                                selectedValue={courier}
                                onValueChange={(itemValue) => setCourier(itemValue)}
                                style={style.itemPick}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label="Pilih Kurir" value="0" />
                                <Picker.Item label="JNE" value="jne" />
                                <Picker.Item label="TIKI" value="tiki" />
                                <Picker.Item label="POS" value="pos" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={style.buttonApprove} onPress={ConfirmCek}>
                    <Text style={style.textApprove}>Terapkan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonCancel} onPress={onPress}>
                    <Text style={style.textCancel}>Batal</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={visible}>
                <ActivityIndicator color={'#167BDE'} size='large'/>
            </Modal>
        </Modal>
    )
}

const mapStateToProps = function (state) {
    const { cek } = state;
    return { cek }
}

export default connect (mapStateToProps) (ModalCekOngkir);
const style = StyleSheet.create({
    contentModal: {
        width: '100%',
        height: RFValue(467),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        padding: RFValue(20)
    },
    textHead: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: '#1579DD',
        marginBottom: RFValue(15)
    },
    textSubHead: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(12),
        color: '#1579DD',
        marginBottom: RFValue(5)
    },  
    viewPick: {
        width: '80%',
        height: RFValue(29),
        backgroundColor: '#157ADD',
        justifyContent: 'center',
        borderRadius: RFValue(6),
    },
    viewInput: {
        width: '80%',
        height: RFValue(29),
        backgroundColor: '#157ADD',
        borderRadius: RFValue(6),
        justifyContent: 'center'
    },
    viewKg: {
        width: RFValue(29),
        height: RFValue(29),
        borderRadius: RFValue(6),
        position: 'absolute',
        backgroundColor: '#0A5BCB',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
    },
    itemPick: {
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: RFValue(8)
    },
    contentKotaAsal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(20)
    },
    contentBeratBarang: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(30)
    },
    buttonApprove: {
        width: '100%',
        height: RFValue(53),
        borderRadius: RFValue(10),
        backgroundColor: '#157ADD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCancel: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(10)
    },
    textApprove: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    },
    textCancel: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(14),
        color: '#1579DD'
    },
    textKg: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(14),
        color: 'white'
    },
    textInput: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(9),
        color: 'white',
        paddingHorizontal: RFValue(10),
        height: RFValue(39)
    }
})