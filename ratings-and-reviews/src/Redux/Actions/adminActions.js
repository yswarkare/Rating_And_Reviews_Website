import { api } from "./axiosDefaults";
import { Get_User_Info } from "./actionTypes";

export const getAdminInfo = () => async (dispatch) => {
    let res = await api.get("/admins/get-admin-info");
    dispatch({
        type: Get_User_Info,
        payload: res
    })
}
