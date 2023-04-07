// ** React Imports
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner } from 'reactstrap';

// ** User View Components
import UserTabs from './Tabs';
import Connections from './Connections';
import UserInfoCard from './UserInfoCard';

import { contactNoteFetchAction, selectContactAction } from '../../store/actions';
import { fetchSingleClientAction } from '../store/actions';

// ** Styles
import '@styles/react/apps/app-users.scss';

const UserView = () => {
  // ** Hooks
  const { id } = useParams();
  const [client, setClient] = useState(null);

  // ** Store Vars
  const store = useSelector((state) => state.clientContact);

  const selectedContact = useSelector(
    (state) => state?.totalContacts?.contactList?.list?.filter((x) => x._id == id)[0]
  );

  const tagStore = useSelector((state) => {
    return { tags: state.totalContacts.tags, leadSources: state.totalContacts.leadSource };
  });
  const dispatch = useDispatch();

  // First Check User Details on Store
  useMemo(() => {
    if (id) {
      if (selectedContact) {
        setClient(selectedContact);
      }
    }
  }, [id, store]);

  // ** Get suer on mount
  useEffect(() => {
    dispatch(selectContactAction(selectedContact));
    dispatch(contactNoteFetchAction(id));
  }, [dispatch, id]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return client !== null && client !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={client} store={tagStore} notes={store?.clientNote?.data} />
          {/* <Connections contact={client} /> */}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            selectedUser={client}
            active={active}
            toggleTab={toggleTab}
            notes={store?.clientNote?.data}
          />
        </Col>
      </Row>
    </div>
  ) : store.singleClient.loading ? (
    <Spinner />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to="/contacts/clients/list">Client List</Link>
      </div>
    </Alert>
  );
};
export default UserView;
