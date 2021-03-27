import { get } from 'lodash'
import { toast } from 'react-toastify'

const notify = {
    errorFromServer: function (error: any) {
        console.log(error)
        let message =
            get(error, 'response.data.error.message') ||
            get(error, 'data.error.message') ||
            get(error, 'error.message') ||
            get(error, 'message') ||
            error
        return toast.error(`⛔ ${message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    errorMessage: function (message: string) {
        return toast.error(`⛔ ${message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    success: function (message: string) {
        return toast.success(`✔️ ${message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    info: function (message: string) {
        toast.info(`ℹ️ ${message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    warn: function (message: string) {
        return toast.warn(`⚠️ ${message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
}
export default notify