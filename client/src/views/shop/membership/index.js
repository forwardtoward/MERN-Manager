import React, { Fragment, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import { AlignJustify, Rss, Info, Image, Users, Edit, Eye } from 'react-feather';

import Memberships from './tabs/memberships/Memebrships';
export default function index({dispatch,store}) {
  const [active, setActive] = useState('1');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <Card className="profile-header mb-2">
              <div className="profile-header-nav">
                <Navbar
                  container={false}
                  className="justify-content-end justify-content-md-between w-100"
                  expand="md"
                  light
                >
                  <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
                    <AlignJustify size={21} />
                  </Button>
                  <Collapse isOpen={isOpen} navbar>
                    <div className=" d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                      <Nav className="mb-0" tabs>
                        <NavItem>
                          <NavLink
                            className="fw-bold"
                            active={active === '1'}
                            onClick={() => setActive('1')}
                          >
                            <span className="d-none d-md-block">Memberships</span>
                            <Info className="d-block d-md-none" size={14} />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="fw-bold"
                            active={active === '2'}
                            onClick={() => setActive('2')}
                          >
                            <span className="d-none d-md-block">Categories</span>
                            <Image className="d-block d-md-none" size={14} />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="fw-bold"
                            active={active === '3'}
                            onClick={() => setActive('3')}
                          >
                            <span className="d-none d-md-block">Customers</span>
                            <Users className="d-block d-md-none" size={14} />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="fw-bold"
                            active={active === '4'}
                            onClick={() => setActive('4')}
                          >
                            <span className="d-none d-md-block">Orders</span>
                            <Users className="d-block d-md-none" size={14} />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="fw-bold"
                            active={active === '5'}
                            onClick={() => setActive('5')}
                          >
                            <span className="d-none d-md-block">Contracts</span>
                            <Users className="d-block d-md-none" size={14} />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Collapse>
                </Navbar>
              </div>
            </Card>
          </Col>
        </Row>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <Memberships dispatch={dispatch} store={store}/>
          </TabPane>
          <TabPane tabId="2"></TabPane>
          <TabPane tabId="3"></TabPane>
          <TabPane tabId="4"></TabPane>
          <TabPane tabId="5"></TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
}
