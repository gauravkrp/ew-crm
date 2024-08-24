import axios from "axios";

const apiBaseURL = "https://crm.edugyanam.com";

const COMMON_HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

export const apiInstance = axios.create({
	baseURL: apiBaseURL,
	timeout: 15000,
	headers: COMMON_HEADERS,
	validateStatus: function (status) {
		return status < 300;
	},
});

export const setAuthToken = (token: string) => {
  apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      apiInstance.defaults.headers.common.Authorization = "";
      localStorage.removeItem("Token");
      // window.location.reload();
      // conslocalStorage.getItem("refreshToken");
    } else {
      return error;
    }
  }
);
