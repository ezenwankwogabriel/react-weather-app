import { UPDATE } from '../actions/actionTypes';

const initialState = {
    tInC: true,
    isAppLoaded: false,
    latitude: 0,
    longitude: 0,
    city: null,
    address: null,
    JSON: {}
  };

const updateLocation = (state, action) => {
    delete action.type;
    return { ...state, ...action };
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case UPDATE: return updateLocation(state, action);
        default: return state;
    }
};

export default reducer;