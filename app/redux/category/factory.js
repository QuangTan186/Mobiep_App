import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  requestGraphCategory: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Category/get-list-tree-category`,
    });
  },
};

export default factories;
