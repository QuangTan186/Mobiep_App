import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const productFactory = {
  requestListProductById: id => {
    return axios({
      method: 'GET',
      url: `${url}/api/Product/get-list-product-by-id-category?idCategory=${id}`,
    });
  },
  requestListBestSeller: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Product/get-best-seller`,
    });
  },
  requestListFilter: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/Product/get-list-product-by-name`,
      params: params,
    });
  },
  getProductById: params => {
    return axios({
      method: 'GET',
      url: `${url}/api/Product/get-product-by-id`,
      params: params,
    });
  },
};

export default productFactory;
