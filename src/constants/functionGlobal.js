import React from "react";
import { Alert, Text, Dimensions, LayoutAnimation, Platform } from 'react-native';
// import { MyView } from '@components';
// import { Icon } from "native-base";
// import { Font, StC, Colors } from "@styles";
// import { RFValue } from "react-native-responsive-fontsize";
// import { captureRef } from 'react-native-view-shot';
// import { Toast } from '../components/PopUp';
// import RNFS from 'react-native-fs';
// import Tooltip from 'rn-tooltip';
import moment from 'moment';
// import ImgToBase64 from 'react-native-image-base64';
// import Share from 'react-native-share';
import 'moment/locale/id';

export const cutStringThumbnail = (string) => {
    if(string){
        let find = string.search(' ');
        let res
    
        if(find >= 0){
            let arr = string.split(' ');
            res = (string[0] + '' + arr[1][0]).toUpperCase()
        } else if(string.length > 1) {
            res = string[0].toUpperCase() + '' + string[1].toLowerCase()
        } else {
            res = string[0].toUpperCase()
        }
        return res
    }
}

export const currencyFloat = (number) => {
    let num = parseFloat(number)
    if(!isNaN(num)){
        if(num.toString().indexOf('.') != -1){
            return 'Rp' + num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        } else {
            var rupiah = '';
            var numrev = num.toString().split('').reverse().join('');
            for (var i = 0; i < numrev.length; i++) if (i % 3 == 0) rupiah += numrev.substr(i, 3) + '.';

            let ret = rupiah.split('', rupiah.length - 1).reverse().join('')

            if(ret < 0){
                return '- Rp' + ret.replace('-', '')
            } else {
                return 'Rp ' + ret
            }
        }
    } else {
        return 0
    }
}

// export const numberFloat = (number) => {
//     let num = parseFloat(number)
//     if(!isNaN(num)){
//         if(num.toString().indexOf('.') != -1){
//             return num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
//         } else {
//             var rupiah = '';
//             var numrev = num.toString().split('').reverse().join('');
//             for (var i = 0; i < numrev.length; i++) if (i % 3 == 0) rupiah += numrev.substr(i, 3) + '.';
//             return rupiah.split('', rupiah.length - 1).reverse().join('');
//         }
//     } else {
//         return 0
//     }
// }

// export const currencyFormat = (num) => {
//     if(!isNaN(num)){
//         var rupiah = '';
//         var numrev = num.toString().split('').reverse().join('');
//         for (var i = 0; i < numrev.length; i++) if (i % 3 == 0) rupiah += numrev.substr(i, 3) + '.';
//         return rupiah.split('', rupiah.length - 1).reverse().join('');
//     }else{
//         return 0
//     }
// }


// export const currencyFormatDE = (number) => {
//     let num = parseFloat(number)
//     if(!isNaN(num)){
//         return num.toFixed(2)
//             .replace('.', ',')
//             .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
//     } else {
//         return 0
//     }
// }

export const inputNominal = (angka, prefix) => {
    var number_string   = angka.replace(/[^,\d]/g, '').toString(),
        split           = number_string.split(','),
        sisa            = split[0].length % 3,
        rupiah          = split[0].substr(0, sisa),
        ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}

export const labelAmount = (amount, max) => {
    return amount > max ? max + "+" : amount
}

// export const required = (required) => {
//     return  required ? <Text style={Font.required}>*</Text> : null
// }

// export const activeSelected = (checked) => {
//     return <MyView hide={!checked}>
//         <Icon name="check" type="FontAwesome5" style={StC.iconData}/>
//     </MyView>
// }

export const formatDate = (date, short) => {
    return short ? moment(date).format('DD MMM YYYY') : moment(date).format('DD MMMM YYYY')
}

export const formatDateTime = (date) => {
    return moment(date).format('dddd, DD MMMM YYYY | HH:mm')
}

export const formatDateDay = (date) => {
    return  moment(date).format('dddd, DD MMMM YYYY')
}

export const formatTimeReservation = (date) => {
    return  moment(date).format('HH:mm')
}

export const onRotate = () => {
    const { width, height } = Dimensions.get('window')
    return height >= width
}

// export const statusAttendance = (type) => {
//     let color = '#C5ECC7'
//     if(type == 'S' || type == 'I'){
//         color = '#FDE2C3'
//     } else if(type == 'A'){
//         color = '#FFCDCD'
//     }
//     return color
// }

// export const statusPermit = (approve, cancel) => {
//     let res = ''
//     if(approve == 2){
//         res = ['#FFCDCD', '#FF6D72', 'Ditolak', 'close']
//     }
//     if(approve == 1){
//         res = ['#C5ECC7', '#38CFAA', 'Diterima', 'ios-checkmark-done-sharp']
//     }
//     if(approve == 0 && cancel == 0){
//         res = ['#C2E7F3', '#5EC0CD', 'Diajukan', 'arrow-redo']
//     }
//     if(approve == 0 && cancel == 1){
//         res = ['#FDE2C3', '#F4B500', 'Dibatalkan', 'arrow-undo']
//     }

//     return res
// }

export const Notif = (title, message) => {
    if (message) {
        Alert.alert(title, message)
    }
}

export const ToastConnection = () => {
    Alert.alert('Perhatian', 'Tidak dapat memproses data, silahkan coba kembali')
}

// export const ToastInfo = (message, error) => {
    
//     Toast.show({
//         title: 'Perhatian',
//         text: message,
//         color: 'white',
//         timeColor: 'white',
//         timing: 1000,
//         icon: <Icon name={error ? 'warning' : 'check-circle'} type={'FontAwesome'} style={[Font.F20, Font.WHITE]}/>,
//         position: 'top',
//         backgroundColor: error ? '#FF2727' : '#21AB1E'
//     })
// }

// export const isPortrait = () => {
//     const { width, height } = Dimensions.get('window')
//     return height >= width
// }

// export const reasonReturObj = (obj) => {
//     let reason = []
//     let arr = Object.values(obj)
//     let arr2 = Object.keys(obj)
//     for(let i=0; i<arr.length; i++){
//         var temp = {
//             'id':  arr2[i],
//             'name' : arr[i],
//         };
//         var data = reason;
//         data.push(temp);
//     }
//     return data
// }

// export const processRetur = (arr, retur) => {
//     let detail = arr
//     let dataOrder = retur

//     for(let i=0; i<detail.length; i++){
//         for(let j=0; j<dataOrder.get_all_retur.length; j++){
//             if(dataOrder.get_all_retur[j].reason_id !=1 ){
//                 let result = dataOrder.get_all_retur[j].get_detail.find(x => x.sc_product_id === detail[i].sc_product_id)
//                 if(result != undefined){
//                     detail[i].quantity = parseFloat(detail[i].quantity) - parseFloat(result.quantity);
//                 }
//             }
//         }
//     }
//     return detail
// }

// export const reasonArray = (id) => {
//     let arr = ''
//     if(id == 1){
//         arr = 'Tukar Barang'
//     } else if(id == 2){
//         arr = 'Retur dengan Pembatalan Transaksi'
//     } else if(id == 3){
//         arr = 'Retur dengan Mengurangi Hutang'
//     }
//     return arr
// }

export const AnimationLayout = () => {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

// export const onCapture = (code, viewShot, share) => {
//     captureRef(
//         viewShot,{
//             format: 'png',
//             quality: 0.8,
//             result: 'base64'
//         }
//     ).then(async (res) => {
//         var path = RNFS.DocumentDirectoryPath + '/Invoice_' + code +  '.png';

//         RNFS.writeFile(path, res, 'base64')
//         .then(() => {
//             if(share){
//                 getBase64StringShare(path, share)
//             } else {
//                 ToastInfo('Invoice berhasil disimpan di galeri')
//             }
//         })
//         .catch((err) => {
//             console.log('error')
//         })
//     }).catch(err => {
//         console.log(err)
//     })
// }

// export const getBase64StringShare = (path, share) => {
//     ImgToBase64.getBase64String(path)
//     .then(base64String => 
//         shareImage(base64String, share)
//     )
//     .catch(err => doSomethingWith(err));
// }

// export const shareImage = (base64, share) => {
//     const shareOptions = {
//         message: share.message,
//         url: 'data:image/png;base64,' + base64,          
//     };

//     if(Platform.OS == 'ios'){
//         delete shareOptions.message
//     }

//     try {
//         Share.open(shareOptions);

//     } catch (error) {
//         Notif('Perhatian', 'Tidak dapat membagikan file')
//     }
// }

// export const errorMessage = (error, message) => {
//     if(error){
//         return <Text style={StC.errorMessage}>*{message ? message : 'Isian wajib diisi'}</Text>
//     } 
// }

export const regexEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex = reg.test(email) === false
}

// export const regexPhone = (phone, type) => {
//     let reg = /^08[1-9][0-9]{7,10}$/;
//     if(type == 'home'){
//         reg = /^0[1-9][0-9]{7,10}$/;
//     }
//     return regex = reg.test(phone) === false
// }

// export const requiredPost = (val) => {
//     return val ? val : '-1'
// }

// export const dataNullPost = (val) => {
//     return val ? val : '-'
// }

// export const arrNullPost = (val) => {
//     return val ? val : []
// }

// export const IconTooltip = (props) => (
//     <Tooltip backgroundColor={Colors.BLACK_SOFT} withOverlay={false} popover={<Text style={[Font.F12, Font.WHITE, Font.InterMedium]}>{props.message ? props.message : 'Isian wajib diisi'}</Text>}>
//         <Icon name="question-circle" type="FontAwesome" style={[Font.RED_SOFT, Font.F14, {marginLeft: RFValue(10)}]}/>
//     </Tooltip> 
// )

// export const FaqTooltip = (message) => (
//     <Tooltip backgroundColor={Colors.BLACK_SOFT} withOverlay={false} popover={<Text style={[Font.F12, Font.WHITE, Font.InterMedium]}>{message}</Text>}>
//         <Icon name="question-circle" type="FontAwesome" style={[Font.GRAY_LIGHT, Font.F14, {marginLeft: RFValue(10)}]}/>
//     </Tooltip> 
// )

// export const requiredSetIcon = (props) => {
//     if(!props.errorCus){
//         if(props.error && !props.value){
//             return IconTooltip(props)
//         }
//     } else {
//         if(props.error){
//             return IconTooltip(props)
//         }
//     }
// }

// export const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// export const capitalizeFirstLetterEach = (string) => {
//     if(string){
//         let lower = string.toLowerCase()
//         return lower.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
//     } else {
//         return ''
//     }
// }

// export const breakString = (str, limit) => {
//     let brokenString = '';
//     for(let i = 0, count = 0; i < str.length; i++){
//         if(count >= limit && str[i] === ' '){
//             count = 0;
//             brokenString += '\n';
//         } else {
//             count++;
//             brokenString += str[i];
//         }
//     }
//     return brokenString;
// }

// export const phoneFormat = (phone) => {
//     if(phone[0] == '+'){
//         return '0' +  phone.replace('+62', '').replace(/[ ()-]/gi, '')
//     } else if(phone[0] == '6'){
//         return '0' +  phone.replace('62', '').replace(/[ ()-]/gi, '')
//     } else {
//         return phone.replace(/[ ()-]/gi, '')
//     }
// }

export const checkStockMaterial = (material, order) => {
    let limit = 0

    // CHECK STOCK 
    material.forEach(res => {

        // FIND MATCH PRODUCT IN CART
        let findMatch = order.filter(x => x.sc_product_id == res.child_sc_product_id)

        if(findMatch != ''){

            // CHECK STOCK PRODUCT AVAILABLE
            let totalQty = findMatch.map(order => parseFloat(order.quantity) * parseFloat(order.unit_qty)).reduce((acc, order) => parseFloat(order) + parseFloat(acc))

            if(res.is_with_stock == 1 && (parseFloat(totalQty) + parseFloat(res.quantity)) > res.stock){
                limit++
            }

        } else {

            // CHECK STOCK PRODUCT AVAILABLE
            if(res.is_with_stock == 1 && res.quantity > res.stock) { 
                limit++
            }
        }
    })

    return limit
}

export const arrCartProduct = (item, qty, is_package) => {
    return temp = {
        "sc_product_id": item.id,
        "name": item.name,
        "isStock": item.is_with_stock,
        "stock": item.stock,
        "quantity": qty,
        "price": item.selling_price,
        "sub_total": item.selling_price,
        "foto": item.foto,
        "material": item.get_product_raw_material,
        "unit": item.unit_name,
        "is_package": is_package ? 1 : 0,
        "is_child_package": 0
    }
}

export const arrCartProductMaterial = (res, item) => {
    return temp = {
        "sc_product_id": res.child_sc_product_id,
        "name": res.product_name,
        "isStock": res.is_with_stock,
        "stock": res.stock,
        "quantity": res.quantity,
        "price": 0,
        "sub_total": 0,
        "foto": '',
        "material": [],
        "unit": '',
        "is_package": 0,
        "is_child_package": 1,
        "package_product_id": item.id,
    }
}

export const arrSaveProduct = (res) => {
    return  temp = {
        "sc_product_id": res.sc_product_id,
        "quantity": res.quantity,
        "sub_total": res.sub_total,
        "price": res.price
    }
}

export const arrProductSaleOrder = (item, qty, is_package) => {
    return temp = {
        "sc_product_id": item.id,
        "name": item.name,
        "isStock": item.is_with_stock,
        "stock": item.stock,
        "quantity": qty,
        "price": item.selling_price,
        "price_original": item.selling_price,
        "sub_total": item.selling_price,
        "foto": item.foto,
        "note_order":'',
        "isLevel":'',
        "material": item.get_product_raw_material,
        "level_prices": item.get_product_selling_level,
        "multi_units": item.get_product_multi_unit,
        "unit_name": item.unit_name,
        "unit_id": item.get_product_multi_unit.length == 0 ? '' : item.get_product_multi_unit[0].id,
        "unit": item.unit_name,
        "level_name": '',
        "unit_qty": 1,
        "is_bonus": 0,
        "is_package": is_package ? 1 : 0,
        "is_child_package": 0
    }
}

export const arrMaterialSaleOrder = (res, item) => {
    return temp = {
        "sc_product_id": res.child_sc_product_id,
        "name": res.product_name,
        "isStock": res.is_with_stock,
        "stock": res.stock,
        "quantity": res.quantity,
        "price": 0,
        "price_original": 0,
        "sub_total": 0,
        "foto": '',
        "note_order": '',
        "isLevel": '',
        "material": [],
        "level_prices": [],
        "multi_units": [],
        "unit_name": '',
        "unit_id": '',
        "level_name": '',
        "unit_qty": 1,
        "is_bonus": 0,
        "is_package": 0,
        "is_child_package": 1,
        "package_product_id": item.id,
    }
}
