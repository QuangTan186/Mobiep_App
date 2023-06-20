import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  addOrder: (data, params) => {
    return axios({
      method: 'POST',
      url: `${url}/api/Order/add-order`,
      data: data,
      params: params,
    });
  },
  getOrder: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/Order/get-order-by-status-of-each-user`,
      params: params,
    });
  },
  getOrderDetail: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/OrderDetail/get-order-detail-by-order-id`,
      params: params,
    });
  },
  getOrderById: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/Order/get-order-by-id`,
      params: params,
    });
  },
  changeStatusOrder: (data, params) => {
    return axios({
      method: 'PUT',
      url: `${url}/api/Order/change-status`,
      params: params,
      data: data,
    });
  },
};

export default factories;
