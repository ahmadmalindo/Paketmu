import { cekProvince, cekCity, cekOngkir, lacakPaket } from "@constants/apiCekOngkir";
import { CekProvince, CekCity, CekCityTo, CekOngkir, LacakPaket } from "@actions"
import { ToastConnection, Notif } from '@constants'
import store from "@stores/store";
import MMKVStorage from "react-native-mmkv-storage";
import { Alert } from "react-native";

class CekUtils {
    storage = new MMKVStorage.Loader().initialize()

    async ProvinceCek(params) {
        
        return params = await cekProvince(params).then((response) => {

            const res = response.data.rajaongkir
            
            if(res.status.code == 200 || res.status.description == 'OK'){
                store.dispatch(CekProvince(res.results))
                return res.results
            } else {
                Alert.alert('Perhatian', res.message)
            }

        }).catch((error) => {
            ToastConnection('Data Anda tidak kami temukan')
        })
    }

    async CityCekFrom(params) {
        
        return params = await cekCity(params).then((response) => {

            const res = response.data.rajaongkir
            
            if(res.status.code == 200 || res.status.description == 'OK'){
                store.dispatch(CekCity(res.results))
                return res.results
            } else {
                Alert.alert('Perhatian', res.message)
            }

        }).catch((error) => {
            ToastConnection('Data Anda tidak kami temukan')
        })
    }

    async CityCekTo(params) {
        
        return params = await cekCity(params).then((response) => {

            const res = response.data.rajaongkir
            
            if(res.status.code == 200 || res.status.description == 'OK'){
                store.dispatch(CekCityTo(res.results))
                return res.results
            } else {
                Alert.alert('Perhatian', res.message)
            }

        }).catch((error) => {
            ToastConnection('Data Anda tidak kami temukan')
        })
    }

    async OngkirCek(params) {
        
        return params = await cekOngkir(params).then((response) => {

            const res = response.data.rajaongkir
            
            if(res.status.code == 200 || res.status.description == 'OK'){
                store.dispatch(CekOngkir(res))
                return res.status.code
            } else {
                Alert.alert('Perhatian', res.status.description)
            }

        }).catch((error) => {
            ToastConnection('Data Anda tidak kami temukan')
        })
    }

    async LacakPaket(params) {
        
        return params = await lacakPaket(params).then((response) => {

            const res = response.data
            
            if(res.status == 200){
                store.dispatch(LacakPaket(res))
                return res.status
            } else {
                Alert.alert('Perhatian', res.message)
            }

        }).catch((error) => {
            ToastConnection('Data Anda tidak kami temukan')
        })
    }
}

const cekUtils = new CekUtils()

Object.freeze(cekUtils)

export default cekUtils