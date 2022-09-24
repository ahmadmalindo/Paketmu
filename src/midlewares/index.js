import axios from 'axios';
import MMKVStorage from 'react-native-mmkv-storage'

export default async () => {

    const storage = new MMKVStorage.Loader().initialize();

    axios.interceptors.request.use(
        async config => {
            const session = await storage.getString('token');
            if (session !== null) {     
                config.headers['Authentification'] = `${session}` ;
                config.headers['Content-Type'] = 'application/json';
            } else {
                config.headers['Content-Type'] = 'application/json';
            }

            return config;
        },
        err => Promise.reject(err),
    );
};
