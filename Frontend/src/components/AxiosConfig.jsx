
import axios from 'axios';

const AxiosConfig = () => {
  return axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default AxiosConfig;