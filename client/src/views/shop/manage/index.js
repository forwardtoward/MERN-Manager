// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';

// ** Third Party Components
import axios from 'axios';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Pages
import ShopHeader from './ShopHeader';
import Statistics from '../statistics/Statistics';
import Products from './Products';
import Category from './Category';
import Customers from './Customers';
import Orders from './Orders';
// import Coupons from './Coupons';
// import Settings from '../settings/Settings';
// import FAQ from '../faq';

import ManageCourse from '../../mycma/usercourses/manage';

// ** Styles
import '@styles/react/pages/page-profile.scss';


const ManageShop = ({ dispatch, store }) => {
  // ** States
  const [active, setActive] = useState('2');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Context
  const { colors } = useContext(ThemeColors);

  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle="Shop" breadCrumbParent="Shop" breadCrumbActive="Manage Shop" /> */}
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <ShopHeader
              data={store?.shop}
              active={active}
              toggleTab={toggleTab}
              dispatch={dispatch}
            />
          </Col>
        </Row>
        <TabContent activeTab={active}>
          {/* <TabPane tabId="1">
                  <Statistics />
                </TabPane> */}
          <TabPane tabId="2">
            <Products dispatch={dispatch} store={store}/>
          </TabPane>
          <TabPane tabId="3">
            <Category />
          </TabPane>
          <TabPane tabId="4">
            <Customers />
          </TabPane>
          <TabPane tabId="5">
            <Orders />
          </TabPane>
          {/* <TabPane tabId="6">
                  <Coupons />
                </TabPane>
                <TabPane tabId="7">
                  <Settings />
                </TabPane>
                <TabPane tabId="8">
                  <FAQ />
                </TabPane> */}
        </TabContent>
      </div>
    </Fragment>
  );
};

export default ManageShop;
