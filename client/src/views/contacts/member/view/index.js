// ** React Imports
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner, ListGroup, ListGroupItem, NavLink, Card } from 'reactstrap';
import { GiLifeBar, GiRank3 } from 'react-icons/gi';

// ** User View Components
import UserTabs from './Tabs';
import Connections from './Connections';
import UserInfoCard from './UserInfoCard';

import { fetchSingleMemberAction } from '../store/actions';

// ** Styles
import '@styles/react/apps/app-users.scss';

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.memberContact);
  const dispatch = useDispatch();

  // ** Hooks
  const { id } = useParams();
  const [member, setMember] = useState(null);

  // First Check User Details on Store
  useMemo(() => {
    if (id) {
      if (store.singleMember.member) {
        setMember(store.singleMember.member);
      } else {
        let MemberData = store?.contacts?.list?.find((x) => String(x._id) === String(id));
        if (MemberData) {
          setMember(MemberData);
        }
      }
    }
  }, [id, history, store]);

  // ** Get suer on mount
  useEffect(() => {
    dispatch(fetchSingleMemberAction(id));
  }, [dispatch, id]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return member !== null && member !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={member} notes={store?.memberNote} />
          <Connections contact={member} />
          {active ? (
            <Card tag="div" className="p-2">
              <Link to="#memberRank" className="d-flex align-items-center pb-2">
                <GiRank3 size={18} className="me-75" />
                <h4 className="m-0">Rank and Progression</h4>
              </Link>
              <Link to="#memberLTV" className="d-flex align-items-center">
                <GiLifeBar size={18} className="me-75" />
                <h4 className="m-0">Customer Lifetime Value</h4>
              </Link>
            </Card>
          ) : null}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs selectedUser={member} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : store.singleMember.loading ? (
    <Spinner />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to="/contacts/members/list">Member List</Link>
      </div>
    </Alert>
  );
};
export default UserView;
