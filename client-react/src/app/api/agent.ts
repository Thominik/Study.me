import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {history} from "../../index";
import {PaginatedResponse} from "../models/pagination";
import {store} from "../../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);

})

const request = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Member = {
    createAnnouncement: (announcement: any) => request.postForm('announcement', createFormData(announcement)),
    updateAnnouncement: (announcement: any) => request.putForm('announcement', createFormData(announcement)),
    deleteAnnouncement: (id: number) => request.delete(`announcement/${id}`)
}

const Catalog = {
    list: (params: URLSearchParams) => request.get('announcement/GetAll', params),
    details: (id: number) => request.get(`announcement/${id}`),
    ownerList: (params: URLSearchParams) => request.get('Announcement/GetAnnouncementsByUsername', params)
}

const TestErrors = {
    get400Error: () => request.get('buggy/bad-request'),
    get401Error: () => request.get('buggy/unauthorised'),
    get404Error: () => request.get('buggy/not-found'),
    get500Error: () => request.get('buggy/server-error'),
    getValidationError: () => request.get('buggy/validation-error'),
}

const Account = {
    login: (values: any) => request.post('account/login', values),
    register: (values: any) => request.post('account/register', values),
    currentUser: () => request.get('account/currentUser'),
}

const agent = {
    Catalog,
    TestErrors,
    Account,
    Member
}

export default agent;