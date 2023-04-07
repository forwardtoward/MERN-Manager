import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const saveSetting = (payload) => {
  return API.post('/livechat-widget-setting', payload);
};
export const sendCode = (payload) => {
  return API.post('/livechat-widget-setting/send-code', payload);
};
