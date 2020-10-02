import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:3001',
// });

export default axios.create({
  baseURL: 'https://api.jsonbin.io/b/5f774bd37243cd7e8248eed0/latest',
  headers: {
    'secret-key':
      '$2b$10$oAt3jghlkHX2UGZFfqGIZOZLM0k6e6kvD3nP8/RIdQWoxQXBhg2PC',
  },
});
