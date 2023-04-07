import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';
import ManageCourse from '../mycma/usercourses/manage';
import Coupons from './coupons/Coupons';
import Faq from './faq';
import ManageShop from './manage';
import EditShopModal from './manage/EditShopModal';
import NoShop from './noShop/NoShop';
import Settings from './settings/Settings';
import Statistics from './statistics/Statistics';
import ManageMembership from './membership'

import { getShopAction } from './store/action';
import { getMemberships, getProducts } from './store';
import Shop from './shop';

export default function index() {
  const [activeShop, setActiveShop] = useState('1');
  const [title, setTitle] = useState('Dashboard');
  const [openEdit, setOpenEdit] = useState(false);

  const toggleEdit = () => setOpenEdit(!openEdit);

  const dispatch = useDispatch();
  const store = useSelector((state) => {return {...state.shopDetails,...state.shop}});

  const handleOpenPreview = ()=>{
    window.open(`/ecommerce/shop/public`)
   // window.open(`/ecommerce/shop/public`)
  }

  useEffect(() => {
    dispatch(getShopAction());
    dispatch(getProducts({
      q: '',
      sortBy: 'featured',
      perPage: 9,
      page: 0
    }))
    dispatch(getMemberships({
      q: '',
      sortBy: 'featured',
      perPage: 9,
      page: 0
    }))
  }, [dispatch]);
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Shop" breadCrumbParent="Shop" breadCrumbActive={title} /> */}
      {store?.shop?._id ? (
        <>
          <div className="d-flex justify-content-between">
            <Nav pills>
            <NavItem>
                <NavLink
                  active={activeShop === '1'}
                  onClick={() => {
                    setActiveShop('1');
                    setTitle('My Shop');
                  }}
                >
                  My Shop
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '2'}
                  onClick={() => {
                    setActiveShop('2');
                    setTitle('Dashboard');
                  }}
                >
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '3'}
                  onClick={() => {
                    setActiveShop('3');
                    setTitle('Manage Products');
                  }}
                >
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '4'}
                  onClick={() => {
                    setActiveShop('4');
                    setTitle('Manage Memberships');
                  }}
                >
                  Memberships
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '5'}
                  onClick={() => {
                    setActiveShop('5');
                    setTitle('Manage Courses');
                  }}
                >
                  Courses
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '6'}
                  onClick={() => {
                    setActiveShop('6');
                    setTitle('Shop Settings');
                  }}
                >
                  Coupons
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '7'}
                  onClick={() => {
                    setActiveShop('7');
                    setTitle('Shop Settings');
                  }}
                >
                  Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeShop === '8'}
                  onClick={() => {
                    setActiveShop('8');
                    setTitle('FAQ');
                  }}
                >
                  FAQ
                </NavLink>
              </NavItem>
            </Nav>
            <div className="my-auto">
              <div className="d-flex">
                <Button color="outline-primary" className="me-50" onClick={toggleEdit}>
                  Edit Shop
                </Button>
                <Button color="primary" onClick={handleOpenPreview}>Preview</Button>
               
              </div>
            </div>
          </div>
          <hr/>
          <TabContent activeTab={activeShop}>
            <TabPane tabId="1">
              <Shop dispatch={dispatch} store={store}/>
            </TabPane>
            <TabPane tabId="2">
              <Statistics dispatch={dispatch} store={store} />
            </TabPane>
            <TabPane tabId="3">
              <ManageShop dispatch={dispatch} store={store} />
            </TabPane>
            <TabPane tabId="4">
              <ManageMembership dispatch={dispatch} store={store}/>
            </TabPane>
            <TabPane tabId="5">
              <ManageCourse />
            </TabPane>
            <TabPane tabId="6">
              <Coupons />
            </TabPane>
            <TabPane tabId="7">
              <Settings />
            </TabPane>
            <TabPane tabId="8">
              <Faq />
            </TabPane>
          </TabContent>
          {store && store?.shop && (
            <EditShopModal
              open={openEdit}
              toggle={toggleEdit}
              data={store?.shop}
              dispatch={dispatch}
            />
          )}
        </>
      ) : (
        <NoShop dispatch={dispatch} />
      )}
    </Fragment>
  );
}
