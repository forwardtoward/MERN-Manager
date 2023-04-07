// ** Icons Imports
import { Search } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap';

const ProductsSearchbar = (props) => {
  // ** Props
  const { dispatch, getProducts, params, setProductSidebarOpen } = props;
  const addProduct = () => {
    setProductSidebarOpen(true);
  };

  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1 align-items-center">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="Search Product"
              onChange={(e) => dispatch(getProducts({ ...params, q: e.target.value }))}
            />
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
        {/* <Col sm="2">
          <button className="btn btn-primary" onClick={addProduct}>
            Add Product
          </button>
        </Col> */}
      </Row>
    </div>
  );
};

export default ProductsSearchbar;
