import { useToast } from '@agney/ir-toast';
import { get } from 'lodash';


function useNotify() {
    const Toast = useToast()
    const errorFromServer = function (error: any) {
        let message =
            get(error, 'response.data.error.message') ||
            get(error, 'data.error.message') ||
            get(error, 'data.message') ||
            get(error, 'error.message') ||
            get(error, 'message') ||
            error
        const toast = Toast.create({
            message,
            color: 'danger',
            position: 'top',
            buttons: ['dismiss'],
            animated: true,
            duration: 1000
        })
        return toast.present()
    }

    const error = function (errorMessage: string) {

        const toast = Toast.create({
            message: errorMessage,
            color: 'danger',
            position: 'top',
            buttons: ['dismiss'],
            animated: true,
            duration: 1000
        })
        return toast.present()
    }

    const success = function (message: string) {

        const toast = Toast.create({
            message,
            color: 'success',
            position: 'top',
            buttons: ['dismiss'],
            animated: true,
            duration: 1000
        })
        return toast.present()
    }

    const info = function (message: string) {

        const toast = Toast.create({
            message,
            color: 'primary',
            position: 'top',
            buttons: ['dismiss'],
            animated: true,
            duration: 1000
        })
        return toast.present()
    }

    return { error, success, errorFromServer, info }
}

export default useNotify;
