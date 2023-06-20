import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  requestCart: () => {
    return axios({
      method: 'POST',
      url: `${url}/api/Order/get-cart`,
    });
  },
  addToCart: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Order/add-to-cart`,
      data: data,
    });
  },
  deleteCart: params => {
    return axios({
      method: 'PUT',
      url: `${url}/api/Order/del-from-cart`,
      params: params,
    });
  },
};

export default factories;
