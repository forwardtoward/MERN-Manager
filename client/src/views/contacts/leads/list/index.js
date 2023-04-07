import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import Tasks from './taskngoals';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, List, Columns } from 'react-feather';

// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import { useSelector } from 'react-redux';

const Leads = () => {
  const store = useSelector((state) => state.totalContacts);
  const contactTypeId = useSelector(
    (state) => state?.totalContacts?.contactTypeList?.filter((x) => x.name == 'Lead')[0]?._id
  );
  const leadContacts = store?.contactList?.list?.filter(
    (x) => x.contactType.indexOf(contactTypeId) > -1
  );

  const coldLeadCount = leadContacts?.filter((x) => x.stage == 'cold')?.length;
  const warmLeadCount = leadContacts?.filter((x) => x.stage == 'warm')?.length;
  const hotLeadCount = leadContacts?.filter((x) => x.stage == 'hot')?.length;

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Leads" breadCrumbParent="Contacts" breadCrumbActive="Leads" />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Leads"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{leadContacts?.length}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Cold Leads"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{coldLeadCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Warm Leads"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{warmLeadCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Hot Leads"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{hotLeadCount}</h3>}
            />
          </Col>
        </Row>
        <Tasks store={store} />
        {/* <Table /> */}
      </div>
    </Fragment>
  );
};

export default Leads;
