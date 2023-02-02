import { IUser } from "../types";

export const fullName = (user: IUser) => {
    return `${user?.firstName} ${user?.lastName} ${user?.patronymic}`
}