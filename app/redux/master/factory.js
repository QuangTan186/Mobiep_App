import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  getProvince: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Address/get-province`,
    });
  },
  getDistrict: data => {
    return axios({
      method: 'GET',
      url: `${url}/api/Address/get-district`,
      params: data,
    });
  },
  getCommunity: data => {
    return axios({
      method: 'GET',
      url: `${url}/api/Address/get-community`,
      params: data,
    });
  },
};

export default factories;
