import React from 'react';
import {
    Button,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

export default function RoleModal({
  itemmodal,
  toggleitemmodal,
  permissions,
  setPermissions,
  setPermissionName,
  rolesEditAction,
  permissionName,
  disabled,
  rolesAddAction,
  editable,
  dispatch
}) {
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    let permissionArray = [];
    let finalPayload = {};
    permissionArray = [permissions];
    finalPayload = { roleName: permissionName, permissions: permissionArray };
    editable.status
      ? dispatch(rolesEditAction(finalPayload, editable?.id))
      : dispatch(rolesAddAction(finalPayload));
    // dispatch(rolesAddAction(finalPayload));
    setPermissions({ dashboard: false });
    setPermissionName();
    toggleitemmodal();
  };
  const handlePermissionInput = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };
  return (
    <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
      <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
      <Form onSubmit={handlePermissionSubmit} className="p-2">
        <ModalBody>
          <FormGroup>
            <Label for="userRole">Role</Label>
            <Input
              id="userRole"
              value={permissionName}
              onChange={(e)=>setPermissionName(e.target.value)}
              name="roleName"
              placeholder="Please Enter Role Name"
              type="text"
              required
              disabled={disabled}
            />
          </FormGroup>
          <h3>{editable.status ? 'Edit Role Permission' : 'Role Permission'}</h3>
          <Row>
            <ListGroup flush>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="dashboard"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.dashboard}
                  />
                  <Label check>Dashboard</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="contacts"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.contacts}
                  />
                  <Label check>Contacts</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="taskAndGoals"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.taskAndGoals}
                  />
                  <Label check>Task and Goals</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="calendar"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.calendar}
                  />
                  <Label check>Calendar</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="document"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.document}
                  />
                  <Label check>Documents</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="marketing"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.marketing}
                  />
                  <Label check>Marketing</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="shop"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.shop}
                  />
                  <Label check>Shop</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="myBusiness"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.myBusiness}
                  />
                  <Label check>My Business</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="finance"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.finance}
                  />
                  <Label check>Finance</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="fileManager"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.fileManager}
                  />
                  <Label check>File Manager</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="settings"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.settings}
                  />
                  <Label check>Settings</Label>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup check inline>
                  <Input
                    name="myCMA"
                    onChange={handlePermissionInput}
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions?.myCMA}
                  />
                  <Label check>myCMA</Label>
                </FormGroup>
              </ListGroupItem>
            </ListGroup>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
            Cancle
          </Button>{' '}
          <Button color="btn btn-primary" type="submit" disabled={disabled}>
            {editable.status ? 'Save Edit' : 'Save New Role'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
