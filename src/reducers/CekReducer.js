const initialState = {
    province: [],
    city: [],
    cityTo: [],
    ongkir: [],
    lacak: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CEK_PROVINCE':
            return {
                ...state,
                ...action.payload,
                province: action.province,
            };
        case 'CEK_CITY' :
            return {
                ...state,
                ...action.payload,
                city: action.city,
            };
        case 'CEK_ONGKIR' :
            return {
                ...state,
                ...action.payload,
                ongkir: action.ongkir,
            };
        case 'CEK_CITY_TO' :
            return {
                ...state,
                ...action.payload,
                cityTo: action.cityTo,
            };
        case 'LACAK_PAKET' :
            return {
                ...state,
                ...action.payload,
                lacak: action.lacak,
            };
        default:
            return state
    }
}