// ** React Imports
import { Fragment } from 'react';

// ** Product components
import MembershipCards from './MembershipCards';
import MembershipsHeader from './MembershipsHeader';
import MembershipsSearchbar from './MembershipsSearchbar';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MembershipsPage = (props) => {
  // ** Props
  const {
    store,
    type,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    setSidebarOpen,
    membershipSidebarOpen,
    getMembership,
    getMemberships,
    getMembershipWishlistItems,
    getCartItems,
    addMembershipToWishlist,
    setActiveView,
    deleteCartItem,
    setMembershipSidebarOpen,
    deleteMembershipWishlist
  } = props;

  let { params } = store;

  if (params === undefined || params === null) {
    params = {
      page: -1,
      perPage: 10,
      q: '',
      sortBy: ''
    };
  }

  // ** Handles pagination
  const handlePageChange = (val) => {
    if (val === 'next') {
      dispatch(getMemberships({ ...params, page: params.page + 1 }));
    } else if (val === 'prev') {
      dispatch(getMemberships({ ...params, page: params.page - 1 }));
    } else {
      dispatch(getMemberships({ ...params, page: val }));
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const pagelimit = 10;
    let start_page = 0;
    let end_page = 0;
    let total = parseInt(store.totalMemberships / params.perPage) + 1;
    if (store.totalMemberships < params.perPage) {
      start_page = 0;
      end_page = total;
    } else {
      start_page = parseInt(params.page / pagelimit) * pagelimit;
      if (total < parseInt(params.page / pagelimit + 1) * pagelimit) {
        end_page = total;
      } else {
        end_page = parseInt(params.page / pagelimit + 1) * pagelimit;
      }
    }

    let pages = [];
    for (let i = start_page; i < end_page; i++) {
      pages.push(i);
    }
    return pages.map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={params.page === item}
          onClick={() => handlePageChange(item)}
        >
          <PaginationLink href="/" onClick={(e) => e.preventDefault()}>
            {item + 1}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // ** handle next page click
  const handleNext = () => {
    if (params.page !== parseInt(store.totalMemberships / params.perPage)) {
      handlePageChange('next');
    }
  };
  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <MembershipsHeader
          params={params}
          totalMemberships={store.totalMemberships}
          dispatch={dispatch}
          activeView={activeView}
          getMemberships={getMemberships}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <MembershipsSearchbar
          dispatch={dispatch}
          setMembershipSidebarOpen={setMembershipSidebarOpen}
          getMemberships={getMemberships}
          params={params}
        />
        {store.memberships || store.wishmembershiplist ? (
          <Fragment>
            <MembershipCards
              store={store}
              type={type}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              wishmembershiplist={store.wishmembershiplist}
              getMembership={getMembership}
              getMembershipWishlistItems={getMembershipWishlistItems}
              getCartItems={getCartItems}
              addMembershipToWishlist={addMembershipToWishlist}
              deleteCartItem={deleteCartItem}
              deleteMembershipWishlist={deleteMembershipWishlist}
            />
            <Pagination
              count={10}
              className="d-flex justify-content-center ecommerce-shop-pagination mt-2"
            >
              <PaginationItem
                disabled={params.page === 1}
                className="prev-item"
                onClick={() => (params.page !== 0 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={params.page === Number(store.totalProducts) / store.products.length}
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipsPage;
