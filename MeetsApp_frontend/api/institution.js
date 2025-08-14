import axios from 'axios';
import { BASE_URL } from "@env";

const INSTITUTION_API = `${BASE_URL}/api/institution`;

export const getAllInstitutions = () => axios.get(INSTITUTION_API);
export const getInstitution = (id) => axios.get(`${INSTITUTION_API}/${id}`);
export const updateInstitution = (id, data) => axios.put(`${INSTITUTION_API}/${id}`, data);
export const createInstitution = (data) => axios.post(INSTITUTION_API, data);

