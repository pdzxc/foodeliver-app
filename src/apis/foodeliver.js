import axios from 'axios';

export default axios.create({
  baseURL: 'https://foodeliver-api.herokuapp.com',
});
