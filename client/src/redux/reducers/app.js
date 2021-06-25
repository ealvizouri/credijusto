const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        token: 123,
    }
}

const reducer = (currentState = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            const newState = {
                ...currentState,
                user: action.payload
            }
            console.log('reducer', action.payload, newState);
            return newState;
        default: return currentState;
    }
}

export default reducer;