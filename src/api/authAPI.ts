import apiClient from '../libs/api-service'
const AuthAPI = {
  login: async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      const res = await apiClient.post('/api_v2/login', { username, password })
      return res
    } catch (error) {
      throw error
    }
  },
}

export default AuthAPI
