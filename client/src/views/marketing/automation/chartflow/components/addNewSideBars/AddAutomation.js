import React, { useState, useEffect } from 'react';
import Sidebar from '@components/sidebar';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  Card,
  CardBody,
  Label,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
import { selectThemeColors } from '../../../../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
// import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';

import { setSelectedAutomationAction } from '../../../store/actions';

const AddAutomation = ({ open, toggleSidebar }) => {
  const handleSidebarClosed = () => {
    //
  };

  const automation = useSelector((state) => state.automation);
  const addNewType = automation.addNewType;
  const selectedAutomation = automation.selectedAutomation;
  const parent = automation.addedParent

  const [contactType, setContactType] = useState(null);
  const [activateTime, setActivateTime] = useState('null');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [currentAutomation, setCurrentAutomation] = useState(selectedAutomation);

  const contactTypes = [
    { value: 'ContactType', label: 'ContactType' },
    { value: 'SmartList', label: 'SmartList' }
  ];
  const dateOptions = [
    { value: 'Immediately', label: 'Immediately' },
    { value: '10mins', label: '10mins' },
    { value: '30mins', label: '30mins' },
    { value: '1hour', label: '1hour' },
    { value: '6hour', label: '6hour' },
    { value: '12hour', label: '12hour' },
    { value: '1day', label: '1day' },
    { value: '2days', label: '2days' }
  ];
  const onSetContactType = (e) => {
    setContactType(e.value);
  };
  const onSetActivateTime = (e) => {
    setActivateTime(e.value);
  };
  const onSetSubject = (e) => {
    setSubject(e.target.value);
  };
  const onSetMessage = (data) => {
    setMessage(data);

    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    const newtemplate = draftToHtml(convertToRaw(data.getCurrentContent()));
    setTemplate(newtemplate);
  };
  const dispatch = useDispatch();
  const onInsert = () => {

    let emailAction = {
      id: uuidv4(),
      actionType: 'automation',
      duration: {
        time: 0,
        unit: 'minutes'
      },
      parentId: parent.id,
      setCustomTime: false,
      useSubscriberTimeZone: false,
      customTime: {
        days: [],
        time: 0,
      },
      subject: '',
      content: '',
      attachments: [],
      condition: '',
      confirmProgress: {
        isPercentConfirm: false,
        percentage: 0
      },
      to: {
        type: '',
        contact: []
      },
      method: '',
      isStart: false,
      isLast: true,
      isCondition: false,
    }

    if (parent.isLast) {
      emailAction.isLast = true
    } else {
      emailAction.isLast = false
    }

    let updatedata = selectedAutomation;
    let updatedObject;
    let newActions;
    if (parent.id == '0') {
      if (parent.isLast) {
        newActions = [
          ...updatedata.actions,
          emailAction
        ];
      } else {
        const childIndex = selectedAutomation.actions.findIndex(item => item.parentId == parent.id);
        let child = selectedAutomation.actions[childIndex];
        const updateChild = { ...child, parentId: emailAction.id }
        newActions = [
          emailAction,
          updateChild,
          ...updatedata.actions.slice(1),
        ];
      }
    } else {
      if (parent.isLast) {
        const parentIndex = selectedAutomation.actions.findIndex(item => item.id == parent.id);
        const _parent = selectedAutomation.actions[parentIndex];
        const updatedParent = { ..._parent, isLast: false }
        newActions = [
          ...updatedata.actions.slice(0, parentIndex),
          updatedParent,
          emailAction,
          ...updatedata.actions.slice(parentIndex + 1),
        ];
      } else {
        const childIndex = selectedAutomation.actions.findIndex(item => item.parentId == parent.id);
        const child = selectedAutomation.actions[childIndex];
        const updatedChild = { ...child, parentId: emailAction.id }
        newActions = [
          ...updatedata.actions.slice(0, childIndex),
          updatedChild,
          emailAction,
          ...updatedata.actions.slice(childIndex + 1),
        ];
      }
    }


    // create a new object with the updated actions array:
    updatedObject = { ...updatedata, actions: newActions };
    dispatch(setSelectedAutomationAction(updatedObject))
    toggleSidebar()

  }
  return (
    <Sidebar
      open={open}
      style={{ width: '500px' }}
      // title={`Edit ${showData.content_type}`}
      title="New Automation"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Card className="post">
        <CardBody>
          <Row>
            <Col className="mb-1" sm="12">
              <Label className="form-label">TIME DELAY </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={activateTime}
                options={dateOptions}
                isClearable={false}
                onChange={(e) => onSetActivateTime(e)}
              />
            </Col>
            <div className="compose-mail-form-field">
              <Label for="subject" className="form-label">
                SELECT AUTOMATION
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                // defaultValue={activateTime}
                // options={dateOptions}
                placeholder="Search automation"
                isClearable={false}
                // onChange={(e) => onSetActivateTime(e)}
              />
            </div>
          </Row>

          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => toggleSidebar()}>
                Cancel
              </Button>
            </Col>
            <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => onInsert()}>
                Insert
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default AddAutomation;
