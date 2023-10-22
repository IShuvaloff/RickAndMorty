import axios from 'axios';
import { ICharacterData } from './interfaces';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'; ??? `Bearer ${this.token}`

export default async function apiLoadCharacters(page = 1) {
  return axios
    .get(`/character?page=${page}`)
    .then((res) => res.data as ICharacterData)
    .catch((err) => {
      throw err;
    });
}
