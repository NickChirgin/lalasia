import { api } from "@config/api";
import { ILocalStore } from "@utils/useLocalStore";
import { API_ENDPOINTS, ITEMS_PER_PAGE } from "@config/endpoint";
import { CardsModel } from "@store/models/product/cards";
import rootStore from "@store/RootStore";
import range from "@utils/range";

import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_categories"
  | "_isLoading"
  | "_products"
  | "_pagesAmount"
  | "_choosenCategories";

export default class MainPageStore implements ILocalStore {
  private _products: CardsModel[] = [];
  private _categories: string[] = [];
  private _isLoading: boolean = false;
  private _pagesAmount: number[] = [];
  private _choosenCategories: string[] = [];
  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _isLoading: observable.ref,
      _categories: observable.ref,
      _products: observable,
      _pagesAmount: observable.ref,
      _choosenCategories: observable.ref,
      products: computed,
      categories: computed,
      loading: computed,
      paginatedProducts: computed,
      filteredProducts: computed,
      setCategories: action.bound,
      fetchCategories: action.bound,
      setProducts: action.bound,
    });
  }

  get pagesAmount(): number[] {
    return this._pagesAmount;
  }

  get products(): CardsModel[] {
    return this._products;
  }

  get loading(): boolean {
    return this._isLoading;
  }

  get categories(): string[] {
    return this._categories;
  }

  get choosenCategories(): string[] {
    return this._choosenCategories;
  }

  setCategories(cats: string[]) {
    this._choosenCategories = cats;
  }

  async fetchCategories(): Promise<void> {
    this._categories = [];
    const categories = await api.get(API_ENDPOINTS.CATEGORIES);
    runInAction(() => (this._categories = categories.data));
  }

  async setProducts(): Promise<void> {
    this._products = [];
    this._isLoading = true;

    if (this.choosenCategories) {
      this.choosenCategories.map(async (cat) => {
        const products = await api.get(`${API_ENDPOINTS.CATEGORY}${cat}`);
        runInAction(() => {
          this._products.push(...products.data);
          this._pagesAmount = range(1, this._products.length, ITEMS_PER_PAGE);
        });
      });
    }
    if (this.choosenCategories.length === 0) {
      const products = await api.get(API_ENDPOINTS.PRODUCTS);
      runInAction(() => {
        this._products = products.data;
        this._pagesAmount = range(1, this._products.length, ITEMS_PER_PAGE);
      });
    }
  }

  get filteredProducts() {
    const filter = rootStore.query.getParam("search") as string;
    if (filter) {
      return this._products.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return this._products;
  }

  get paginatedProducts() {
    const page = rootStore.query.getParam('?page') || rootStore.query.getParam('page') || '1';
    this._pagesAmount = range(
        1,
        this.filteredProducts.length,
        ITEMS_PER_PAGE
      );
    this._isLoading = false;
    return this.filteredProducts.slice(
      (Number(page) - 1) * ITEMS_PER_PAGE,
      Number(page) * ITEMS_PER_PAGE
    );
  }

  destroy(): void {}
}
