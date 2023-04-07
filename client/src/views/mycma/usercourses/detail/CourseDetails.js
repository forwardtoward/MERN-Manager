// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react';
// ** Components
import Sidebar from './CourseSidebar';
import Avatar from '@components/avatar';
import Flatpickr from 'react-flatpickr';
// ** Icons Impots
import { GiNotebook } from 'react-icons/gi';
import { FaGraduationCap } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { BsCalendar2Date, } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Plus,
  Youtube,
  Video,
  CheckSquare,
} from 'react-feather';
// ** Utils

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Progress,
  ModalFooter,
} from 'reactstrap';
// ** Styles
import '@styles/base/pages/page-blog.scss';
// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import { AiFillLock, AiOutlineDelete } from 'react-icons/ai';
import { progressionFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import { activeCourseLessonsFetchAction, lessonAddAction, lessonDeleteAction, videoAddAction, quizAddAction } from '../store/actions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';

const Course = (props) => {
  const formRef = useRef();
  const animatedComponents = makeAnimated();
  //for redux
  const dispatch = useDispatch();
  const store = useSelector((state) => state.progression.progressionList);
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
  const [editable, setEditable] = useState(false)
  const [editableData, setEditableData] = useState(props?.details)
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [progressionCategories, setProgressionCategories] = useState([]);
  const [progressionList, setProgressionList] = useState([]);
  const [progressionItem, setProgressionItem] = useState({ categoryName: "All", rankUpto: "All" })
  const [active, setActive] = useState('2');
  const [open, setOpen] = useState('');
  const [lessonName, setLessonName] = useState({})
  const [videoPayload, setVideoPayload] = useState({})
  const [videoLink, setVideoLink] = useState()
  const [questionCount, setQuestionsCount] = useState([{ label: "1", value: 1 }])
  const [quizPayload, setQuizPayload] = useState()
  let [quiz, setQuiz] = useState([])
  // ** Props
  const { details } = props;
  //for accessiblity
  const generateProgressionCategories = (item) => {
    const filteredCategory = store?.filter(category => category.progressionName === item)
    const categories = filteredCategory[0]?.categoryId;
    setProgressionCategories(categories)
  }
  const handleAddProgresson = () => {
    setProgressionList([...progressionList, progressionItem])
  }
  const handleDelete = (item) => {
    let a = progressionList
    a.splice(item, 1)
    setProgressionList([...a])
  }
  // for quiz questions
  const noOfQuestions = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }, { label: "6", value: 6 }, { label: "7", value: 7 }, { label: "8", value: 8 }, { label: "9", value: 9 }, { label: "10", value: 10 }]
  const quizMinutes = [{ label: "2", value: 2 }, { label: "4", value: 4 }, { label: "6", value: 6 }, { label: "8", value: 8 }, { label: "10", value: 10 }, { label: "12", value: 12 }, { label: "14", value: 14 }, { label: "16", value: 16 }, { label: "18", value: 18 }, { label: "20", value: 20 }]
  const questionsCountChange = (e) => {
    let newarray = noOfQuestions.slice(0, e.value);
    setQuestionsCount(newarray);
    newarray = [];
  }
  // toggels
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const toggleDeleteModal = () => {
    setDeleteModal({ "show": !deleteModal.show })
  }
  const togglequiz = () => setModal(!modal);
  const toggleAccordion = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const handleLessonAdd = (e) => {
    e.preventDefault();
    dispatch(lessonAddAction(details?._id, lessonName))
    toggleLessonModal();
  }
  const handleVideoAdd = (e) => {
    e.preventDefault();
    dispatch(videoAddAction(details._id, videoPayload))
    toggleitemmodal();
  }
  const [srNumber, setSrNumber] = useState(1);
  const handleVideoPlay = (item) => {
    const iOfEqualTo = item.lastIndexOf('=');
    const videoId = item.substring(iOfEqualTo + 1);
    setVideoLink(videoId)
    toggleVideoModal();
  }
  const [lessonId, setLessonId] = useState()
  const handleQuizInput = (e) => {

    setQuizPayload({ ...quizPayload, [e.target.name]: e.target.value })

  }
  const handleQuizSubmit = () => {
    const result = { "quiz": quiz }
    quiz?.length<1?toast.error("No Questions to Submit"):dispatch(quizAddAction(details._id,lessonId,result))


  }
  const handleNextQuestion = (e) => {
    e.preventDefault()


    if (quizPayload.solution === undefined || quizPayload.solution === "select") {
      toast.error("please select solution")
    }

    else {
      const myObj = {}
      myObj.question = quizPayload.question;
      myObj.options = [quizPayload.A, quizPayload.B, quizPayload.C, quizPayload.D];
      myObj.solution = quizPayload.solution;
      setQuiz([...quiz, myObj])
      formRef.current.reset();
      setQuizPayload({});
      setSrNumber(srNumber + 1);

    }



  }
  const handleQuizModalClose = () => {
    setQuiz([])
    setSrNumber(1);
  }
  useEffect(() => {
    dispatch(activeCourseLessonsFetchAction(details._id),
      dispatch(progressionFetchAction())
    )
  }, [])
  return (
    <>
      <Modal onClosed={() => handleQuizModalClose()} isOpen={modal} toggle={togglequiz} centered={true} size="lg">
        <ModalHeader toggle={togglequiz}>Create Quiz</ModalHeader>
        <ModalBody>
          <Row className="mb-2">
            <form ref={formRef} onSubmit={(e) => handleNextQuestion(e)}>



              <Row >
                <Col md={12}>
                  <Row className="mt-1">
                    <Col md={1}>
                      <Label for="q1">
                        Q:{srNumber}
                      </Label></Col>
                    <Col md={11}>  <Input
                      name="question"
                      placeholder={"Enter Question "}
                      onChange={(e) => handleQuizInput(e)}
                      type="text"
                      required
                    /></Col>
                  </Row>

                </Col>
                <Row className="mt-1">
                  <Col md={1}>
                    <Label for="q1">
                      A
                    </Label></Col>
                  <Col md={5}>    <Input
                    name="A"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    required
                  /></Col>
                  <Col md={1}>
                    <Label for="q1">
                      B
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="B"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    required
                  /></Col>
                </Row>
                <Row className="my-1">
                  <Col md={1}>
                    <Label for="q1">
                      C
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="C"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    required
                  /></Col>
                  <Col md={1}>
                    <Label for="q1">
                      D
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="D"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    required
                  /></Col>
                </Row>
                <Col xl={1}><p className="fw-bold">Answer:</p></Col>
                <Col xl={2}>
                  <Label for="exampleSelect">Solution</Label>
                  <Input type="select" name="solution" id="exampleSelect"
                    onChange={(e) => { handleQuizInput(e) }}
                  >
                    <option value={"select"}>Select</option>
                    {quizPayload?.B != undefined && <> <option value={quizPayload?.A}>{quizPayload?.A}</option>
                      <option value={quizPayload?.B}>{quizPayload?.B}</option>
                      <option value={quizPayload?.C}>{quizPayload?.C}</option>
                      <option value={quizPayload?.D}>{quizPayload?.D}</option></>}
                  </Input>
                </Col>
              </Row>
              <Col xl="12">
                <div className=" mt-3 d-flex justify-content-between">
                  <Button >Previous</Button>
                  <Button >Next</Button>
                </div>
              </Col>
            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={togglequiz}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleQuizSubmit}>
            Create  {quiz?.length} Quiz
          </Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={itemmodal} toggle={toggleitemmodal} centered={true} size="md">
        <ModalHeader toggle={toggleitemmodal}>
          Add Video
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => { handleVideoAdd(e) }}>
            <FormGroup>
              <Label for="videoLink">Video Title</Label>
              <Input
                onChange={(e) => setVideoPayload({ ...videoPayload, [e.target.name]: e.target.value })}
                type="text"
                // value={progressiondata?.progressionName}
                name="videoName"
                placeholder=""
                required />
            </FormGroup>
            <FormGroup>
              <Label for="videoLink">Video Link</Label>
              <Input
                onChange={(e) => setVideoPayload({ ...videoPayload, [e.target.name]: e.target.value })}
                type="text"
                name="videoUrl"
                placeholder="eg:- https://www.youtube.com/watch?v=BywDOO99Ia0"
                required
              />
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary">
              Add Video
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={videoModal} toggle={toggleVideoModal} centered={true} fullscreen>
        <ModalHeader toggle={toggleVideoModal}>
        </ModalHeader>
        <ModalBody>
          <div>
            <iframe style={{ height: '90vh' }} className=""
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoLink}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModal.show} toggle={toggleDeleteModal} centered={true} size="md">
        <ModalHeader toggle={toggleDeleteModal}>
          Delete
        </ModalHeader>
        <ModalBody>
          Are You Sure to Delete?
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={toggleDeleteModal}>
            Cancel
          </Button>{' '}
          <Button color="btn btn-danger" onClick={() => { toggleDeleteModal(), dispatch(lessonDeleteAction(details._id, deleteModal.id)) }}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={lessonModal} toggle={toggleLessonModal} centered={true} size="md">
        <ModalHeader toggle={toggleLessonModal}>
          Add Lesson
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleLessonAdd(e)}>
            <FormGroup>
              <Label for="videoLink">Lesson Name</Label>
              <Input
                onChange={(e) => setLessonName({ "lessonName": e.target.value })}
                type="text"
                // value={progressiondata?.progressionName}
                name="videoLink"
                placeholder=""
                required
              />
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleLessonModal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary">
              Save Lesson
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Fragment>
        <Card className="mb-0">
          <CardBody>
            <Row>
              <Col xl="9">
                <h1>{details?.courseName}</h1>
                <div className="d-flex justify-content-start ">
                  <img className="w-50 img-fluid " src={details?.courseImage} />
                </div>
                <ul className="product-features list-unstyled">
                  <li className="d-flex justify-content-between mb-1 py-1">

                    <FormGroup switch>
                      <Label check className="me-1">EDIT COURSE</Label>
                      <Input
                        type="switch"
                        onChange={() => { setEditable(!editable); setEditableData(details) }}
                        value={editable}
                      />
                    </FormGroup>
                    <Button disabled={!editable} color="primary" >Save</Button>
                  </li>
                  <li className="d-flex justify-content-between mb-1">
                    <span className="d-flex align-items-center">
                      <VscTypeHierarchy className="me-1" /> Course Name
                    </span>
                    <Col xl="2"> <Input disabled={!editable} value={editableData?.courseName} onChange={(e) => setEditableData({ ...editableData, courseName: e.target.value })}></Input></Col>
                  </li>
                  <li className="d-flex justify-content-between mb-1">
                    <span className="d-flex align-items-center">
                      <VscTypeHierarchy className="me-1" /> Category
                    </span>
                    <Col xl="2"> <Input disabled={!editable} value={editableData?.courseType} onChange={(e) => setEditableData({ ...editableData, courseType: e.target.value })}></Input></Col>
                  </li>
                  <li className="d-flex justify-content-between mb-1">
                    <span className="d-flex align-items-center">
                      <BsCalendar2Date className="me-1" />  Start Date
                    </span>
                    <span><Flatpickr
                      name="startDate"
                      className="form-control"
                      value={editableData?.startDate}
                      disabled={!editable}
                      onChange={(date, dateStr) => setStartDate(dateStr)}
                      options={{
                        dateFormat: "m-d-Y",
                      }}
                      id="default-picker"
                    /></span>
                  </li>
                  <li className="d-flex justify-content-between mb-1">
                    <span className="d-flex align-items-center">
                      <BsCalendar2Date className="me-1" />  Expiration Date
                    </span>
                    <span>
                      <Flatpickr
                        name="endDate"
                        className="form-control"
                        value={editableData?.endDate}
                        disabled={!editable}
                        onChange={(date, dateStr) => setEndDate(dateStr)}
                        options={{

                          dateFormat: "m-d-Y",
                        }}
                        id="default-picker"
                      />
                    </span>
                  </li>
                  <li className="d-flex justify-content-between mb-1">
                    <span className="d-flex align-items-center">
                      <FaGraduationCap className="me-1" /> Price
                    </span>
                    <Col xl="2"> <Input disabled={!editable} onChange={(e) => setEditableData({ ...editableData, coursePrice: e.target.value })} value={editableData?.coursePrice + "$"}></Input></Col>
                  </li>
                  {editable && <div className="bg-light-secondary p-1 mb-1">
                    <Row >
                      <Col xl="12" className="fw-bold">Accessibility</Col>
                      <Col xl="6">
                        <Label for="progression">Progression Name</Label>
                        <Input type="select" name="progressionName" id="exampleSelect" onChange={(e) => { generateProgressionCategories(e.target.value), setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value }) }}>
                          <option >Select</option>
                          {store?.map((item) =>
                            (<option>{item?.progressionName}</option>)
                          )}
                        </Input>
                      </Col>
                      <Col xl="6">
                        <Label for="category">Progression Category</Label>
                        <Input type="select" name="categoryName" id="exampleSelect" onChange={(e) => setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value })}>
                          <option value="All">Select</option>
                          {progressionCategories?.map((item) =>
                            (<option>{item?.categoryName}</option>)
                          )}
                        </Input>
                      </Col>
                      <Col xl="10">
                        <Label for="Rank">Accessible to Rank </Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={[{ "value": "Rank1", "label": "Rank1" }, { "value": "Rank2", "label": "Rank2" }, { "value": "Rank3", "label": "Rank3" }]}
                        />
                      </Col>
                      <Col xl="2">
                        <Button className="mt-2 " onClick={handleAddProgresson} color="primary"> Add </Button>
                      </Col>
                    </Row>
                    {progressionList.length > 0 ? <Row className=" text-secondary mt-2 ">
                      <Col className="text-black fs-5" xl="2">Sr.</Col>
                      <Col className="text-black fs-5" xl="3">Progression</Col>
                      <Col className="text-black fs-5" xl="3">Category</Col>
                      <Col className="text-black fs-5" xl="3">Rank</Col>
                      {progressionList?.map((item, index) =>
                      (
                        <>
                          <Col xl="2" key={index}>{index + 1}</Col>
                          <Col xl="3" key={index}>{item?.progressionName}</Col>
                          <Col xl="3" key={index}>{item?.categoryName}</Col>
                          <Col xl="3" key={index}>{item?.rankUpto}</Col>
                          <Col xl="1" key={index} onClick={() => handleDelete(index)} className="cursor-pointer text-danger">X</Col>
                        </>
                      )
                      )}
                    </Row> : ""}
                  </div>}

                </ul>
              </Col>
              <Col xl="3" className="bg-light-secondary">
                <PerfectScrollbar>
                  <Sidebar />
                </PerfectScrollbar>
              </Col>

              <hr />
              <div className="mt-1">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={active === '2'}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      <GiNotebook size={16} />
                      <span className="align-middle">Edit Course</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="py-50" activeTab={active}>
                  <TabPane tabId="1">
                    <div className="d-flex mb-2">
                      <div>
                        <Avatar
                          img={cmtImg}
                          className="me-2"
                          imgHeight="60"
                          imgWidth="60"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bolder">Willie Clark</h6>
                        <CardText className="mb-0">
                          Based in London, Uncode is a blog by Willie Clark. His posts
                          explore modern design trends through photos and quotes by
                          influential creatives and web designer around the world.
                        </CardText>
                      </div>
                    </div>
                    <h4>Description</h4>

                  </TabPane>
                  <TabPane tabId="2">
                    <div className="d-flex justify-content-between">
                    </div>
                    <Button color="" onClick={toggleLessonModal} className="bg-light-success"><Plus />Add Lesson</Button>
                    <Accordion open={open} toggle={toggleAccordion}>
                      {lessonList?.map((item, index) =>
                      (
                        <div className="d-flex justify-content-between">
                          <Col xl="10">
                            <AccordionItem>
                              <AccordionHeader targetId={index + 1} >
                                <Col xl="12" className="d-flex justify-content-between">
                                  <h4>{index + 1 + ". "}{item?.lessonName}</h4>
                                </Col>
                              </AccordionHeader>
                              <AccordionBody accordionId={index + 1}>
                                {item?.videoId?.map((item, index) =>
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
                                ))}
                                {item?.quiz.map((item, index) => (

                                  <Card className="my-1 bg-light-secondary " >
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
                                {/* <Card className="my-1 bg-light-secondary">
                                          <CardBody className="p-1">
                                            <CardText tag="h5">
                                              <div className="d-flex align-items-center justify-content-between ">
                                                <div className="d-flex align-items-center">
                                                  <CheckSquare size={30} className="me-1" />
                                                  <Link>
                                                    <span className="text-secondary">Quiz</span>
                                                  </Link>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                  <span className="  me-2 bg-light rounded" ><span className="m-1">No of Questions</span></span>
                                                  <span className=" bg-warning rounded text-white"><span className="m-1">5:00 min</span></span>
                                                </div>
                                              </div>
                                            </CardText>
                                          </CardBody>
                                        </Card> */}
                                <div className="d-flex align-items-center justify-content-start  my-2 ">
                                  <div className="d-flex  p-1 rounded align-items-center ">
                                    <Plus size={15} className="me-2" />

                                    <Button outline color="success" onClick={() => { toggleitemmodal(); setVideoPayload({ "id": item._id }) }} className="ms-1  rounded cursor-pointer">
                                      <Video size={15} className=""></Video>
                                      <span> Video</span>
                                    </Button>
                                    <Button outline color="success" onClick={() => { togglequiz(), setLessonId(item._id) }} className=" ms-1  rounded cursor-pointer">
                                      <CheckSquare size={15} ></CheckSquare>
                                      <span> Quiz</span>
                                    </Button>
                                  </div>
                                </div>
                              </AccordionBody>
                            </AccordionItem>
                          </Col>
                          <Col xl="1">
                            <p className="mt-1">   <span><AiOutlineDelete size="20" onClick={() => { setDeleteModal({ "id": item._id, "show": !deleteModal.show }) }} className="text-danger mx-2 cursor-pointer" /></span></p>
                          </Col>
                        </div>
                      ))}
                    </Accordion>
                  </TabPane>
                </TabContent>
              </div>
            </Row>
          </CardBody>
        </Card>



      </Fragment>
    </>
  );
};

export default Course;
