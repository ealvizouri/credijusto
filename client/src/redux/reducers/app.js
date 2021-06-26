const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        token: null,
    }
}

const reducer = (currentState = initialState, action) => {
    const newState = {
        ...currentState,
    }
    switch (action.type) {
        case "SET_USER":
            newState.user = action.payload;
            return newState;
        case "UNSET_USER":
            newState.user = {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                token: null,
            }
            return newState;
        default: return currentState;
    }
}

export default reducer;