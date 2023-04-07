// ** React Imports
import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

// ** Product detail components
import ItemFeatures from './ItemFeatures';
import CourseDetails from './CourseDetails';
import RelatedCourses from './RelatedCourses';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Card, CardBody, Button,Col } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store';
import '@styles/base/pages/app-ecommerce-details.scss';
import { ArrowLeft, ChevronLeft } from 'react-feather';

const Details = (props) => {
  const { details, setDetails } = props;
  const data = details?.details


  // ** Vars
  // const params = useParams().product;
  // const productId = params.substring(params.lastIndexOf('-') + 1);

  // // ** Store Vars
  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.ecommerce);

  // // ** ComponentDidMount : Get product
  // useEffect(() => {
  //   dispatch(getProduct(productId));
  // }, []);

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
          <ChevronLeft size={40} className=" cursor-pointer" onClick={() => setDetails({ show: !details.show })}/>
        </CardBody>
      </Card>
  
      </Col>
      <div className="app-ecommerce-details">
        {/* {Object.keys(store.productDetail).length ? ( */}
        <Card>
          <CardBody >
            <CourseDetails
              details={data}
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
