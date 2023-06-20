import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  getListComment: id => {
    return axios({
      method: 'GET',
      url: `${url}/api/Comment/get-comment-by-product`,
      params: {
        idProduct: id,
      },
    });
  },
  addComment: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Comment/add-comment`,
      data: data,
    });
  },
};

export default factories;
