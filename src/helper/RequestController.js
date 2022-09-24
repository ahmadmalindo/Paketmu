import Axios from "axios"
import AsyncStorage from "@react-native-community/async-storage";

const axiosCustomHeader = Axios.create();
const roAxios = Axios.create();

axiosCustomHeader.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('userToken')
        // console.log('isi token', token);
        if (token) {
            config.headers = {
                "Content-Type": "application/json",
                'senna-auth' : token
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

// FOR REQUEST WITH USER TOKEN
Axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('userToken')
        // console.log('isi token', token);
        if (token) {
            config.headers = {
                'senna-auth' : token
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export const apiGet = async (url) => {
    return Axios.get(url).then((response) => {
        return response
    }).catch((err) => {
        return err
    })
}

export const apiPost = (url, data, config = null) => {
    return Axios.post(url, data, config).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}

export const apiPostJSON = async (url, data) => {
    return axiosCustomHeader.post(url, data).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}

export const apiDelete = (url) => {
    return Axios.delete(url).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}

export const apiPostRajaOngkir = (endpoint, data) => {
    return roAxios.post(endpoint, data, {
        headers: {
            key: '0fd31ef460705cdcc399cf6800760e9d'
        }
    });
}
