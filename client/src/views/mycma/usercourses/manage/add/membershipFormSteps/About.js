// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';
// ** Utils
import { selectThemeColors } from '@utils';
import { courseAddAction } from '../../../store/actions';
import { progressionFetchAction } from '../../../../../settings/tabs/progressiontab/store/actions';
import { useDispatch, useSelector } from 'react-redux';
// ** Styles
import '@styles/react/libs/editor/editor.scss';
const colourOptions = [
  { value: 'Type A', label: 'Type A' },
  { value: 'Type B', label: 'Type B' },
  { value: 'Type C', label: 'Type C' },
  { value: 'Type D', label: 'Type D' },
];
const curriculumOptions = [
  { value: 'Online Exam', label: 'Online Exam' },
  { value: 'Online Course', label: 'Online Course' },
];
const About = ({ stepper, type, centeredModal, setCenteredModal }) => {
  const animatedComponents = makeAnimated();
  const store = useSelector((state) => state.progression.progressionList);
  // ** State
  const [progressionList, setProgressionList] = useState([]);
  const [progressionItem, setProgressionItem] = useState({ categoryName: "All", rankUpto: "All" })
  const [courseData, setCourseData] = useState({ courseType: "Online Exam" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [progressionCategories, setProgressionCategories] = useState([]);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const generateProgressionCategories = (item) => {
    const filteredCategory = store?.filter(category => category.progressionName === item)
    const categories = filteredCategory[0]?.categoryId;
    setProgressionCategories(categories)
  }
  const dispatch = useDispatch();
  const handleFormInput = (e) => {
    if (e.target.name != 'image') {
      setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }
    if (e.target.name === 'image') {
      setCourseData({ ...courseData, file: e.target.files[0] });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseData?.courseName)
    formData.append('courseCategory', courseData?.courseCategory)
    formData.append('courseType', courseData?.courseType)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('coursePrice', courseData?.coursePrice)
    formData.append('description', courseData?.description)
    formData.append('file', courseData.file)
    for (let i = 0; i < progressionList.length; i++) {
      formData.append('courseAccessibility', progressionList[i]);
    }
    dispatch(courseAddAction(formData))
    setCenteredModal(!centeredModal);

  }
  const handleAddProgresson = () => {
    setProgressionList([...progressionList, progressionItem])
  }
  const handleDelete = (item) => {
    let a = progressionList
    a.splice(item, 1)
    setProgressionList([...a])
  }
  useEffect(() => {
    dispatch(progressionFetchAction())
  }, [])


  return (
    <Fragment >
      {/* <Form onSubmit={(e) => e.preventDefault()}> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Course Title
            </Label>
            <Input onChange={handleFormInput} type="text" name="courseName" id="nameMulti" placeholder="Course Title" required value={courseData?.courseName} />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Category
            </Label>
            <Select
              name="courseCategory"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={curriculumOptions[0]}
              options={curriculumOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, "courseCategory": e.value })}
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xl="12">
            <Label for="exampleSelect">Course Type</Label>
            <Input type="select" name="courseType" id="exampleSelect" onChange={(e) => { e.target.value === "Included" ? setShowAccessibility(true) : e.target.value === "Purchased" ? setShowAccessibility(false) : setShowAccessibility(false), setCourseData({ ...courseData, "courseType": e.target.value }) }}>
              <option>Select</option>
              <option>Included</option>
              <option>Purchased</option>
            </Input></Col>
        </Row>
        {showAccessibility ?
          <div className="bg-light-warning p-1 mb-1">
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
            {progressionList.length > 0 ? <Row className=" text-secondary bg-light-secondary">
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
          </div>
          : ""}
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Start Date
            </Label>

            <Flatpickr
              name="startDate"
              className="form-control"
              value={startDate}
              defaultValue={startDate}
              onChange={(date, dateStr) => setStartDate(dateStr)}
              options={{
                dateFormat: "m-d-Y",
              }}
              id="default-picker"
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Expiration Date
            </Label>
            <Flatpickr
              name="endDate"
              className="form-control"
              value={endDate}
              defaultvalue={endDate}
              onChange={(date, dateStr) => setEndDate(dateStr)}
              options={{

                dateFormat: "m-d-Y",
              }}
              id="default-picker"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Price $
            </Label>
            <Input onChange={handleFormInput} type="number" name="coursePrice" id="duration" placeholder="$" required />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="image">
              Course Cover
            </Label>
            <Input type="file" id="image" onChange={handleFormInput} name="image" required />
          </Col>
        </Row>
        <Col md="12" sm="12" className="mb-1">
          <Label className="form-label" for="description">
            Description
          </Label>
          <Editor onContentStateChange={(contentState) => setCourseData({ ...courseData, "description": contentState?.blocks[0]?.text })} name="description" />
        </Col>
        <div className="d-flex justify-content-between">
          {/* <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button> */}
          <Button color="primary" onClick={() => setCenteredModal(!centeredModal)} className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
            {/* <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight> */}
          </Button>
          <Button color="primary" className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Create</span>
          </Button>
          {/* <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Submit</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button> */}
        </div>
      </Form>
    </Fragment>
  );
};

export default About;
