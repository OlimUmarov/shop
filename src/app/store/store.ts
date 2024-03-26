import { createStore, ActionContext  } from 'vuex';
import { $api } from '../../helpers/api';
import { ProductsType, ProductType } from '../types/products';
import { AxiosResponse } from 'axios';

export interface State {
  isLoading: boolean,
  products: ProductsType | null,
  product: ProductType | null,
  categories: ProductType | null,
  notification: {
    title: string,
    message: string
  }
}

export const store = createStore<State>({
  state: {
    isLoading: true,
    products: null,
    product: null,
    categories: null,
    notification: {
      title: 'Success',
      message: ''
    }
  },
  mutations: {
    SET_IS_LOADING(state: State, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_PRODUCTS(state: State, products: ProductsType) {
      state.products = products;
    },
    SET_PRODUCT(state: State, product: ProductType) {
      state.product = product;
    },

    SET_CATEGORIES(state: State, categories: ProductType) {
      state.categories = categories;
    },

    SET_NOTIFICATION(state: State, notification: { title: string, message: string }) {
      state.notification = notification;
    },
  },
  actions: {
    async getProducts (context: ActionContext<State, any>, params: any) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.get<ProductsType>('/products', { params: params });
        context.commit('SET_PRODUCTS', data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async getProduct (context: ActionContext<State, any>, id: number) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.get<ProductType>(`/products/${id}`);
        context.commit('SET_PRODUCT', data);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async getCategories (context: ActionContext<State, any>, params: any) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.get<ProductsType>('/products/categories', { params: params });
        context.commit('SET_CATEGORIES', data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async getCategory (context: ActionContext<State, any>, name: string) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.get<ProductType>(`/products/category/${name}`);
        context.commit('SET_PRODUCTS', data);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },


    async createProduct (context: ActionContext<State, any>, body: any) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.post<AxiosResponse>('/products/add', { body: body });
        if(data) {
          context.commit('SET_NOTIFICATION', {
            title: 'Success',
            message: 'Product has been successufully added!'
          })
        }
      } catch (error) {
        console.log(error);
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async updateProduct (context: ActionContext<State, any>, params: {id: number, body: any }) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.put<AxiosResponse>(`/products/${params.id}`, {body: params.body});
        if(data) {
          context.commit('SET_NOTIFICATION', {
            title: 'Success',
            message: 'Product has been successufully edited!'
          })
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async deleteProduct (context: ActionContext<State, any>, id: number) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.delete<AxiosResponse>(`/products/${id}`);
        if(data) {
          context.commit('SET_NOTIFICATION', {
            title: 'Success',
            message: 'Product has been successufully deleted!'
          })
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },

    async getSearchedProducts (context: ActionContext<State, any>, name: string) {
      try {
        context.commit('SET_IS_LOADING', true);
        const { data } = await $api.get<ProductType>(`/products/search?limit=10&q=${name}`);
        context.commit('SET_PRODUCTS', data);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        context.commit('SET_IS_LOADING', false);
      }
    },
  }
})