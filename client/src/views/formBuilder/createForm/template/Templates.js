import React, { Fragment, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { getUserData } from '../../../../auth/utils';

export default function Templates({ form, setForm, store, active }) {
  const [tableData, setTableData] = useState([]);
  
  const handleSelectTemplate = (e) => {
    if(e.target.value==='1'){
      setForm({ ...form, clonedFrom: e.target.value });
    }
    else{
      setForm({ ...form, clonedFrom: e.target.value, formData:tableData.find(x=>x._id===e.target.value).formData });
    }
    
  };

  useEffect(() => {
    if (store?.templates) {
      switch (active) {
        case '1':
          setTableData(store?.templates)
          break;
        case '2':
          setTableData(store?.templates?.filter((x)=>x?.organizationId!==null && x?.organizationId!==undefined))
          break;
        case '3':
          setTableData(store?.templates?.filter((x)=>x?.userId===getUserData().userId))
          break;

        default:
          setTableData(store?.templates)
          break;
      }
    }
  }, [store, active]);
  
  return (
    <Fragment>
      <div className="p-1">
        <Row>
          {tableData && tableData.map((x, idx) => {
              return (<Col sm="6" md="4" key={idx}>
              <Card>
                <CardBody className="text-center text-primary">
                  <div>
                   
                    <h5 className="">{x.name}</h5>
                    <iframe
                      scrolling="no"
                      className="shadow-sm"
                      //style="position: absolute; height: 100%; border: none"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',

                        border: 'none',
                        height: '100%',
                        borderRadius: 10
                      }}
                      src={
                        x.formData[0]?.html !== ''
                          ? `/form-funnel/${x._id}&path=${x.formData[0].path}`
                          : `/notfound.html`
                      }
                    />
                    <Button color="outline-primary" value={x._id} onClick={handleSelectTemplate}>
                      Use as Template
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>)
            })
         
            }
          <Col sm="6" md="4">
            <Card>
              <CardBody className="text-center text-primary">
                <div>
                  <Plus size={35} />
                  <h5 className="py-2">New Blank</h5>
                  <Button color="outline-primary" value="1" onClick={handleSelectTemplate}>
                    Select new blank
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
