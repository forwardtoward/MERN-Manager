import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Edit2 } from 'react-feather';
import { useParams } from 'react-router-dom';
import { Button, Col, Input, Row } from 'reactstrap';
import EditElementModal from '../elements/EditElementModal';
import {
  createOrganizationSubscriptionAction,
  createPlanAction,
  getDefaultElementsAction,
} from '../store/action';

export default function PermissionsForm({ dispatch, stepper,plan, isEdit,toggle,store }) {
  const [permissions, setPermissions] = useState([]);
  const [openEditElement, setOpenEditElement] = useState(false);
  
  const {id} = useParams()
  const toggleEditElement = () => setOpenEditElement(!openEditElement);

  const [selectedElement, setSelectedElement] = useState(null);

  const handleOnChange = (e, row) => {
    let p = permissions;
    p = permissions.map((x) => {
      let i = x;
      if (i.defaultId === row.defaultId) {
        i = { ...i, [e.target.name]: e.target.checked };
        if (e.target.name === 'read' && e.target.checked === false) {
          i = { ...i, read: false, write: false, delete: false, update: false };
        }
      }
      return i;
    });
    setPermissions(p);
  };
  const handleSubmitPermissions = () => {
    const payload = {...plan,permissions:permissions}
    
    dispatch(createPlanAction(payload)).then(res=>{
   
      if(id){
      //save to org plan
      const bought = {
        organizationId : id,
        planId: res._id,
        status:'waiting'
      }
      dispatch(createOrganizationSubscriptionAction(bought))
    }
    })
    
    toggle()
  };

  //get init data
  useEffect(() => {
    dispatch(getDefaultElementsAction()).then(data=>{
      console.log(data)
      let ps = [];
      for (const element of data) {
        ps.push({
          elementTitle: element.elementTitle,
          elementParent: element.elementParent,
          navLink: element.navLink,
          read: false,
          write: false,
          update: false,
          delete: false,
          defaultId: element.id,
        });
      }
      setPermissions(ps);
    })
    
    
  }, [store]);
  const columns = [
    {
      name: 'MODULE',
      selector: (row) => row.defaultId,
      width: '20%',
      cell: (row) => (
        <div className="d-flex justify-content-between w-100">
          <span>{row.defaultId}</span>
          <Edit
            size={18}
            className="text-secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedElement(row);
              toggleEditElement();
            }}
          />
        </div>
      )
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.read}
          name="read"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'WRITE',
      selector: (row) => row.write,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.write}
          name="write"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'UPDATE',
      selector: (row) => row.update,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.update}
          name="update"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'DELETE',
      selector: (row) => row.delete,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.delete}
          name="delete"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    }
  ];
  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            <div className="list-group task-task-list-wrapper">
              <DataTable
                striped
                noHeader
                responsive
                className="react-dataTable"
                columns={columns}
                data={permissions}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="d-flex justofy-conten-end">
        <Button color="primary mt-50" onClick={handleSubmitPermissions}>
          Submit
        </Button>
      </div>
      {selectedElement !== null && (
        <EditElementModal
          open={openEditElement}
          toggle={toggleEditElement}
          element={selectedElement}
          dispatch={dispatch}
        />
      )}
    </Fragment>
  );
}
