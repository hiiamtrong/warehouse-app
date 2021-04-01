import { action, computed, makeObservable, observable } from "mobx";
import AuthAPI from "../api/authAPI";
import LocalStorage from "../libs/local-storages";
import IUser from "../models/user";
import { RootStore } from "../store";


export interface Credentials {
    user: IUser;
    token: string;
    expired: string;
}

export class AuthenticationStore {


    rootStore: RootStore;

    user: IUser | null = null;
    token: string | null = null;
    expired: Date | null = null;;

    waiting = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        const credentials = LocalStorage.getCredentials()
        if (credentials && credentials.user) {
            this.setCredentials(credentials);
        }

        makeObservable(this, {
            token: observable,
            waiting: observable,
            isAuthenticated: computed,
            login: action,
            setCredentials: action,
            logout: action,
        });
    }

    get isAuthenticated() {
        return !!this.token && !!this.user;
    }

    setCredentials({ user, token, expired }: Credentials) {
        this.user = user;
        this.token = token;
        this.expired = new Date(expired);
        LocalStorage.setUser(user)
        LocalStorage.setExpired(expired)
        LocalStorage.setToken(token)
        LocalStorage.setCredentials({ user, token, expired });
    }

    async login(username: string, password: string) {
        const credentials = await AuthAPI.login({ username, password })
        this.setCredentials(credentials);
    }

    async logout() {
        LocalStorage.clearCredentials()
        this.user = null;
        this.token = null;
        this.expired = null;
    }
}