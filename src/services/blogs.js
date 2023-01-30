import axios from 'axios';
import userService from './user';

const baseUrl = '/api/blogs';

const config = () => {
  return {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

const postComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content);
  return response.data;
};

export default { getAll, create, update, remove, postComment };
