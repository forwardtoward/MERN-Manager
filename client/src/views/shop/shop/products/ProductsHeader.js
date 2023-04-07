// ** Third Party Components
import classnames from 'classnames';

// ** Icons import
import { Menu, Grid, List, Check, Copy } from 'react-feather';

// ** React Imports
import { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';

import { useSelector } from 'react-redux';

const ProductsHeader = (props) => {
  // ** Props
  const {
    activeView,
    setActiveView,
    dispatch,
    getProducts,
    params,
    totalProducts,
    setSidebarOpen
  } = props;

  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
  };

  // ** Store Vars
  const shopStore = useSelector((state) => state.shopDetails);

  const url = new URL(location.href);
  const publicUrl = url.origin + '/shop/' + shopStore.shop.shopPath;

  const [copied, setState] = useState(false);

  const onCopy = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button
                className="navbar-toggler shop-sidebar-toggler"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
              <span className="search-results">{totalProducts} Results Found</span>
            </div>
            <div className="view-options d-flex">
              <div className="me-1">
                <Button className="btn-icon view-btn grid-view-btn" color="primary" outline>
                  <CopyToClipboard onCopy={onCopy} text={publicUrl}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </CopyToClipboard>
                </Button>
              </div>
              <UncontrolledButtonDropdown className="dropdown-sort">
                <DropdownToggle className="text-capitalize me-1" color="primary" outline caret>
                  {sortToggleText[params.sortBy]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...params,
                          sortBy: 'featured'
                        })
                      )
                    }
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...params,
                          sortBy: 'price-asc'
                        })
                      )
                    }
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...params,
                          sortBy: 'price-desc'
                        })
                      )
                    }
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <ButtonGroup>
                <Button
                  tag="label"
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color="primary"
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag="label"
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color="primary"
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
