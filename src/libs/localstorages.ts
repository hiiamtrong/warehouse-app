import Item from "../models/item"
import RestockReport from "../models/restock-report"
import User from "../models/user"

const LocalStorage = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token: string) => { localStorage.setItem('token', token) },
    getUser: () => {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : {}
    },
    setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
    },

    getRestockReport: () => {
        const restockReport = localStorage.getItem('restockReport')
        return restockReport ? JSON.parse(restockReport) : {}
    },
    setRestockReport: (restockReport: RestockReport) => {
        localStorage.setItem('restockReport', JSON.stringify(restockReport))
    },

    getItem: () => {
        const item = localStorage.getItem('item')
        return item ? JSON.parse(item) : {}
    },
    setItem: (item: Item) => {
        localStorage.setItem('item', JSON.stringify(item))
    },

    getExpired: () => localStorage.getItem('expired'),
    setExpired: (expired: string) => {
        localStorage.setItem('expired', expired)
    }
}

export default LocalStorage