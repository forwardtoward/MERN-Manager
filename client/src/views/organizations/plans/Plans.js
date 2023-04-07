import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Plus } from 'react-feather';
import { FcBusiness } from 'react-icons/fc';
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';
import { convertDate } from '../../goals/helpers/converters';
import NewPlanModal from './create/NewPlanModal';
import UpgradeModal from './UpgradeModal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Icons from 'react-feather'

export default function Plans({ dispatch, store }) {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openAddPlan, setOpenAddPlan] = useState(false);

  const toggleUpgrade = () => setOpenUpgrade(!openUpgrade);
  const toggleAddPlan = () => setOpenAddPlan(!openAddPlan);

  const columns = [
    {
      name: 'Plan',
      selector: (row) => row?.name,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.name}</span>
    },
    {
      name: 'Price Per Month',
      selector: (row) => row?.pricePerMonth,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>$ {row.pricePerMonth}</span>
    },
    {
      name: 'Price Per Year',
      selector: (row) => row?.pricePerYear,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>$ {row.pricePerYear}</span>
    },
    {
      name: 'Trial',
      selector: (row) => row?.trialTime,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.trialTime} days</span>
    },
    {
      name: 'Description',
      selector: (row) => row?.description,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.description}</span>
    },
    
    {
      name: 'Created At',
      selector: (row) => row?.createdAt,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{convertDate(row?.createdAt)}</span>
    }
  ];
  return (
    <div className="w-100">
      <div className="m-1 d-flex justify-content-end">
        <Button color="primary" onClick={toggleAddPlan}>
          <Plus size={14} /> Add new Plan
        </Button>
      </div>
      <h5>Personal Plans</h5>
      <Row>
        {store?.plans &&
          store?.plans
            .filter((x) => x.type === 'personal')
            .map((plan, idx) => {
              const Icon = Icons[plan.icon]
              return (
                <Col md="4" key={idx}>
                  <Card className="h-100">
                    <CardBody>
                      <div className='d-flex justify-content-between'>
                      <div className="d-flex justify-content-start">
                        <Icon  className="text-primary me-1" />
                        <h5 className="my-auto text-capitalize">{plan.name}</h5>
                      </div>
                      <div>
                        {plan.isDefault === true ? <Badge color='light-primary'>Default & Free</Badge>:<Badge color='light-primary'>{plan.pricePerMonth} $/Month</Badge>}
                      </div>
                      </div>
                      <p>{plan.description}</p>
                      <ul>
                      {plan.benefits.map((b, i) => {
                        return <li key={i}>{b}</li>;
                      })}
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
      </Row>
      <div className="mt-1">
        <h5>Organizations Plans</h5>

        <Card>
          <div className="" style={{ minHeight: '80vh' }}>
            {store && (
              <DataTable
                noHeader
                pagination
                responsive
                paginationServer
                columns={columns}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                //conditionalRowStyles={conditionalRowStyles}
                data={store?.plans.filter((x) => x.type === 'business')}
                //onRowClicked={handleDetails}
              />
            )}
          </div>
        </Card>
      </div>
      {store && <NewPlanModal open={openAddPlan} toggle={toggleAddPlan} dispatch={dispatch} store={store} />}
    </div>
  );
}
