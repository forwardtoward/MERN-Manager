// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Shop Components
import Sidebar from './Sidebar';
import MembershipSidebar from './memberships/MembershipSidebar';
import ProductSidebar from './products/ProductSidebar';
import Products from './products/Products';
import Memberships from './memberships/Memberships';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

import {
  addToCart,
  getProducts,
  getMembership,
  getMemberships,
  addMembershipToWishlist,
  getMembershipWishlistItems,
  deleteMembershipWishlist,
  getCartItems,
  handleWishlistItem,
  deleteCartItem
} from '../store';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';
import { Card, CardImg } from 'reactstrap';

const Shop = ({dispatch,store}) => {
  // ** States
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [membershipSidebarOpen, setMembershipSidebarOpen] = useState(false);
  const [productSidebarOpen, setProductSidebarOpen] = useState(false);
  const [type, setType] = useState('membership');
  
  const toggleMembershipHandler = () => {
    setMembershipSidebarOpen(false);
  };

  const toggleProductHandler = () => {
    setProductSidebarOpen(false);
  };
  // ** Get products
  useEffect(() => {
    if (type === 'membership') {
      dispatch(
        getMemberships({
          q: '',
          sortBy: 'featured',
          perPage: 9,
          page: 0
        })
      );
    } else {
      dispatch(
        getProducts({
          q: '',
          sortBy: 'featured',
          perPage: 9,
          page: 0
        })
      );
    }
  }, [type, dispatch]);
  return (
    <Fragment>
      <div id="user-profile">
      <Card className="profile-header ">
          <CardImg src={store?.shop?.bannerUrl} alt="User Profile Image" top  style={{maxHeight:"400px"}}/>
          <div className="position-absolute" style={{bottom:"50px",}}>
            <div className="profile-img-container d-flex align-items-center">
              <div className="profile-img">
                <img className="rounded img-fluid" src={store?.shop?.logoUrl} alt="Card image" />
              </div>
              <div className="profile-title ms-3">
                <div className='d-flex justify-content-start'>
                <h2 className="text-white">
                  {store?.shop?.name}
                </h2>
                </div>
                <p className="text-white">{store?.shop?.description}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {type === 'membership' ? (
        <Memberships
          store={store}
          dispatch={dispatch}
          type={type}
          addToCart={addToCart}
          activeView={activeView}
          getMembership={getMembership}
          getMemberships={getMemberships}
          getMembershipWishlistItems={getMembershipWishlistItems}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          membershipSidebarOpen={membershipSidebarOpen}
          setMembershipSidebarOpen={setMembershipSidebarOpen}
          getCartItems={getCartItems}
          setActiveView={setActiveView}
          addMembershipToWishlist={addMembershipToWishlist}
          deleteCartItem={deleteCartItem}
          deleteMembershipWishlist={deleteMembershipWishlist}
        />
      ) : (
        <Products
          store={store}
          dispatch={dispatch}
          type={type}
          addToCart={addToCart}
          activeView={activeView}
          getProducts={getProducts}
          sidebarOpen={sidebarOpen}
          getCartItems={getCartItems}
          setActiveView={setActiveView}
          handleWishlistItem={handleWishlistItem}
          setSidebarOpen={setSidebarOpen}
          deleteCartItem={deleteCartItem}
          productSidebarOpen={productSidebarOpen}
          setProductSidebarOpen={setProductSidebarOpen}
        />
      )}
      <Sidebar sidebarOpen={sidebarOpen} type={type} setType={setType} />
      <MembershipSidebar
        dispatch={dispatch}
        membershipSidebarOpen={membershipSidebarOpen}
        toggleMembershipHandler={toggleMembershipHandler}
        type={type}
        setType={setType}
      />
      <ProductSidebar
        dispatch={dispatch}
        productSidebarOpen={productSidebarOpen}
        toggleProductHandler={toggleProductHandler}
        type={type}
        setType={setType}
      />
    </Fragment>
  );
};
export default Shop;
