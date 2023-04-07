import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
import Table from './clientTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { useSelector } from 'react-redux';

const Client = () => {
  const clientStore = useSelector((state) => {
    return {
      ...state.clientContact,
      tags: state.totalContacts.tags,
      leadSources: state.totalContacts.leadSource
    };
  });
  const contactTypeId = useSelector(
    (state) => state?.totalContacts?.contactTypeList?.filter((x) => x.name == 'Clients')[0]?._id
  );
  const contactList = useSelector((state) => state?.totalContacts?.contactList?.list);

  const clientContactList = contactList?.filter((x) => x.contactType.indexOf(contactTypeId) > -1);

  const totalCount = clientContactList?.length;
  const activeCount = clientContactList?.filter((x) => x.status == 'active').length;
  const formerCount = clientContactList?.filter((x) => x.isFormer).length;
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Clients"
        breadCrumbParent="Contacts"
        breadCrumbActive="Clients"
      />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Clients"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{totalCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Active Clients"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {activeCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Past Due Clients"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {clientStore?.pastDueCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Former Clients"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {clientStore?.formerCount}</h3>}
            />
          </Col>
        </Row>
        <Table clientStore={clientStore} />
      </div>
    </Fragment>
  );
};

export default Client;
