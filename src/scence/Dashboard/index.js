import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, PanResponder, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color, event, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons';
import Animated from "react-native-reanimated";
import { FlatList, Gesture, GestureDetector } from "react-native-gesture-handler";
import { CardCekOngkir, ModalCekOngkir, NoDataSearch } from "@components";
import { connect } from "react-redux";

function Dashboard({ navigation, cek }){

    const [ press, setPress ] = useState('');
    const [ visible, setVisible ] = useState(false);

    const translateY = useSharedValue(0)

    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value}
        })
        .onUpdate((event) => {
            translateY.value =  event.translationY + context.value.y
                translateY.value = Math.max(translateY.value, - windowHeight)
        }) 
    const rBottomSheet = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })
    
    useEffect(() => {
        translateY.value = withTiming(-windowHeight / 2.6)
    }, [])

    const openModal = () => {
        setVisible(true)
    }

    let ongkir = []

    if (cek.ongkir !== undefined) {
        ongkir = cek.ongkir
    }

    let cityFrom = []

    if (ongkir.origin_details !== undefined) {
        cityFrom = ongkir.origin_details
    }

    let cityTo = []

    if (ongkir.destination_details !== undefined) {
        cityTo = ongkir.destination_details
    }
    
    let packageOngkir = []

    if (ongkir.results !== undefined) {
        packageOngkir = ongkir.results[0].costs
    }

    let expedition = []

    if (ongkir.results !== undefined){
        expedition = ongkir.results[0]
    }

        return (
            <>
            <LinearGradient colors={['#1880E1', '#0041BB']} style={style.container}>
            <StatusBar backgroundColor={'#1880E1'}/>
            <Text style={style.tittle}>Cek Ongkir</Text>
            <View style={style.barContainer}>
                {ongkir.results !== undefined ?
                <View style={style.barCheck}>
                    <TouchableOpacity style={style.contentCityFrom} onPress={openModal}>
                        <Text style={style.cityFrom}>Kota Asal</Text>
                        <Text style={style.city}>{cityFrom.province}</Text>
                        <Text style={style.detailCity}>{cityFrom.city_name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.shape}>
                        <Image source={require ('@assets/icon/akar-icons_arrow-right-left.png')} style={style.iconImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.contentCityTo} onPress={openModal}>
                        <Text style={style.cityFrom}>Kota Tujuan</Text>
                        <Text style={style.city}>{cityTo.province}</Text>
                        <Text style={style.detailCity}>{cityTo.city_name}</Text>
                    </TouchableOpacity>
                </View>
                : 
                <View style={style.barCheck}>
                    <TouchableOpacity style={style.contentCityFrom} onPress={openModal}>
                        <Text style={style.cityFrom}>Kota Asal</Text> 
                        <Text style={style.city}>Provinsi</Text>
                        <Text style={style.detailCity}>Kota Asal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.shape}>
                        <Image source={require ('@assets/icon/akar-icons_arrow-right-left.png')} style={style.iconImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.contentCityTo} onPress={openModal}>
                        <Text style={style.cityFrom}>Kota Tujuan</Text>
                        <Text style={style.city}>Provinsi</Text>
                        <Text style={style.detailCity}>Kota Tujuan</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
            <View style={{marginTop: RFValue(20)}}>
                <Image source={require ('@assets/image/Truck_1.png')} style={style.image}/>
            </View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[style.containerScroll, rBottomSheet]}>
                    <View style={style.dragableArea}>
                        <View style={style.dragable}/>
                    </View>
                    {ongkir.results !== undefined &&
                    <Text style={style.textEkpedisi}>Ekpedisi <Text style={style.textEkpedisi2}>{expedition.code}</Text></Text>
                    }
                    <View>
                        <FlatList
                            data={packageOngkir}
                            renderItem={(({ item, index }) => (
                                <CardCekOngkir
                                    item={item}
                                    index={index}
                                    onPress={ () => {setPress(index)}}
                                    press={press}
                                />
                            ))}
                            ListEmptyComponent={
                                <NoDataSearch
                                    source={require ('@assets/icon/akar-icons_search.png')}
                                    label='Yuk Cek Ongkirmu Dulu!'
                                    style={style.textLabel}
                                />
                            }
                        />
                    </View>
                </Animated.View> 
            </GestureDetector> 
        </LinearGradient>
        <ModalCekOngkir
            isVisible={visible}
            onPress={() => setVisible(false)}
        />
        </>
    )
}

const windowHeight = Dimensions.get('window').height;

const mapStateToProps = function (state) {
    const { cek, user } = state;
    return { cek, user }
}

export default connect (mapStateToProps) (Dashboard);
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    containerScroll: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        height: windowHeight,
        top: windowHeight,
        borderTopRightRadius: RFValue(25),
        borderTopLeftRadius: RFValue(25),
        paddingHorizontal: RFValue(20)
    },
    dragableArea: {
        width: RFValue(100),
        height: RFValue(32),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    dragable: {
        width: RFValue(60),
        height: RFValue(6),
        backgroundColor: '#1579DD',
        alignSelf: 'center',
        borderRadius: RFValue(10)
    },
    tittle: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: RFValue(20),
        alignSelf: 'center',
        marginTop: RFValue(30)
    },
    barContainer: {
        paddingHorizontal: RFValue(20),
        marginTop: RFValue(15)
    },
    barCheck: {
        width: '100%',
        height: RFValue(88),
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: RFValue(15)
    },
    shape: {
        width: RFValue(30),
        height: RFValue(30),
        backgroundColor: '#1579DD',
        borderRadius: RFValue(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentCityFrom: {
       width: '45%',
    },
    contentCityTo: {
        width: '43%',
        alignItems: 'flex-end',
    },
    cityFrom: {
        fontFamily: 'Poppins-Regular',
        color: '#1579DD',
        fontSize: RFValue(10),
        marginBottom: RFValue(-3)
    },
    city: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1579DD',
        fontSize: RFValue(14),
        marginBottom: RFValue(-3)
    },
    detailCity: {
        fontFamily: 'Poppins-Regular',
        color: '#1579DD',
        fontSize: RFValue(12)
    },
    image: {
        width: RFValue(204),
        height: RFValue(236),
        alignSelf: 'center'
    },
    textEkpedisi: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1579DD',
        fontSize: RFValue(20),
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(15)
    },
    textEkpedisi2: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1579DD',
        fontSize: RFValue(20),
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(15),
        textTransform: 'uppercase'
    },
    textLabel: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1579DD',
        fontSize: RFValue(14),
        alignSelf: 'center'
    }
})