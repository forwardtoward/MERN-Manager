import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ShopRoutes = [
  // Shop
  {
    path: '/ecommerce/shop',
    className: 'ecommerce-application',
    // component: lazy(() => import('../../views/shop/shop'))
    //component: lazy(() => import('../../views/shop/manage'))
    component: lazy(() => import('../../views/shop'))
  },
  {
    path: '/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/wishlist'))
  },
  {
    path: '/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to="/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
  },
  {
    path: '/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/detail/product')),
    meta: {
      navLink: '/ecommerce/product-detail'
    }
  },
  {
    path: '/ecommerce/checkout/product/:productId',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/product'))
  },
  {
    path: '/ecommerce/checkout/product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/product'))
  },
  {
    path: '/ecommerce/checkout/membership',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/membership'))
  },
  // Manage Shop
  {
    path: '/ecommerce/membership-detail/:membership',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/detail/membership'))
  },
  {
    path: '/ecommerce/checkout/membership/:membershipId',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/membership'))
  },
  // {
  //   path: '/manage-shop',
  //   exact: true,
  //   component: lazy(() => import('../../views/shop/manage'))
  // },
  // Public Shop Route
  {
    path: '/shop/:shopPath',
    component: lazy(() => import('../../views/shop/public')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  {
    path: '/ecommerce/checkout/public-product/:productId',
    component: lazy(() => import('../../views/shop/publicCheckout/product/')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/ecommerce/checkout/public-membership/:membershipId',
    component: lazy(() => import('../../views/shop/publicCheckout/membership/')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  // Public Shop Route
  {
    path: '/ecommerce/shop/view/:id',
    exact: true,
    component: lazy(() => import('../../views/shop/public')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  {
    path: '/ecommerce/shop/public/product/:productId',
    component: lazy(() => import('../../views/shop/public/product/detail')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  }
];

export default ShopRoutes;
