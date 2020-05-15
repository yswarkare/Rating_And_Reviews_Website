import axios from "axios";
import Cookies from "js-cookie";

export const token = Cookies.get("userToken")

export var defaults = {
    baseURL: "/api",
    headers: {
        "Authorization": Cookies.get("userToken"),
        "Content-Type": "application/json"
    }
} 

export const api = axios.create(defaults);

export const Axios = axios.create({
    baseURL: "/api",
})