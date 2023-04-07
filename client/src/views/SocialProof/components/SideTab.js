// ** React Imports
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  ModalFooter
} from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import MemberStatistics from '../views/MemberStatistics';
import ProofTable from '../views/ProofTable';
import Pixel from '../createForm/Pixel';
import { createAddCampaign } from '../../../requests/userproof';
const SideTab = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('1');
  const [newCampaign, setNewCampaign] = useState(false);

  const [campaign_name, setCampaignName] = useState('');
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const history = useHistory();
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const handleAddCampaignSubmit = () => {
    setNewCampaign(!newCampaign);
    history.push('/camgaign-edit');

    const payload = {
      campaign_name
    };
    createAddCampaign(payload).then((response) => {
      setCampaignName('');
    });

    localStorage.setItem('CampaignName', campaign_name);
  };
  const handleOpenAddCampaign = (e) => {
    e.preventDefault();
    setNewCampaign(true);
  };

  return (
    <div
      style={{ display: 'inline', width: '100%',padding: '0px 20px 0px 0px' }}
    >
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar" style={{height: "73vh"}}>
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn p-1">
                <Modal
                  isOpen={newCampaign}
                  toggle={() => setNewCampaign(!newCampaign)}
                  className="modal-dialog-centered"
                >
                  <ModalHeader toggle={() => setNewCampaign(!newCampaign)}>
                    Build & launch a new campaign
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        value={campaign_name}
                        type="text"
                        id="campaign_name"
                        name="campaign_name"
                        placeholder="My Campaign"
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={handleAddCampaignSubmit}
                      disabled={!createNewValidation || !campaign_name}
                    >
                      Next
                    </Button>
                    <Button color="secondary" onClick={() => setNewCampaign(!newCampaign)}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                <Button
                  className="compose-email"
                  color="primary"
                  block
                  onClick={handleOpenAddCampaign}
                >
                  Create Campaigns
                </Button>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages" style={{height: "73vh"}}>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                    action
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Campaigns</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    <MessageCircle size={18} className="me-75" />
                    <span className="align-middle">Statistics</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    <Twitch size={18} className="me-75" />
                    <span className="align-middle">Pixel</span>
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body" style={{ overflow: scroll }}>
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <ProofTable />
                </TabPane>
                <TabPane tabId="2">
                  <MemberStatistics />
                </TabPane>
                <TabPane tabId="3">
                  <Pixel />
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideTab;
