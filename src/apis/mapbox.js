import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.mapbox.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  params: {
    access_token:
      'pk.eyJ1IjoianVzdGluZWRlaG9ub3IiLCJhIjoiY2tmcWoxZ29jMWI5ZzJxczV0bTI2ZGUzNyJ9.GAJioDUOxi1Onkmy5TKhGw',
  },
});
