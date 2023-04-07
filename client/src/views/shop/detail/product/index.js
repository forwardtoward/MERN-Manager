// ** React Imports
import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

// ** Product detail components
import ItemFeatures from './ItemFeatures';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, handleWishlistItem, addToCart } from '../../store';

import '@styles/base/pages/app-ecommerce-details.scss';

const Details = () => {
  // ** Vars
  const productId = useParams().product;
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shop);
  const [productDetail, setProductDetail] = useState({});

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId)).then((res) => {
      if (res && res.payload.data) {
        setProductDetail({ ...res.payload.data });
      }
    });
  }, []);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Product Details"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Details"
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {productDetail ? (
              <ProductDetails
                store={store}
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={productDetail}
                handleWishlistItem={handleWishlistItem}
              />
            ) : (
              <></>
            )}
          </CardBody>
          <ItemFeatures />
          <CardBody>
            <RelatedProducts />
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default Details;
