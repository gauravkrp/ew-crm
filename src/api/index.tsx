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
