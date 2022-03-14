import qs from "qs";
import _ from "lodash";
import axios, { AxiosResponse } from "axios";

export const NaverAuthAPI = async (naverAccessToken: string) => {
    try {
        const apiUrl = `https://openapi.naver.com/v1/nid/me`;
        const userData: AxiosResponse<any> = await axios(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${naverAccessToken}`,
            }
        });
        const naverUser = userData.data.response;
        return naverUser;
    } catch (error) {
        console.error("❌ Cannot find Naver User: ", error);
        throw new Error(error);
    }
}