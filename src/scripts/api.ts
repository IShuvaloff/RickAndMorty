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

// export async function DBProductAdd(product: Product) {
//   return axios
//     .post(`/products`, product)
//     .then((res) => {
//       console.log(res.data);
//       return res.data[0].result;
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return false;
//     });
// }

// export async function DBProductEdit(product: Product) {
//   return axios
//     .put(`/products`, product)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return false;
//     });
// }

// export async function DBProductDelete(id: number) {
//   return axios
//     .delete(`/products/${id}`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return false;
//     });
// }
