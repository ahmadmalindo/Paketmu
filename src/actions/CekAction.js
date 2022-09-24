import * as ACTION_TYPES from "@constants/ActionTypes";

export const CekProvince             = data           => ({ type: ACTION_TYPES.CEK_PROVINCE, province: data })
export const CekCity                 = data           => ({ type: ACTION_TYPES.CEK_CITY, city: data })
export const CekCityTo               = data           => ({ type: ACTION_TYPES.CEK_CITY_TO, cityTo: data })
export const CekOngkir               = data           => ({ type: ACTION_TYPES.CEK_ONGKIR, ongkir: data })
export const LacakPaket              = data           => ({ type: ACTION_TYPES.LACAK_PAKET, lacak: data })

