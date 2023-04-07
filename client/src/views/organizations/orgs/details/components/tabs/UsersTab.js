import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowUp, CreditCard, Lock, Plus } from 'react-feather';
import { BiUpArrow } from 'react-icons/bi';
import { Badge, Button, Col, Row } from 'reactstrap';

export default function UsersTab({selectedOrg}) {
    const [openAddPlan, setOpenAddPlan] = useState(false);

  const toggleAddPlan = () => setOpenAddPlan(!openAddPlan);
  const handleViewPermissions =(row)=>{

  }
  const statusColor ={
    waiting:'light-warning',
    active:'light-success',
    suspended:'light-danger',
    upgraded:'light-secondary',

  }
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.firstName,
      width: '10%',
      cell: (row) => <span>{row?.firstName} {row?.lastName}</span>
    },
    {
      name: 'Email',
      selector: (row) => row?.auths?.email,
      width: '25%',
      cell: (row) => <span>{row?.auths?.email}</span>
    },
    {
      name: 'Phone',
      selector: (row) => row?.auths?.phone,
      width: '15%',
      cell: (row) => <span>{row?.auths?.email}</span>
    },
    
  ];
  return (
    <Fragment>
    <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
      <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
        <div className="task-application">
            <div className="list-group task-task-list-wrapper">
              <DataTable
                noHeader
                responsive
                className="react-dataTable"
                columns={columns}
                data={selectedOrg?.users || []}
              />
            </div>
        </div>
      </Col>
    </Row>
  </Fragment>
  )
}
