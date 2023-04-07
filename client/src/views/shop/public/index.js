// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Shop Components
import Sidebar from './Sidebar';
import Memberships from './membership/Memberships';
import Products from './product/Products';

import { useLocation } from 'react-router-dom';

import { Card, CardImg } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  getPublicMemberships,
  getPublicProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';
import './../../../@core/scss/base/pages/page-profile.scss';

import { useParams } from 'react-router-dom';
import { getIsValidPath, getPublicShopAction } from '../store/action';
import { Redirect } from "react-router-dom"

const PublicShop = () => {

  const location = useLocation();
  const shop_path = location.pathname.split('/').slice(-1)[0];

  // ** States
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [type, setType] = useState('membership');
  const [isValid, setIsValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ** Vars
  const dispatch = useDispatch();
  const storeShopDetail = useSelector((state) => state.shopDetails);
  const storeShop = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getIsValidPath(shop_path)).then(res=>{

      if(res.isAvailable === true){
        setIsValid(true) 
        dispatch(getPublicShopAction(shop_path))
      }
      else{
        setIsValid(false)
      }
      setIsLoaded(true)
    })
  }, [dispatch])

  // ** Get products
  useEffect(() => {
    if(isValid){
      if (type == 'membership') {
        if (!storeShop.memberships || !storeShop.memberships.length) {
          dispatch(
            getPublicMemberships({
              q: '',
              sortBy: 'featured',
              perPage: 9,
              page: 0,
              shopId: storeShopDetail?.shop?._id
            })
          );
        }
      } else {
        dispatch(
          getPublicProducts({
            q: '',
            sortBy: 'featured',
            perPage: 9,
            page: 0,
            shopId: storeShopDetail?.shop?._id
          })
        );
      }
    }
  }, [type, dispatch, isValid, storeShopDetail]);

  return (
    <Fragment>
      {isLoaded && !isValid ? (
        <>
          <Redirect to="/misc/error"/>
        </>
       ):(
        <>
          <div className='m-2'>
            <div id="user-profile">
              <Card className="profile-header ">
                <CardImg src={storeShopDetail?.shop?.bannerUrl} alt="User Profile Image" top  style={{maxHeight:"400px"}}/>
                <div className="position-absolute" style={{bottom:"50px",}}>
                  <div className="profile-img-container d-flex align-items-center">
                    <div className="profile-img">
                      <img className="rounded img-fluid" src={storeShopDetail?.shop?.logoUrl} alt="Card image" />
                    </div>
                    <div className="profile-title ms-3">
                      <div className='d-flex justify-content-start'>
                        <h2 className="text-white">
                          {storeShopDetail?.shop?.name}
                        </h2>
                      </div>
                      <p className="text-white">{storeShopDetail?.shop?.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="ecommerce-application m-2">
            {type === 'membership' ? (
              <Memberships
                store={storeShop}
                dispatch={dispatch}
                type={type}
                getMemberships={getPublicMemberships}
                addToCart={addToCart}
                activeView={activeView}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                getCartItems={getCartItems}
                setActiveView={setActiveView}
                deleteCartItem={deleteCartItem}
              />
            ) : (
              <Products
                store={storeShop}
                dispatch={dispatch}
                type={type}
                addToCart={addToCart}
                activeView={activeView}
                sidebarOpen={sidebarOpen}
                getProducts={getPublicProducts}
                getCartItems={getCartItems}
                setActiveView={setActiveView}
                addToWishlist={addToWishlist}
                setSidebarOpen={setSidebarOpen}
                deleteCartItem={deleteCartItem}
                deleteWishlistItem={deleteWishlistItem}
              />
            )}
            <Sidebar sidebarOpen={sidebarOpen} type={type} setType={setType} />
          </div>
        </>
      )}
      
    </Fragment>
  );
};
export default PublicShop;
