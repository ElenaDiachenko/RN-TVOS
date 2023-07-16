import { Reducer } from 'react';

export type State = {
    username?: string;
    email: string;
    password: string;
    errors: {
        username?: string;
        email?: string;
        password?: string;
    };
};

export type Action = {
    type: string;
    field?: string;
    value?: string;
    errors?: {
        username?: string;
        email?: string;
        password?: string;
    };
};

export const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field!]: action.value };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors || {} };
        default:
            return state;
    }
};
