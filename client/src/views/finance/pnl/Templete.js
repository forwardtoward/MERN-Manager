import React, { useState } from 'react';
import { ChevronDown, Download } from 'react-feather';
import { BiChevronDown } from 'react-icons/bi';
import {
  MdDownload,
  MdMailOutline,
  MdOutlineDownloadForOffline,
  MdOutlineGetApp,
  MdPrint
} from 'react-icons/md';
import Select from 'react-select';
import '../../../assets/scss/style.css';

import data from './fakejosn.json';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from 'reactstrap';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 120, // set the width to 200px
    height: '30px',
    margin: '5px'
  })
};

function Templete() {
  const [currentMonth, setCurrentMonth] = useState('Jan');
  const [currentYear, setCurrentYear] = useState('Jab');

  const monthOptions = [
    { value: 'Jan', label: 'January' },
    { value: 'Feb', label: 'February' },
    { value: 'Mar', label: 'March' },
    { value: 'Apr', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'June' },
    { value: 'Jul', label: 'July' },
    { value: 'Aug', label: 'August' },
    { value: 'Sep', label: 'September' },
    { value: 'Oct', label: 'October' },
    { value: 'Nov', label: 'November' },
    { value: 'Dec', label: 'December' }
  ];

  // Define options for year dropdown
  const yearOptions = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ];

  return (
    <Row>
      <Col md="12" xs="12">
        <Card>
          <CardHeader>
            <div className="pl-title">
              <h4>P&amp;L Statements</h4>
              <span className="pl-subtitle">Profit &amp; Loss by Period</span>
            </div>
            <div className="pl-subtitle-area">
              <div>
                <span>
                  <Download
                    style={{
                      fontSize: '2em',
                      color: '#555555',
                      marginRight: '20px',
                      cursor: 'pointer'
                    }}
                  />
                </span>

                <a>
                  <MdMailOutline
                    style={{
                      fontSize: '2em',
                      color: '#0184FF',
                      marginRight: '20px',
                      cursor: 'pointer'
                    }}
                  />
                </a>

                <span>
                  <MdPrint
                    style={{
                      fontSize: '2em',
                      color: '#403F90',
                      cursor: 'pointer'
                    }}
                  />
                </span>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="">
              <div>
                <Row>
                  <Col md={3}></Col>
                  <Col md={3} className="mb-1">
                    <h4 className="d-flex justify-content-center">Fabruary 2023</h4>
                    <div className="d-flex justify-content-center">
                      <Select styles={customStyles} options={monthOptions} />
                      <Select styles={customStyles} options={yearOptions} />
                    </div>
                  </Col>
                  <Col md={3}>
                    <h4 className="d-flex justify-content-center">March 2023</h4>
                    <div className="d-flex justify-content-center">
                      <Select styles={customStyles} options={monthOptions} />
                      <Select styles={customStyles} options={yearOptions} />
                    </div>
                  </Col>
                  <Col md={3}>
                    <h4 className="d-flex justify-content-around ">YTD</h4>
                    <div className="d-flex justify-content-center">
                      <Select styles={customStyles} options={yearOptions} />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* PL Table Header Starts Here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '14px',
                  paddingRight: '14px'
                }}
              >
                <Row
                  className="d-flex justify-content-between align-items-center border"
                  style={{
                    height: '40px',
                    background: '#e7e3e3',
                    marginLeft: '0 !important',
                    marginRight: '0 !important'
                  }}
                >
                  <Col md={3} style={{ marginTop: '10px' }}>
                    <h4> Total Income</h4>
                  </Col>
                  <Col md={3} className="text-center" style={{ marginTop: '10px' }}>
                    <h4 style={{ color: '#0eb73e' }}>${data.firstMonthTotalIncome}</h4>
                  </Col>
                  <Col md={3} className="text-center" style={{ marginTop: '10px' }}>
                    <h4 style={{ color: '#0eb73e' }}>${data.secondMonthTotalIncome}</h4>
                  </Col>
                  <Col md={3} className="text-center" style={{ marginTop: '10px' }}>
                    <h4 style={{ color: '#0eb73e' }}>${data.yearlyTotalIncome}</h4>
                  </Col>
                </Row>
              </div>
              {/* PL Category Ends here */}

              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h5>Membership Sales</h5>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <div>Name</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* PL Category Total Starts here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h6>Total Membership Sales</h6>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.firstMonthTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.secondMonthTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.yearlyTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              {/* PL Category Total Ends here */}

              {/* Category, Sub Category & Total Set Starts Here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h5>Product Sales</h5>
                    <h6>Birthday</h6>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <div>Name</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Events */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h6>Events</h6>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                {data.data.map((x) => (
                  <Row>
                    <Col md={3}>
                      <div key={x.membership}>{x.membership}</div>
                    </Col>
                    <Col md={3}>
                      <Row>
                        <Col md="8">${parseFloat(x.firstMonthIncome).toFixed(2)}</Col>
                        <Col md="4">{x.percentage1 === 'NaN' ? 0 : x.percentage1}%</Col>
                      </Row>
                    </Col>
                    <Col md={3}>
                      <Row>
                        <Col md="8">${parseFloat(x.secondMonthIncome).toFixed(2)}</Col>
                        <Col md="4">{x.percentage2 === 'NaN' ? 0 : x.percentage2}%</Col>
                      </Row>
                    </Col>
                    <Col md={3}>
                      <Row>
                        <Col md="8">${parseFloat(x.incomeInYear).toFixed(2)}</Col>
                        <Col md="4">{x.percentage3 === 'NaN' ? 0 : x.percentage3}%</Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>

              {/* Tests */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h6>Test</h6>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <div>Name</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">${'0'}</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Category, Sub Category & Total Set Start here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h6>Total Product Sales</h6>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.firstMonthTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.secondMonthTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${parseFloat(data.yearlyTotal).toFixed(2)}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Category, Sub Category & Total Set Ends here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h5>Recurring Income</h5>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <div>Recurring Inhouse pay - CA CH</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <div>Recurring pay - CC</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="8">$0.00</Col>
                      <Col md="4">0%</Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Category, Sub Category & Total Set Starts Here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row className="mb-1">
                  <Col md={3}>
                    <h5>Refunds</h5>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <div>Membership Refunds</div>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${'0'}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${'0'}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">${'0'}</Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <h6>Total Refund</h6>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">
                        <h6>${'0'}</h6>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">
                        <h6>${'0'}</h6>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md="10">
                        <h6>${'0'}</h6>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Category, Sub Category & Total Set Ends here */}

              {/* PL Table Header Starts Here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }}
              >
                <Row
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    height: '40px',
                    background: '#e7e3e3',
                    marginRight: '0 !important',
                    marginLeft: '0 !important'
                  }}
                >
                  <Col md={3} style={{ marginTop: '10px' }}>
                    <h4>Total Expense</h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>
                      ${data.firstMonthTotalExpense}
                    </h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>
                      {' '}
                      ${data.secondMonthTotalExpense}
                    </h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>
                      ${data.yearlyTotalExpense}
                    </h4>
                  </Col>
                </Row>
              </div>
              {/* PL Table Header Ends here */}

              {/* Category, Sub Category & Total Set Starts Here */}
              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3} className="mt-1">
                    <h5>Expense</h5>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                </Row>
              </div>

              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '5px'
                }}
              >
                <Row>
                  <Col md={3}>
                    <h6>Income - Expense</h6>
                  </Col>
                  <Col md={3}>
                    <span className="pl-income-total">${data.totalm1Income} </span> -{' '}
                    <span className="pl-expense-total"> ${data.firstMonthTotalExpense}</span>
                  </Col>
                  <Col md={3}>
                    <span className="pl-income-total">${data.totalm2Income} </span> -{' '}
                    <span className="pl-expense-total"> ${data.secondMonthTotalExpense}</span>
                  </Col>
                  <Col md={3}>
                    <span className="pl-income-total">${data.totalYearly}</span> -{' '}
                    <span className="pl-expense-total">${data.yearlyTotalExpense}</span>
                  </Col>
                </Row>
              </div>

              <div
                style={{
                  borderRight: '1px solid lightgray',
                  borderLeft: '1px solid lightgray',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }}
              >
                <Row
                  className="d-flex justify-content-between align-items-center border"
                  style={{ height: '40px', background: '#e7e3e3' }}
                >
                  <Col md={3} style={{ marginTop: '10px' }}>
                    <h4>Net Income</h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                      {data.totalm1Income - data.firstMonthTotalExpense < 0 && '-'}$
                      {data.totalm1Income - data.firstMonthTotalExpense < 0
                        ? (data.totalm1Income - data.firstMonthTotalExpense) * -1
                        : data.totalm1Income - data.firstMonthTotalExpense}
                    </h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                      {data.totalm2Income - data.secondMonthTotalExpense < 0 && '-'}$
                      {data.totalm2Income - data.secondMonthTotalExpense < 0
                        ? (data.totalm2Income - data.secondMonthTotalExpense) * -1
                        : data.totalm2Income - data.secondMonthTotalExpense}
                    </h4>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                      {data.totalYearly - data.yearlyTotalExpense < 0 && '-'}$
                      {data.totalYearly - data.yearlyTotalExpense < 0
                        ? (data.totalYearly - data.yearlyTotalExpense) * -1
                        : data.totalYearly - data.yearlyTotalExpense}
                    </h4>
                  </Col>
                </Row>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Templete;
