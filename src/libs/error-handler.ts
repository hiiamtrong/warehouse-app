import { toast } from "react-toastify";

import { ResponseError, Response } from "superagent";
import { AxiosError } from "axios";

interface IResponseError extends ResponseError {
    response: Response;
}

export const handleErrorResponse = (error: IResponseError) => {

    if (error.status === 404) {
        toast.error(`Không có đường link này`);
        return;
    }
    if (error.response) {
        toast.error(error.response.body.message || error.response.body.text);
        return;
    } else {
        toast.error(error.message);
        return;
    }
};

export const handleAgentErrorResponse = (error: AxiosError) => {
    if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return;
    }
    if (error.message) {
        toast.error(error.message);
        return;
    }
    toast.error("Có lỗi xảy ra");
};