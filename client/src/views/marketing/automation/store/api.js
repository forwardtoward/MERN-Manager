import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { toast } from 'react-toastify';
const API = customInterIceptors();

// user API end point
export const getSmartList = () => {
  return API.get('/smartlist/get');
};
