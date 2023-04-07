import { id } from 'react-scroll-calendar';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addCourse = (courseData) => {
  return API.post('/course/create', courseData);
};
export const fetchCourses = () => {
  return API.get('/course/');
};
export const fetchActiveCourse=(id)=>{
  return API.get('/course/courseId/'+id);
}
export const fetchSingleCourse = () => {
  return API.get('/course/courseId/:id');
};
export const deleteCourse = (id) => {
  return API.delete('/course/courseId/'+ id);
};
export const editCourse = (payload) => {
  return API.put('/course/update/course_update/' + payload?.id, payload);
};
export const fetchLessons=(id)=>{
  return API.get('/course/lesson/'+id)
}
export const addLesson=(id,payload)=>{
  return API.post('/course/lesson/'+id,payload)
}
export const deleteLesson=(id)=>{
  return API.delete('course/lessonId/'+id)
}
//course videos
export const addVideo=(payload)=>
{
  return API.post('course/coursevideo/'+payload.id,payload)
}
export const addQuiz=(lessonId,payLoad)=>
{
  return API.post('/course/quiz/'+lessonId,payLoad)
}
