import { IUserAction } from "../../data/interface/IUserAction";
import { CREATE_USER } from "../actions/createUser";
import { DELETE_USER } from "../actions/deleteUser";
import { LOGOUT_USER } from "../actions/logoutUser";
import { UPDATE_USER } from "../actions/updateUser";

/**
 * Reducer for active user in store
 * @param state current user
 * @param action some action with user
 */
export function userReducer(state = null, action: IUserAction) {
    switch(action.type) {
        case CREATE_USER:
            return action.user;
        case UPDATE_USER: 
            return {state, ...action.userData}
        case DELETE_USER:
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
}