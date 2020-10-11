import { ActionTypes } from './Types';

export const DataReducer = (storeData = { users: {} }, action) => {
  switch (action.type) {
    case ActionTypes.USERS_LOAD:
      return {
        ...storeData,
        [action.payload.dataType]: action.payload.data,
      };
    default:
      return storeData || {};
  }
};
