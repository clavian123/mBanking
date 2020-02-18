initialState = {
    email: '',
    pin: '',
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case 'SYNC_ASYNC':
            return({email: action.email, pin: action.pin});
        
        case 'LOGIN': 
            return({email: action.email, pin: action.pin});
        
        case 'LOGOUT':
            return({email: '', pin: ''});

        default:
            return state;
    }
}

export default login;