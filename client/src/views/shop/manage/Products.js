// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
// import AddProductModal from './add/AddProductModal'

import ProductSidebar from '../shop/products/ProductSidebar';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { useHistory } from 'react-router-dom';

const Products = ({ dispatch, store }) => {
  // ** States
  
  const [productSidebarOpen, setProductSidebarOpen] = useState(false);
  const toggleProductHandler = () => {
    setProductSidebarOpen(!productSidebarOpen);
  };

  const history = useHistory();
  
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

  const tabledata = [
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    }
  ];

  const handleViewDetails = (row)=>{
    history.push('/ecommerce/product-detail/' + row._id)
  }

  const columnsdata = [
    // {
    //   name: 'SKU',
    //   sortable: true,
    //   // width: '130px',
    //   sortField: 'position',
    //   selector: (row) => row.sku
    // },
    {
        name: 'Product',
        sortable: true,
         width: '100px',
        //sortField: 'name',

        selector: (row) => row.product_url,
        cell:(row)=>(<img src={row.product_url} className="w-100"/>)
      },
    {
      name: 'Product Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.product_name
    },
    {
      name: 'Brand',
      sortable: true,
      // width: '130px',
      sortField: 'brand',
      selector: (row) => row.product_brand
    },
    // {
    //   name: 'Sub-Category',
    //   sortable: true,
    //   // width: '130px',
    //   sortField: 'subCategory',
    //   selector: (row) => row.subCategory
    // },
    {
      name: 'Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row.product_price
    },
    {
      name: 'Rating',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.product_rating
    },
    {
      name: 'Published',
      sortable: true,
      // width: '130px',
      sortField: 'published',
      selector: (row) => row.permission,
      cell: (row) => (
        <div className="form-check form-switch">
          <Input type="switch" name="published" checked={row.permission==='public'?true:false}  />
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
    <Fragment>
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
                onClick={toggleProductHandler}
              >
                Add Product
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={store?.products} pagination />
        </Col>
      </Card>
      <ProductSidebar
        dispatch={dispatch}
        productSidebarOpen={productSidebarOpen}
        toggleProductHandler={toggleProductHandler}
      />
    </Fragment>
  );
};

export default Products;
