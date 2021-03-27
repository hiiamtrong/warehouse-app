
import apiClient from '../libs/apiClient'
const AuthAPI = {
    login: async ({ username, password }: { username: string, password: string }) => {
        const res = await apiClient
            .post("/api_v2/login", { username, password }).catch((err) => {
                throw err
            })
        return res
    }
}

export default AuthAPI