/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import Sidebar from './Sidebar';
import { Col, Nav, NavItem, Row, TabContent, TabPane, NavLink } from 'reactstrap';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { BsListCheck, BsUiChecks } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';

// ** CUSTOME Components
import FormStep from './tabs/step';
import Contact from './tabs/contact';
import Sales from './tabs/sales';
import Automation from './tabs/automation';
import Settings from './tabs/settings';

// ** STYLES
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

// ** DATA ACTIONS
import { getFormDataAction, getFormsEntryAction } from '../store/action';


const FunnelSettings = () => {
  // ** STATES
  const { id } = useParams();
  //const [data, setData] = useState(null);
  const [active, setActive] = useState('1');

  // ** DATA VARIABLES
  const store = useSelector((state) => {
    return {
      ...state.formEditor,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.form._id === '') {
      dispatch(getFormDataAction(id));
      
      dispatch(getFormsEntryAction(id));
    }
    
  }, [dispatch]);
  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink active={active === '1'} onClick={() => setActive('1')}>
                <FiSettings className="font-medium-1 me-50" />
                <span className="fs-6">STEP</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={active === '2'} onClick={() => setActive('2')}>
                <GiRank2 className="font-medium-1 me-50" />
                <span className="fs-6">CONTACT</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={active === '3'} onClick={() => setActive('3')}>
                <BsUiChecks className="font-medium-1 me-50" />
                <span className="fs-6">SALES</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={active === '4'} onClick={() => setActive('4')}>
                <BsListCheck className="font-medium-1 me-50" />
                <span className="fs-6">AUTOMATIONS</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '5'} onClick={() => setActive('5')}>
                <MdOutlineNotifications className="font-medium-1 me-50" />
                <span className="fs-6">SETTINGS</span>
              </NavLink>
            </NavItem>
          </Nav>
          {store?.form?.id !== '' && (
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <FormStep dispatch={dispatch} store={store} />
              </TabPane>
              <TabPane tabId="2">
                <Contact dispatch={dispatch} store={store} />
              </TabPane>
              <TabPane tabId="3">
                <Sales dispatch={dispatch} store={store}/>
              </TabPane>
              <TabPane tabId="4">
                <Automation />
              </TabPane>
              <TabPane tabId="5">
                <Settings store={store} dispatch={dispatch}/>
              </TabPane>
            </TabContent>
          )}
        </Col>
      </Row>
    </>
  );
};
export default FunnelSettings;
