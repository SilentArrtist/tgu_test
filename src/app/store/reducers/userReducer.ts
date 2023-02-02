import { IUser } from "../../../shared/types";
import { Dispatch } from "redux"
interface UserState {
    users: IUser[];
    selectedUsers: number[];
}
const inititalState: UserState = {
    users: [
        {
            about: "about him",
            avatar: "https://cdn2.thecatapi.com/images/Rl39SPjDO.png",
            createDate: "1675321613432",
            email: "gasfnasjw@mail.ru",
            firstName: "Ivan",
            id: 1,
            lastName: "Olegov",
            patronymic: "Yurievich",
        },
        {
            about: "NO info",
            avatar: "https://cdn2.thecatapi.com/images/iWyIaja-G.jpg",
            createDate: "1675321632797",
            email: "cehiavn@gmail.com",
            firstName: "Sad",
            id: 2,
            lastName: "Kit",
            patronymic: "",
        },
        {
            about: "",
            avatar: "https://cdn2.thecatapi.com/images/8RsP7Xt3h.jpg",
            createDate: "1675321653073",
            email: "n732gfuejgsu@mail.ru",
            firstName: "Maksim",
            id: 3,
            lastName: "Sladkov",
            patronymic: "",
        },
        {
            about: "Live in Czech Republic",
            avatar: "https://cdn2.thecatapi.com/images/O3btzLlsO.png",
            createDate: "1675321723280",
            email: "onemoreemail@gmail.com",
            firstName: "Aleksandr",
            id: 4,
            lastName: "Kloos",
            patronymic: "Pan",
        },
    ],

    selectedUsers: []
}


enum userActionTypes {
    SELECT_USER = "SELECT_USER",
    CLEAN_SELECTED_USERS = "CLEAN_SELECTED_USERS",
    CREATE_USER = "CREATE_USER",
    EDIT_USER = "EDIT_USER",
    DELETE_USERS = "DELETE_USERS",
    GET_USER_BY_ID = "GET_USER_BY_ID"
}
interface selectUserAction {
    type: userActionTypes.SELECT_USER,
    payload: number;
}
interface cleanSelectedUsersAction {
    type: userActionTypes.CLEAN_SELECTED_USERS;
}
interface createUserAction {
    type: userActionTypes.CREATE_USER,
    payload: IUser;
}
interface editUserAction {
    type: userActionTypes.EDIT_USER,
    payload: IUser;
}
interface deleteUsersAction {
    type: userActionTypes.DELETE_USERS;
    payload: number[];
}
type UserAction = selectUserAction | cleanSelectedUsersAction | createUserAction | editUserAction | deleteUsersAction;

export const userReducer = (state = inititalState, action: UserAction): UserState => {
    switch (action.type) {
        case userActionTypes.SELECT_USER:
            let newSelectedUsers = JSON.parse(JSON.stringify(state.selectedUsers))
            if (newSelectedUsers.includes(action.payload)) {
                newSelectedUsers = newSelectedUsers.filter((item: number) => item !== action.payload)
            }
            else {
                newSelectedUsers.push(action.payload)
            }
            return { ...state, selectedUsers: newSelectedUsers }
        case userActionTypes.CLEAN_SELECTED_USERS:
            return { ...state, selectedUsers: [] }
        case userActionTypes.CREATE_USER:
            const newUsersArray: IUser[] = JSON.parse(JSON.stringify(state.users));
            newUsersArray.push(action.payload);
            return { ...state, users: newUsersArray }
        case userActionTypes.EDIT_USER:
            const editedUsersArray: IUser[] = JSON.parse(JSON.stringify(state.users));
            for (let index in editedUsersArray) {
                if (editedUsersArray[index].id === action.payload.id) {
                    editedUsersArray[index] = action.payload
                }
            }
            return { ...state, users: editedUsersArray }
        case userActionTypes.DELETE_USERS:
            let updatedUsersArray: IUser[] = JSON.parse(JSON.stringify(state.users));
            for (const key of action.payload) {
                updatedUsersArray = updatedUsersArray.filter((user) => user.id !== key)
            }
            return { ...state, users: updatedUsersArray }
        default:
            return state;
    }
}


export const selectUserAction = (payload: number) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: userActionTypes.SELECT_USER, payload: payload })
    }
}

export const cleanSelectedUsersAction = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: userActionTypes.CLEAN_SELECTED_USERS })
    }
}

export const createUserAction = (user: IUser) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: userActionTypes.CREATE_USER, payload: user })
    }
}

export const editUserAction = (user: IUser) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: userActionTypes.EDIT_USER, payload: user })
    }
}

export const deleteUsersAction = (payload: number[]) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: userActionTypes.DELETE_USERS, payload: payload })
    }
}
