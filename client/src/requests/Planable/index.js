/    eslint-disable /;
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

// WORKSPACE LIST
export async function workSpaceListAll() {
  const { data } = await API.get(ENDPOINTS.WORKSPACE_LIST);
  return data;
}

// create workspace
export async function createWorkSpace(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_WORK_SPACE, payload);
  return data;
}

//** view one workspace
export async function viewOneWorkspace(payload) {
  const { data } = await API.get(ENDPOINTS.VIEW_ONE_WORKSPACE + payload);

  return data;
}

// delete workspace
export async function deleteOneWorkspace(payload) {
  const { data } = await API.get(ENDPOINTS.DELETE_ONE_WORKSPACE + payload);
  return data;
}

// add-comment
export async function addComment(payload) {
  const { data } = await API.post(ENDPOINTS.ADD_COMMENT, payload);
  return data;
}
// delete-comment
export async function deleteComment(payload) {
  const { data } = await API.get(ENDPOINTS.DELETE_COMMENT + payload);
  return data;
}
// add-compose
export async function addCompose(payload) {
  const { data } = await API.post(ENDPOINTS.ADD_COMPOSE, payload);
  if (data.success == true) {
    getComposePost();
  }
  return data;
}
// delete-compose
export async function deleteCompose(payload) {
  const { data } = await API.get(ENDPOINTS.DELETE_COMPOSE + payload);
  return data;
}
//comment by post
export async function commentByPost(payload) {
  const { data } = await API.get(ENDPOINTS.COMMENT_BY_POST + payload);
  return data;
}
//GET COMPOSE post
export async function getComposePost() {
  const { data } = await API.get(ENDPOINTS.GET_COMPOSE);
  return data;
}
//EDIT COMPOSE post
export async function editComposePost(id, payload) {
  const { data } = await API.post(ENDPOINTS.EDIT_COMPOSE + id, payload);
  return data;
}

//GET FACEBOOK PAGES
export async function getFacebookPages(accesstoken) {
  const { data } = await API.get(ENDPOINTS.FACEBOOK_GET_PAGES + accesstoken);
  return data;
}
//CREATE FACEBOOK PAGE POST
export async function createFacebookPagePost(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_PAGE_POST, payload);

  return data;
}

// Edit Workspace
export async function editWorkSpace(payload) {
  const { data } = await API.post(ENDPOINTS.EDIT_WORKSPACE + payload);
  return data;
}
// REFRESH TOKEN
export async function refreshPageTokenFb(payload) {
  const { data } = await API.post(ENDPOINTS.FACEBOOKPAGE_REFRESH_TOKEN, +payload);
  return data;
}
