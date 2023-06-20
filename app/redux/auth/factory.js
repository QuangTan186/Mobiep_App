import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  requestSignIn: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Identity/login`,
      data: data,
    });
  },
  requestAuthMe: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Identity/get-user`,
    });
  },
  requestRegister: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Identity/register`,
      data: data,
    });
  },
  changeProfile: data => {
    return axios({
      method: 'PUT',
      url: `${url}/api/Identity/change-profile`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAddress: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Address/get-list-address-by-user`,
    });
  },
  getAddressById: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/Address/get-address-by-id`,
      params: params,
    });
  },
  addAddress: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Address/add-address`,
      data: data,
    });
  },
  updateAddress: (data, params) => {
    return axios({
      method: 'PUT',
      url: `${url}/api/Address/update-address`,
      data: data,
      params: params,
    });
  },
  changePassword: params => {
    return axios({
      method: 'PUT',
      url: `${url}/api/Identity/change-password`,
      params: params,
    });
  },
};

export default factories;
