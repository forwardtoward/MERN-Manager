// ** React Imports
import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// ** Product detail components
import CourseDetails from './CourseDetails';
// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';
// ** Reactstrap Imports
import { Card, CardBody, Button,Col } from 'reactstrap';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import '@styles/base/pages/app-ecommerce-details.scss';
import { ArrowLeft, ChevronLeft } from 'react-feather';
import { activeCourseFetchAction } from '../store/actions';


const Details = () => {
  const dispatch=useDispatch();
  const params=useParams();
  // ** Vars
  // const params = useParams().product;
  // const productId = params.substring(params.lastIndexOf('-') + 1);
  // // ** Store Vars
  // const dispatch = useDispatch();
  const store = useSelector((state) => state.course.activeCourse);
  const details=store
  // // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(activeCourseFetchAction(params?.courseid));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Course Details"
        breadCrumbParent="My Courses"
        breadCrumbActive="Details"
      />
      <Col xl="12">
      <Card clasName="my-0  ">
        <CardBody className="p-1">
          <Link to="/mycma/usercourses"><ChevronLeft size={40} className=" cursor-pointer"/></Link>
        </CardBody>
      </Card>
      </Col>
      <div className="app-ecommerce-details">
        {/* {Object.keys(store.productDetail).length ? ( */}
        <Card>
          <CardBody >
            <CourseDetails
              details={details}
            // dispatch={dispatch}
            // addToCart={addToCart}
            // productId={productId}
            // getProduct={getProduct}
            // data={store.productDetail}
            // addToWishlist={addToWishlist}
            // deleteWishlistItem={deleteWishlistItem}
            />
          </CardBody>
          <hr />
          {/* <ItemFeatures /> */}
          {/* <CardBody>
            <RelatedCourses />
          </CardBody> */}
        </Card>
        {/* ) : null} */}
      </div>
    </Fragment>
  );
};

export default Details;
