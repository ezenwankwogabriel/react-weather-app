import * as actionTypes from './actionTypes';

export const update = (address) => {
    return {
        type: actionTypes.UPDATE,
        ...address
    }
}