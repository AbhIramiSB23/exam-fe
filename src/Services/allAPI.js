import AxiosConfig from "./AxiosConfig";
import { BASEURL } from "./BaseURL";

export const addDetails = async (reqbody) => {
  return await AxiosConfig("post", `${BASEURL}/students`, reqbody);
};
export const getDetails = async () => {
  return await AxiosConfig('get', `${BASEURL}/students`);
};

export const deleteDetails = async (id) => {
  return await AxiosConfig('delete', `${BASEURL}/studentss/${id}`);
};

export const updateDetails = async (id,reqbody) => {
  return await AxiosConfig('put', `${BASEURL}/studentss/${id}`,reqbody);
};