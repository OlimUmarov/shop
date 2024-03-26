import { createStore, ActionContext  } from 'vuex';
import { $api } from '../../helpers/api';
import { ProductsType, ProductType } from '../types/products';

export interface State {
  isLoading: boolean,
  products: ProductsType | null,
  product: ProductType | null,
}

export const store = createStore<State>({
  state: {
    isLoading: true,
    products: null,
    product: null,
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
    }
  }
})