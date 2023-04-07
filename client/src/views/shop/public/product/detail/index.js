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
import { getPublicProduct, handleWishlistItem, addToCart } from '../../../store';

import '@styles/base/pages/app-ecommerce-details.scss';

const Details = () => {
  // ** Vars
  const productId = useParams().productId;
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shop);
  const { productDetail } = store;

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getPublicProduct(productId));
  }, []);

  return (
    <div className='m-2'>
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
    </div>
  );
};

export default Details;
