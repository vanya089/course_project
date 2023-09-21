export type UserType = {
    _id: string,
    username: string,
    email: string,
    password: string,
    roles:[],
}

export interface UserState {
    user: UserType,
    isLogin: boolean,
    status: Status,
    error: string | null,
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
