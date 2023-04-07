// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react';
// ** Components
import Sidebar from './CourseSidebar';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Youtube, Plus, Video, CheckSquare
} from 'react-feather';
import YouTube from 'react-youtube';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// ** Styles
import '@styles/base/pages/page-blog.scss';
// ** Images
import { AiFillLock, AiOutlineDelete } from 'react-icons/ai';
import { progressionFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import { activeCourseLessonsFetchAction, } from '../store/actions';
import Select from 'react-select';
import CourseQuiz from './CourseQuiz';


const Course = (props) => {
  //for redux
  const dispatch = useDispatch();
  const lessonList = useSelector((state) => state.course.activeCourseLessons);
  //state
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [videoModal, setVideoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ id: "", show: false });
  const toggleVideoModal = () => setVideoModal(!videoModal);
  const [lessonModal, setLessonModal] = useState(false);
  const toggleLessonModal = () => setLessonModal(!lessonModal);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState('');
  const [videoLink, setVideoLink] = useState()
  const [questionCount, setQuestionsCount] = useState([{ label: "1", value: 1 }])
  const player = useRef();
  // ** Props
  const { details } = props;
  //for accessiblity
  // for quiz questions
  const noOfQuestions = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }, { label: "6", value: 6 }, { label: "7", value: 7 }, { label: "8", value: 8 }, { label: "9", value: 9 }, { label: "10", value: 10 }]
  const quizMinutes = [{ label: "2", value: 2 }, { label: "4", value: 4 }, { label: "6", value: 6 }, { label: "8", value: 8 }, { label: "10", value: 10 }, { label: "12", value: 12 }, { label: "14", value: 14 }, { label: "16", value: 16 }, { label: "18", value: 18 }, { label: "20", value: 20 }]
  const questionsCountChange = (e) => {
    let newarray = noOfQuestions.slice(0, e.value);
    setQuestionsCount(newarray);
    newarray = [];
  }
  // toggels
  const toggleDeleteModal = () => {
    setDeleteModal({ "show": !deleteModal.show })
  }
  const togglequiz = () => setModal(!modal);
  const toggleAccordion = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const handleVideoPlay = (item) => {
    const iOfEqualTo = item.lastIndexOf('=');
    const videoId = item.substring(iOfEqualTo + 1);
    setVideoLink(videoId)
    toggleVideoModal();
  }

  const [watchTime, setWatchTime] = useState(0)

  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeQuizData, setActiveQuizData] = useState([])
  // ()=setInterval(() => {
  //   console.log("hii")
  // }, 1000);
  const checkPlayerState = (e) => {
    // console.log(e.target.getPlayerState(), "state")
    // console.log(e.target.getDuration())
    if (e.target.getPlayerState() === 1) {
      setVideoPlaying(true);
    }
    else {
      setVideoPlaying(false);
    }
  }
  // if(e.target.getPlayerState()===1)
  // {
  //   console.log("playing");
  // }
  // else{
  //   clearInterval(interval)
  // }
  // console.log(e.target.getCurrentTime())

  // }
  useEffect(() => {
    let timeLapse = 0;
    let interval;
    if (videoPlaying === true) {
      interval = setInterval(() => {
        timeLapse = timeLapse + 1
      }, 1000);
    }
    return () => clearInterval(interval)
  }, [videoPlaying]);


  useEffect(() => {
    dispatch(activeCourseLessonsFetchAction(details._id),
      dispatch(progressionFetchAction())
    )
  }, [details])

  return (
    <>
      <Modal isOpen={modal} toggle={togglequiz} centered={true} size="lg">
        <ModalHeader toggle={togglequiz}>Create Quiz</ModalHeader>
        <CourseQuiz activeQuizData={activeQuizData} />
      </Modal>
      <Modal isOpen={videoModal} toggle={toggleVideoModal} centered={true} fullscreen>
        <ModalHeader toggle={toggleVideoModal}>
        </ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center'>
            <YouTube
              ref={player}
              videoId={videoLink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              opts={{ height: '800', width: '1400', playerVars: { controls: false } }}
              title="Embedded youtube"
              onStateChange={checkPlayerState}
            />
          </div>
        </ModalBody>
      </Modal>
      <Fragment>
        <div className="blog-wrapper">
          <div className="content-detached content-left">
            <div className="content-body">
              <Row>
                <Col sm="12">
                  <Card className="mb-0">
                    <CardBody>
                      <CardTitle  >
                        <div className="d-flex justify-content-between p-2 bg- ">
                          <Col xl="6">
                            <div > <img width="300" className=" img-fluid " src={details?.courseImage} /></div>
                          </Col>
                          <Col xl="3">
                            <div><h4>{details?.courseName}</h4>
                              <p className="text-gray fs-6">{details?.description === "undefined" ? "No Description" : details?.description}</p>
                              <p className="text-danger fs-6">Expiry Date:-{moment(details?.endDate).format("MM/DD/YYYY")}</p>
                              <p className="text-success fs-6">Purchased On:-{moment(details?.startDate).format("MM/DD/YYYY")}</p>
                            </div>
                          </Col>

                        </div>
                      </CardTitle>
                      <hr />
                      <div className="mt-1">
                        <div className=" p-1 bg-light-success rounded mb-3">
                          <h3>Course Content</h3>
                        </div>
                        <Accordion open={open} toggle={toggleAccordion}>
                          {lessonList?.length > 0 ? lessonList?.map((item, index) =>
                          (
                            <div className="d-flex justify-content-between">
                              <Col xl="12">
                                <AccordionItem>
                                  <AccordionHeader targetId={index + 1} >
                                    <Col xl="12" className="d-flex justify-content-between">
                                      <h4>{index + 1 + ". "}{item?.lessonName}</h4>
                                    </Col>
                                  </AccordionHeader>
                                  <AccordionBody accordionId={index + 1}>
                                    {item.videoId?.length > 0 ? item?.videoId?.map((item, index) =>
                                    (
                                      <Card className="my-1 bg-light-secondary cursor-pointer" onClick={() => handleVideoPlay(item.videoUrl)}>
                                        <CardBody className="p-1">
                                          <CardText tag="h5">
                                            <div className="d-flex align-items-center justify-content-between ">
                                              <div className="d-flex align-items-center">
                                                <Youtube size={30} className="me-1" />
                                                <span className="text-secondary">{index + 1 + '.  '}{item?.videoName}</span>
                                              </div>

                                              <div className="d-flex align-items-center">
                                                <AiFillLock size={18} className="me-2" />
                                                <span>04:34</span>
                                              </div>
                                            </div>
                                          </CardText>
                                        </CardBody>
                                      </Card>
                                    )) : <div className="text-center">No Lessons</div>}
                                    {item?.quiz.map((item, index) => (

                                      <Card className="my-1 bg-light-secondary " onClick={() => { togglequiz(), setActiveQuizData(item?.quiz) }}>
                                        <CardBody className="p-1">
                                          <CardText tag="h5">
                                            <div className="d-flex align-items-center justify-content-between ">
                                              <div className="d-flex align-items-center">
                                                <CheckSquare size={30} className="me-1" />
                                                <span className="text-secondary">Quiz{index + 1}</span>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <span className="  me-2 bg-light rounded" ><span className="m-1">Questions-{item?.quiz.length}</span></span>
                                                <span className=" bg-warning rounded text-white"><span className="m-1">- min</span></span>
                                              </div>
                                            </div>
                                          </CardText>
                                        </CardBody>
                                      </Card>



                                    ))
                                    }

                                  </AccordionBody>
                                </AccordionItem>
                              </Col>
                            </div>
                          )) : <h6>No Content</h6>}
                        </Accordion>
                        {/* </TabPane>
                        </TabContent> */}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <Sidebar />
        </div>
      </Fragment>
    </>
  );
};

export default Course;
