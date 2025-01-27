const initialState = {
    sidebarShow: true,
    theme: 'light',
    sidebarUnfoldable: false,
};

export const sidebarReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest };
        default:
            return state;
    }
};
