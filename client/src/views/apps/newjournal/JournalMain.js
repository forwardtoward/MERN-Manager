import { useState } from 'react';
import { Collapse, Button, Card, CardBody } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import JournalSidebar from './JournalSidebar';
import JournalList from './JournalList';
import JournalDetail from './JournalDetail';
import '../../../../src/assets/styles/jaornal.scss';

export default function JournalMain() {
  const [collapse, setCollapse] = useState(false);
  const [sideBarUpdateData, setSideBarUpdateData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsSelectedItem, setDetailsSelectedItem] = useState(null);
  const [viewoneId, setViewoneId] = useState('');
  const [statusOpen, setStatusOpen] = useState('close');
  const [viewDetailsId, setViewDetailsId] = useState('');
  const handleJournalCollapse = () => setCollapse(!collapse);

  const parentcallback = (data) => {
    setViewoneId(data);
  };
  return (
    <div>
      <div className="project-right" style={{ float: 'left !important' }}>
        <div className="content-wrapper">
          <div className="content-body">
            <div style={{ display: 'flex', height: 'calc(100vh - 16rem)' }}>
              <div className={`${collapse ? null : 'project-workspace-container'} set-collapse`} style={{borderright: "1px solid #cccccc8f"}}>
                <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
                  <JournalSidebar
                    parentcallback={parentcallback}
                    collapse={collapse}
                    handleJournalCollapse={handleJournalCollapse}
                    sideBarUpdateData={sideBarUpdateData}
                    setSideBarUpdateData={setSideBarUpdateData}
                    setSelectedItem={setSelectedItem}
                    setStatusOpen={setStatusOpen}
                  />
                </Collapse>
                <div
                // className={`${collapse ? 'project-collapse-inactive m-1' : 'tasks-area '}`}
                >
                  <div className="workspace-title">
                    {collapse ? (
                      <Button
                        className="btn-icon btn btn-flat-dark btn-sm"
                        color="flat-dark"
                        onClick={handleJournalCollapse}
                      >
                        <ChevronRight size={14} />
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div class="cus-container">
                <div class="row">
                  <div class="col-5 cus-child-container mt-2" style={{ borderRight: '1px solid #8080805e' }}>
                    <JournalList
                      // style={{ borderRight: '1px solid #8080805e' }}
                      viewoneId={viewoneId}
                      setStatusOpen={setStatusOpen}
                      setViewDetailsId={setViewDetailsId}
                      sideBarUpdateData={sideBarUpdateData}
                      setSideBarUpdateData={setSideBarUpdateData}
                      selectedItem={selectedItem}
                      setDetailsSelectedItem={setDetailsSelectedItem}
                    />
                  </div>
                  <div class="col-7 mt-2 cus-child-container">
                    <JournalDetail
                      statusOpen={statusOpen}
                      setStatusOpen={setStatusOpen}
                      viewDetailsId={viewDetailsId}
                      setSideBarUpdateData={setSideBarUpdateData}
                      detailsSelectedItem={detailsSelectedItem}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
