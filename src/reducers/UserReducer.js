const initialState = {
    user: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ACCOUNT_USER':
            return {
                ...state,
                ...action.payload,
                user: action.user,
            };
        default:
            return state
    }
}