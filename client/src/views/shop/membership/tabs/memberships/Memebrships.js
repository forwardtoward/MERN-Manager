import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import MembershipSidebar from '../../../shop/memberships/MembershipSidebar';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { Edit, FileText, Trash2 } from 'react-feather';
import { useHistory } from 'react-router-dom';

export default function Memebrships({dispatch,store}) {
    const [membershipSidebarOpen, setMembershipSidebarOpen] = useState(false);

    const history = useHistory();

    const toggleMembershipHandler = () => {
        setMembershipSidebarOpen(!membershipSidebarOpen);
      };

      const handleViewDetails =(row)=>{
        history.push('')
      }

      const [currentCategory, setCurrentCategory] = useState({
        value: '',
        label: 'Filter By Category'
      });
      const [currentPrice, setCurrentPrice] = useState({
        value: '',
        label: 'Filter By Price',
        number: 0
      });
      const categoryOptions = [
        { value: '', label: 'Filter By Category' },
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' }
      ];
    
      const priceOptions = [
        { value: '', label: 'Filter By Price', number: 0 },
        { value: 'h2l', label: 'High to Low', number: 1 },
        { value: 'l2h', label: 'Low to Hign', number: 2 }
      ];
      const columnsdata = [
        // {
        //   name: 'SKU',
        //   sortable: true,
        //   // width: '130px',
        //   sortField: 'position',
        //   selector: (row) => row.sku
        // },
        // {
        //     name: 'Product',
        //     sortable: true,
        //      width: '100px',
        //     //sortField: 'name',
    
        //     selector: (row) => row.product_url,
        //     cell:(row)=>(<img src={row.product_url} className="w-100"/>)
        //   },
        {
          name: 'Name',
          sortable: true,
          // width: '130px',
          sortField: 'name',
          selector: (row) => row.membership_name
        },
        {
          name: 'Type',
          sortable: true,
          // width: '130px',
          sortField: 'brand',
          selector: (row) => row.membership_type
        },
        // {
        //   name: 'Sub-Category',
        //   sortable: true,
        //   // width: '130px',
        //   sortField: 'subCategory',
        //   selector: (row) => row.subCategory
        // },
        {
          name: 'Total Price',
          sortable: true,
          // width: '130px',
          sortField: 'price',
          selector: (row) => row.total_price
        },
        {
          name: 'Balance',
          sortable: true,
          // width: '130px',
          sortField: 'stock',
          selector: (row) => row.balance
        },
        {
            name: 'Down Payment',
            sortable: true,
            // width: '130px',
            sortField: 'stock',
            selector: (row) => row.down_payment
          },
          {
            name: 'Duration',
            sortable: true,
            // width: '130px',
            sortField: 'stock',
            selector: (row) => row.duration_time,
            cell:(row)=>(<span>{row.duration_time} {row.duration_type}</span>)
          },
          {
            name: 'Payment Type',
            sortable: true,
            // width: '130px',
            sortField: 'stock',
            selector: (row) => row.payment_type
          },
          
        {
          name: 'Published',
          sortable: true,
          // width: '130px',
          sortField: 'published',
          selector: (row) => row.permission,
          cell: (row) => (
            <div className="form-check form-switch">
              <Input type="switch" name="published" checked={row.permission==='public'?true:false} />
            </div>
          )
        },
        {
          name: 'Actions',
          // minWidth: '100px',
          cell: (row) => (
            <div className="column-action">
              <FileText size={20} className="me-1 " style={{cursor:"pointer"}} onClick={()=>handleViewDetails(row)}/>
              <Trash2 size={20} className="me-1 text-danger" style={{cursor:"pointer"}}  />
              <Edit size={20} style={{cursor:"pointer"}} className=""/>
            </div>
          )
        }
      ];
      
  return (
    <>
    <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search Product ..."
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                value={currentCategory}
                onChange={(data) => {
                  setCurrentCategory(data);
                }}
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={priceOptions}
                value={currentPrice}
                onChange={(data) => {
                  setCurrentPrice(data);
                }}
              />
            </Col>
            <Col md="3" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={toggleMembershipHandler}
              >
                Add Membership
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={store?.memberships} pagination />
        </Col>
      </Card>
    <MembershipSidebar
        dispatch={dispatch}
        membershipSidebarOpen={membershipSidebarOpen}
        toggleMembershipHandler={toggleMembershipHandler}
      />
    </>
  )
}
