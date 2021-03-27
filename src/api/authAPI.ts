
import apiClient from '../libs/apiClient'
import notify from '../libs/notify'
const AuthAPI = {
    login: async ({ username, password }: { username: string, password: string }) => {
        const { expired, token, user } = await apiClient
            .post("/api_v2/login", { username, password }).catch((err) => {
                notify.errorFromServer(err)
            })

        return { expired, token, user }
    }
}

export default AuthAPI