import { Fragment, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Tooltip
} from 'reactstrap';

import Select, { components } from 'react-select'; //eslint-disable-line

import { isObjEmpty, selectThemeColors } from '@utils';

import Avatar from '@components/avatar';

import { Columns, UserPlus, FileText, Share, Share2, X } from 'react-feather';

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

import '@src/assets/styles/workspace-share.scss';

import { shareWorkspace } from '../apps/workspace/store';

const ShareModal = (props) => {
  const { store, selectedWorkspace, isOpen, setIsOpen, employeeList, shareConfirm, shareRevert } =
    props;

  const [assignedTo, setAssignedTo] = useState(null);

  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const shareBtnClicked = (e) => {
    e.preventDefault();
    shareConfirm({ assignedTo, id: selectedWorkspace._id });
    setAssignedTo([]);
  };

  const shareXBtnClicked = (e, member) => {
    e.preventDefault();
    shareRevert({ member, id: selectedWorkspace._id });
  };

  const assigneeOptions = employeeList.data
    ? employeeList.data.list
        .filter((x) => {
          if (selectedWorkspace.collaborators) {
            const matching = selectedWorkspace.collaborators.filter(
              (y) => y?.value.toString() === x._id.toString()
            );
            return !matching.length;
          } else {
            return false;
          }
        })
        .map((employee) => {
          return { value: employee._id, label: employee.fullName, img: employee.photo };
        })
    : null;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {renderClient(data)}
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    if (row && typeof row.label === 'string' && Object.keys(row).length > 0) {
      Array.from(row.label).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
    }
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.img) {
      return <Avatar className="me-1" img={row.img} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row?.label || 'John Doe'}
          initials
        />
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancelBtnClicked()}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalHeader toggle={() => cancelBtnClicked()}>Share this workspace</ModalHeader>
      <ModalBody>
        <div>
          <Fragment>
            <Row>
              <Col xs="4" className="current-share">
                <div style={{ fontSize: '20px', margin: '15px 0px' }}>Current Shared</div>
                <div className="assignee-list d-flex flex-column">
                  {selectedWorkspace.collaborators?.length ? (
                    <div className="d-flex flex-column">
                      {selectedWorkspace.collaborators.map((member) => {
                        return (
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            {renderClient(member)}
                            <span style={{ flex: 'auto' }}>{member?.label}</span>
                            <Button
                              id={member?.value}
                              color="flat-danger"
                              style={{ padding: '5px', borderRadius: '20px' }}
                              onClick={(e) => shareXBtnClicked(e, member)}
                            >
                              <X size={'16px'} />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>No Assignees</div>
                  )}
                </div>
              </Col>
              <Col xs="8" className="new-share">
                <div style={{ fontSize: '20px', margin: '15px 0px' }}>New Share</div>
                <div className="mb-1">
                  <Label className="form-label" for="task-assignee">
                    Assignee
                  </Label>
                  <Select
                    isMulti
                    id="task-assignee"
                    value={assignedTo}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={assigneeOptions}
                    theme={selectThemeColors}
                    onChange={(data) => setAssignedTo(data)}
                    components={{ Option: AssigneeComponent }}
                  />
                </div>
              </Col>
            </Row>
          </Fragment>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          className="d-flex align-items-center"
          style={{ borderRadius: '20px' }}
          onClick={shareBtnClicked}
        >
          <Share2 size={'16px'} style={{ marginRight: '10px' }} />
          <span>Share</span>
        </Button>
        <Button
          color="secondary"
          className="d-flex align-items-center"
          style={{ borderRadius: '20px' }}
          onClick={cancelBtnClicked}
        >
          <X size={'16px'} style={{ marginRight: '10px' }} />
          <span>Close</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShareModal;
