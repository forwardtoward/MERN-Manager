// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';
import { customInterIceptors, publicInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();
const PUBLIC_API = publicInterIceptors();

export const getUsers = createAsyncThunk(
  'appEcommerce/getUsers',
  async () => {
    let url = `/user/get_users`;
    const response = await API.get(url);
    return response.data;
});

export const getMemberships = createAsyncThunk(
  'appEcommerce/getMemberships',
  async (params) => {
    let url = `/membership/membership_list`;
    const response = await API.get(url, { params });
    return {
      params,
      data: response.data.data,
      total: response.data.total
    };
});

export const getPublicMemberships = createAsyncThunk(
  'appEcommerce/getPublicMemberships',
  async (params) => {
    let url = `/membership/public_memberships`;
    const response = await PUBLIC_API.get(url, { params });
    return {
      params,
      data: response.data.data,
      total: response.data.total
    };
  }
);

export const getMembership = createAsyncThunk(
  'appEcommerce/getMembership',
  async (slug) => {
    let url = `/membership/info_membership/${slug}`;
    const response = await API.get(url);
    return response.data;
});

export const getPublicMembership = createAsyncThunk(
  'appEcommerce/getPublicMembership',
  async (slug) => {
    let url = `/membership/public_membership/${slug}`;
    const response = await PUBLIC_API.get(url);
    return response.data;
});

export const addMembershipToWishlist = createAsyncThunk(
  'appEcommerce/addMembershipToWishlist',
  async (params, { dispatch, getState }) => {
    let url = `/membership/add_wishlist/${params.id}`;
    const response = await API.post(url, { id: params.id });
    dispatch(getMemberships(getState().shop.params));
    return response;
});

export const deleteMembershipWishlist = createAsyncThunk(
  'appEcommerce/deleteMembershipWishlist',
  async (params, { dispatch, getState }) => {
    let url = `/membership/remove_wishlist/${params.id}`;
    const response = await API.post(url, {});
    dispatch(getMemberships(getState().shop.params));
    return response;
});

export const addMembershipToWishlistItem = createAsyncThunk(
  'appEcommerce/addMembershipToWishlist',
  async (params, { dispatch }) => {
    let url = `/membership/add_wishlist/${params.id}`;
    const response = await API.post(url, { id: params.id });
    dispatch(getMembership(params.id));
    return response;
});

export const deleteMembershipWishlistItem = createAsyncThunk(
  'appEcommerce/deleteMembershipWishlist',
  async (params, { dispatch }) => {
    let url = `/membership/remove_wishlist/${params.id}`;
    const response = await API.post(url, {});
    dispatch(getMembership(params.id));
    return response;
});

export const addMembership = createAsyncThunk(
  'appEcommerce/addMembership',
  async (params, { dispatch, getState }) => {
    let url = `/membership`;
    const response = await API.post(url, params);
    await dispatch(getMemberships(getState().shop.params));
    return response.data;
});

export const addMembershipToCart = createAsyncThunk(
  'appEcommerce/addMembershipToCart',
  async (id, { dispatch }) => {
    let url = `/cart/add_membership`;
    const response = await API.post(url, {
      membershipId: id
    });
    dispatch(getCartItems());
    // await dispatch(getProducts(getState().ecommerce.params))
    return response.data;
});

export const deleteMembershipFromCart = createAsyncThunk(
  'appEcommerce/deleteMembershipFromCart',
  async (id, { dispatch }) => {
    let url = `/cart/remove_membership/${id}`;
    const response = await API.post(url, {});
    dispatch(getCartItems());
    // await dispatch(getProducts(getState().ecommerce.params))
    return response.data;
});

export const getMembershipWishlistItems = createAsyncThunk(
  'appEcommerce/getMembershipWishlistItems',
  async () => {
    let url = `/fmembership/get_memberships`;
    const response = await API.get(url);
    return response.data;
});

export const updateMembership = createAsyncThunk(
  'appEcommerce/checkoutMemberships',
  async (params) => {
    let url = `/checkout/update-membership`;
    const response = await API.post(url, params);
    return response;
});

export const buyMembership = createAsyncThunk(
  'appEcommerce/buyMemberships',
  async (params) => {
    let url = `/checkout/buy-membership`;
    const response = await API.post(url, params);
    return response;
});

export const checkoutPublicMembership = createAsyncThunk(
  'appEcommerce/checkoutPublicMemberships',
  async (params) => {
    let url = `/checkout/public-membership`;
    const response = await PUBLIC_API.post(url, params);
    return response;
});

export const getClientContacts = createAsyncThunk(
  'appEcommerce/getClientContacts',
  async (params) => {
    let url = '/client-contact/total-clients';
    const response = await API.get(url, params);
    return response;
});

export const checkoutProduct = createAsyncThunk(
  'appEcommerce/checkoutProducts', 
  async (params) => {
    let url = `/checkout/product`;
    const response = await API.post(url, params);
    return response;
});

export const buyProduct = createAsyncThunk(
  'appEcommerce/buyProduct',
  async (params) => {
    let url = `/checkout/buy-product`;
    const response = await API.post(url, params);
    return response;
});

export const checkoutPublicProduct = createAsyncThunk(
  'appEcommerce/checkoutPublicProducts',
  async (params) => {
    let url = `/checkout/public-product`;
    const response = await PUBLIC_API.post(url, params);
    return response;
  }
);

export const addPaymentMethodAction = createAsyncThunk(
  'appEcommerce/addPaymentMethod',
  async (params) => {
    let url = `/client-contact/add/payment-method`;
    const response = await API.post(url, params);
    return response.data;
  }
);

export const getProducts = createAsyncThunk(
  'appEcommerce/getProducts',
  async (params) => {
    let url = `/product/product_list`;
    const response = await API.get(url, { params });
    return { params, data: response.data.data, total: response.data.total };
});

export const getProduct = createAsyncThunk(
  'appEcommerce/getProduct', async (slug) => {
    let url = `/product/info_product/${slug}`;
    const response = await API.get(url);
    return response.data;
});

export const getPublicProducts = createAsyncThunk(
  'appEcommerce/getPublicProducts',
  async (params) => {
    let url = `/product/public_products`;
    const response = await PUBLIC_API.get(url, { params });
    const { data, total } = response.data;
    return { params, data, total };
});
export const getPublicProduct = createAsyncThunk(
  'appEcommerce/getPublicProduct', 
  async (slug) => {
    let url = `/product/public_product/${slug}`;
    const response = await PUBLIC_API.get(url);
    return response.data;
});

export const uploadProductPhoto = createAsyncThunk(
  'appEcommerce/uploadProductPhoto',
  async (data) => {
    let url = '/product/upload_photo';
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    for (let value of data.values()) {
    }
    const response = await API.post(url, data, config);
  }
);

export const addToCart = createAsyncThunk(
  'appEcommerce/addToCart',
  async (id, { dispatch }) => {
    let url = '/cart/add_product';
    const response = await API.post(url, {
      productId: id
    });
    await dispatch(getCartItems());
    return response.data;
});

export const getWishlistItems = createAsyncThunk(
  'appEcommerce/getWishlistItems',
  async () => {
    const response = await axios.get('/apps/ecommerce/wishlist');
    return response.data;
});

export const deleteWishlistItem = createAsyncThunk(
  'appEcommerce/deleteWishlistItem',
  async (id, { dispatch }) => {
    const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`);
    dispatch(getWishlistItems());
    return response.data;
  }
);

export const getCartItems = createAsyncThunk(
  'appEcommerce/getCartItems',
  async () => {
    let url = '/cart/get_items';
    const response = await API.get(url);
    return response.data;
});

export const updateProductAmount = createAsyncThunk(
  'appEcommerce/updateProductAmount',
  async (params, { dispatch }) => {
    let url = '/cart/update_amount';
    const response = await API.post(url, params);
    await dispatch(getCartItems());
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  'appEcommerce/addProduct',
  async (params, { dispatch, getState }) => {
    let url = `/product/add_product`;
    const response = await API.post(url, params);
    await dispatch(getProducts(getState().shop.params));
    return response.data;
  }
);

export const handleWishlistItem = createAsyncThunk(
  'appEcommerce/handleWishlistItem',
  async (params, { dispatch, getState }) => {
    let url = `/product/update_by_Id/${params.id}`;
    const response = await API.put(url, { isfavorite: params.isfavorite });
    dispatch(getProducts(getState().shop.params));
    return response;
  }
);

export const addToWishlist = createAsyncThunk(
  'appEcommerce/addToWishlist', async (id) => {
    await axios.post('/apps/ecommerce/wishlist', { productId: id });
    return id;
});

export const deleteCartItem = createAsyncThunk(
  'appEcommerce/deleteCartItem',
  async (id, { dispatch }) => {
    let url = '/cart/delete_product';
    const response = await API.post(url, { productId: id });
    await dispatch(getCartItems());
    return response.data;
  }
);

export const createStripeCustomer = createAsyncThunk(
  'appEcommerce/createStripeCustomer', 
  async (params) => {
    const { userId, payload } = params;  
    let url = `/payment/user/${userId}/stripe/customer`;
    const response = await API.post(url, payload);
    return response.data;
  }
);

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    memberships: [],
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {},
    totalMemberships: 0,
    users: [],
    membershipDetail: {},
    checkout: {},
  },
  reducers: {
    checkoutSetTotalPrice: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        totalPrice: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetClient: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        client: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetClientSecret: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        clientSecret: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetProducts: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        products: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetProductId: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        productId: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetContact: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        contact: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetMembership: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        membership: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutSetBuyMembership: (state, action) => {
      const { checkout } = state
      const data = {
        ...checkout,
        buy_membership: action.payload,
      }

      return {
        ...state,
        checkout: data,
      }
    },
    checkoutClear: (state) => {
      return {
        ...state,
        checkout: {},
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          users: data
        };
      })
      .addCase(getMemberships.fulfilled, (state, action) => {
        const { params, data, total } = action.payload;

        return {
          ...state,
          params: params ? params : {},
          memberships: data,
          totalMemberships: total
        };
      })
      .addCase(getMembership.fulfilled, (state, action) => {
        state.membershipDetail = action.payload.data;
      })
      .addCase(getPublicMembership.fulfilled, (state, action) => {
        state.membershipDetail = action.payload.data;
      })
      .addCase(getMembershipWishlistItems.fulfilled, (state, action) => {
        state.wishmembershiplist = action.payload.data.membership_list;
      })
      .addCase(getClientContacts.fulfilled, (state, action) => {
        state.params = action.payload.params;
        state.clientContacts = action.payload.data;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params;
        state.products = action.payload.data;
        state.totalProducts = action.payload.total;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.cart = action.payload.data.product_list;
        }
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.data;
      })
      .addCase(getPublicProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.data;
      })
      .addCase(getPublicProducts.fulfilled, (state, action) => {
        const { params, data, total } = action.payload;
        return {
          ...state,
          params: params ? params : {},
          products: data,
          totalProducts: total
        };
      })
      .addCase(getPublicMemberships.fulfilled, (state, action) => {
        const { params, data, total } = action.payload;
        return {
          ...state,
          params: params ? params : {},
          memberships: data,
          totalMemberships: total
        };
      })
      .addCase(createStripeCustomer.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success && data) {
          return {
            ...state,
            stripeCustomer: data,
          };
        } else {
          return state;
        }
      })
      ;
  }
});

export const {
  checkoutSetTotalPrice,
  checkoutSetClient,
  checkoutSetClientSecret,
  checkoutSetProducts,
  checkoutSetProductId,
  checkoutSetContact,
  checkoutSetMembership,
  checkoutSetBuyMembership,
  checkoutClear
} = appEcommerceSlice.actions

export default appEcommerceSlice.reducer;
