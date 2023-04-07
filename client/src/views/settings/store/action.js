import * as api from './api';

export const saveSettingAction = (options) => async (dispatch) => {
  try {
    const { data } = await api.saveSetting(options);
    return data;
  } catch (error) {}
  // Reset After 3 sec
};

export const sendCodeAction =
  ({ devs, code }) =>
  async (dispatch) => {
    try {
      const { data } = await api.sendCode({ devs, code });
      return data;
    } catch (error) {}
  };
