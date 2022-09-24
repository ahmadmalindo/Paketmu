import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import dataLacak from "./dataLacakPaket";
import { FlatGrid } from 'react-native-super-grid';
import { CardSelectCourrier, CardHistoryPaket, NoDataSearch } from 'components';
import moment from "moment/moment";
import { API_KEY_BINDERBYTE } from '@constants/BASE_URL';
import Icon from 'react-native-vector-icons/Feather';
import cekUtils from "@utils/CekUtils";
import { connect } from "react-redux";
import Modal from "react-native-modal";

function CekOngkir({ cek }){

    const [ awb, setAwb ] = useState('');
    const [ select, setSelect ] = useState();
    const [ press, setPress ] = useState('');
    const [ selectItem, setSelectItem ] = useState('');
    const [ visible, setVisible ] = useState(false)

    const LacakPaket = async () => {
        
        let params = {
            key: API_KEY_BINDERBYTE,
            courier: selectItem.id,
            awb: awb
        }

        const status = await cekUtils.LacakPaket(params)

        if (status == 200) {
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 1000)
        }
    }

    const Status = (val) => {

        let rtr 

        if (val == 'DELIVERED') {
            rtr = ['#02C338', 'Terkirim']
        }
        else {
            rtr = ['#ED0303', 'Belum Terkirim']
        }

        return rtr
    }

    let lacak = cek.lacak

    let detailPackageCourier = []

    if (lacak.data !== undefined) {
        detailPackageCourier = lacak.data.summary
    }

    let detailCity = []

    if (lacak.data != undefined) {
        detailCity = lacak.data.detail
    }

    let historyPackage = []

    if (lacak.data !== undefined) {
        historyPackage = lacak.data.history
    }

    return (
        <ScrollView style={{flex: 1}}>
        <LinearGradient colors={['#1880E1', '#0041BB']} style={style.container}>
        <StatusBar backgroundColor={'#1880E1'}/>
            <View style={{paddingHorizontal: RFValue(10)}}>
                <Text style={style.tittle}>Lacak Paket</Text>
                <View style={{paddingHorizontal: RFValue(10)}}>
                    <TextInput
                        placeholder="Masukkan nomor resimu"
                        value={awb}
                        onChangeText={(val) => setAwb(val)}
                        style={style.input}
                        placeholderTextColor='#1579DD'
                    />
                    <TouchableOpacity style={style.btnSearch} onPress={() => LacakPaket()}>
                        <Icon name="search" color={'#1579DD'} size={25}/>
                    </TouchableOpacity>
                </View>
                <Text style={style.textExpedition}>Pilih Ekpedisi:</Text>
                <FlatGrid
                    data={dataLacak}
                    renderItem={(({ item, index }) => (
                        <CardSelectCourrier
                            item={item}
                            index={index}
                            select={select}
                            onPress={() => {setSelect(index), setSelectItem(item)}}
                        />
                    ))}
                    itemDimension={70}
                    spacing={10}
                />
                {lacak.data !== undefined?
                <>
                <View>
                    {detailPackageCourier.service !== "" ?
                    <Text style={style.tittle2}>{detailPackageCourier.courier} ({detailPackageCourier.service})</Text>
                    :
                    <Text style={style.tittle2}>{detailPackageCourier.courier}</Text>
                    }
                    <Text style={style.textExpedition2}>Nomer Resi: {detailPackageCourier.awb}</Text>
                    <View style={style.contentRowDeliver}>
                        <View style={[style.cardDeliver, {backgroundColor: Status(detailPackageCourier.status)[0]}]}>
                            <Text style={style.textDeliver}>{Status(detailPackageCourier.status)[1]}</Text>
                        </View>
                        <Text style={style.textExpedition3}>{moment(detailPackageCourier.date).format('DD MMMM YYYY')}</Text>
                    </View>
                    {/* <Text style={style.textExpedition2Bold}>{detailPackageCourier.desc} {detailPackageCourier.amount} <Text style={style.textExpedition2}>/ {detailPackageCourier.weight}</Text></Text> */}
                </View>
                {detailCity.origin !== "" && detailCity.shipper !== "" && detailCity.destination !== "" && detailCity.receiver !== "" &&
                <View style={style.contentRowDetail}>
                    <View>
                        <Text style={style.textExpedition4}>Kota Asal</Text>
                        {detailCity.origin !== "" ?
                        <Text style={style.tittle3}>{detailCity.origin}</Text>
                        :
                        <Text style={style.tittle3}>-</Text>
                        }
                        <Text style={style.textExpedition4}>Pengirim</Text>
                        {detailCity.shipper !== "" ?
                        <Text style={style.tittle3}>{detailCity.shipper}</Text>
                        :
                        <Text style={style.tittle3}>-</Text>
                        }
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={style.textExpedition4}>Kota Tujuan</Text>
                        {detailCity.destination !== "" ?
                        <Text style={style.tittle3}>{detailCity.destination}</Text>
                        :
                        <Text style={style.tittle3}>-</Text>
                        }
                        <Text style={style.textExpedition4}>Penerima</Text>
                        {detailCity.receiver !== "" ?
                        <Text style={style.tittle3}>{detailCity.receiver}</Text>
                        :
                        <Text style={style.tittle3}>-</Text>
                        }
                    </View>
                </View>
                }
                <View>
                    <Text style={style.tittle2}>Perjalanan Paket</Text>
                    <View style={style.contentHistoryDeliver}>
                        <FlatList
                            data={historyPackage}
                            renderItem={(({ item, index }) => (
                                <CardHistoryPaket
                                    item={item}
                                    index={index}
                                    press={press}
                                    onPress={() => setPress(index)}
                                />
                            ))}
                        />
                    </View>
                </View>
                </>
                :
                <View style={{marginTop: RFValue(30)}}>
                    <NoDataSearch
                        source={require ('@assets/icon/akar-icons_searchwhite.png')}
                        label="Yuk Lacak Paketmu Dulu!"
                        style={style.textLabel}
                    />
                </View>
                }
            </View>
            <Modal isVisible={visible}>
                <ActivityIndicator color={'white'} size='large'/>
            </Modal>
        </LinearGradient>
        </ScrollView>
    )
}

const mapStateToProps = function (state) {
    const { cek } = state;
    return { cek }
}

export default connect (mapStateToProps) (CekOngkir);
const style = StyleSheet.create({
    container: {
        height: '100%',
        marginBottom: RFValue(215)
    },
    tittle: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(20),
        alignSelf: 'center',
        marginTop: RFValue(30)
    },
    tittle2: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(16),
        alignSelf: 'center',
        marginTop: RFValue(20)
    },
    tittle3: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(12),
        marginBottom: RFValue(10)
    },
    input: {
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(15),
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        marginTop: RFValue(20),
        marginBottom: RFValue(20)
    },
    textExpedition: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        color: 'white',
        alignSelf: 'center',
        marginBottom: RFValue(5)
    },
    textExpedition2: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: 'white',
        alignSelf: 'center',
        marginBottom: RFValue(5)
    },
    textExpedition2Bold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(10),
        color: 'white',
        alignSelf: 'center',
        marginBottom: RFValue(5)
    },
    textExpedition3: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: 'white',
        alignSelf: 'center',
    },
    textExpedition4: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(10),
        color: 'white',
    },
    contentRowDeliver: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(3),
        marginBottom: RFValue(5)
    },
    contentRowDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(20),
        marginBottom: RFValue(5),
        paddingHorizontal: RFValue(10)
    },
    cardDeliver: {
        minWidth: RFValue(55),
        height: RFValue(18),
        borderRadius: RFValue(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RFValue(10),
        marginRight: RFValue(5)
    },
    textDeliver: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(9),
        color: 'white',
    },
    contentHistoryDeliver: {
        paddingHorizontal: RFValue(10),
        marginTop: RFValue(15)
    },
    btnSearch: {
        position: 'absolute',
        bottom: RFValue(31),
        right: RFValue(20),
    },
    textLabel: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(14),
        alignSelf: 'center'
    }
})