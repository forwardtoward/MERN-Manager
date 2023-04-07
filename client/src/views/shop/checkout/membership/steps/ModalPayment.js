import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Icon Imports
import { PlusCircle, Plus } from 'react-feather';
import { BsCreditCard, BsCash } from 'react-icons/bs';

import useMessage from '../../../../../lib/useMessage';

// ** Reactstrap Imports
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Payment from '../payment/Payment';

// ** Components
import CardPayment from '../CardPayment';
import CashPayment from '../CashPayment';

const ModalPayment = (props) => {
  const { dispatch, client, membershipDetail, openPayment, setOpenPayment } = props
  const { success, error } = useMessage();
  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Modal
      isOpen={openPayment}
      toggle={() => setOpenPayment(false)}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalHeader toggle={() => setOpenPayment(false)}>Payment</ModalHeader>
      <ModalBody>
          <Nav className="justify-content-center" tabs>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1');
                }}
              >
                <BsCreditCard size={18} />
                <span className="align-middle">CREDIT CARD</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2');
                }}
              >
                <BsCash size={18} />
                <span className="align-middle">CASH OR CHECK</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              <CardPayment
                client={client}
                membershipDetail={membershipDetail}
                dispatch={dispatch}
              />
            </TabPane>
            <TabPane tabId="2">
              <CashPayment
                client={client}
                membershipDetail={membershipDetail}
                dispatch={dispatch}
              />
            </TabPane>
          </TabContent>          
        <Payment 
        />
      </ModalBody>
    </Modal>
  )
}

export default ModalPayment;