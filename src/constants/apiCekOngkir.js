import Axios from "axios";
import { BASE_URL, BASE_URL_2 } from "@constants/BASE_URL";

export const cekProvince             = payload =>  Axios.get(`${BASE_URL}/province?key=${payload.key}`)
export const cekCity                 = payload =>  Axios.get(`${BASE_URL}/city?key=${payload.key}&province=${payload.province}`)
export const cekOngkir               = payload =>  Axios.post(`${BASE_URL}/cost`, payload)
export const lacakPaket              = payload =>  Axios.get(`${BASE_URL_2}/track?api_key=${payload.key}&courier=${payload.courier}&awb=${payload.awb}`)







