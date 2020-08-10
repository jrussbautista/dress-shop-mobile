import { API_URL } from '@/constants';
import axios from 'axios';

export default axios.create({
  baseURL: API_URL,
});
