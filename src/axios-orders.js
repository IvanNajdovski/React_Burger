import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburger-6296f.firebaseio.com/'
});

export default instance;