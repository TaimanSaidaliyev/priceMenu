import axios from 'axios';
import { BACK_HOST } from '../configs/config';
import { getCookie } from '../utils/cookie';

const token = getCookie('token');

export class Establishment {
    static async getEstablishmentInformationById(establishment_id: string) {
        const response = await axios.get(BACK_HOST + `/establishment/${establishment_id}/information/`);
        return response;
    }
    static async getEstablishmentProductList(establishment_id: string) {
        const response = await axios.get(BACK_HOST + `/establishment/${establishment_id}/products/`);
        return response;
    }
    static async getEstablishmentPromotions(establishment_id: string) {
        const response = await axios.get(BACK_HOST + `/establishment/${establishment_id}/promotions/`);
        return response;
    }
    static async updateEstablishmentInfo(establishment_id: string, body: any) {
        const response = await axios.put(BACK_HOST + `/establishment/${establishment_id}/information/`, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
        return response;
    }
}

export class Dictionary {
    static async getMenuListByEstablishmentId(establishment_id: string) {
        const response = await axios.get(BACK_HOST + `/dict/${establishment_id}/menu/`);
        return response;
    }
    static async getCategoriesByMenuId(menu_id: string) {
        const response = await axios.get(BACK_HOST + `/dict/${menu_id}/category/`);
        return response;
    }
    static async getProductsByCategoryId(category_id: string) {
        const response = await axios.get(BACK_HOST + `/dict/${category_id}/products/`);
        return response;
    }
    static async getProductById(product_id: string) {
        const response = await axios.get(BACK_HOST + `/dict/${product_id}/product/information/`);
        return response;
    }
    static async getProductsByIds(body: any) {
        const response = await axios.post(BACK_HOST + `/product/get_list/`, body);
        return response;
    }
}

export class SetDict {
    //Menu
    static async addMenu(body: any) {
        const response = await axios.post(BACK_HOST + `/add_edit/menu/establishment/`, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`
            },
          }
        );
        return response;
    }

    static async editMenu(body: any, id: string) {
        const response = await axios.put(BACK_HOST + `/add_edit/menu/establishment/${id}/`, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`
            },
          }
        );
        return response;
    }

    static async getMenu(id: string) {
        const response = await axios.get(BACK_HOST + `/add_edit/menu/establishment/${id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
        return response;
    }

    static async deleteMenu(id: string) {
        const response = await axios.delete(BACK_HOST + `/add_edit/menu/establishment/${id}/`,  {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        }, );
        return response;
    }


    //Category
    static async addCategory(body: any) {
        const response = await axios.post(BACK_HOST + `/add_edit/category/`, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`
            },
          }
        );
        return response;
    }

    static async editCategory(body: any, id: string) {
        const response = await axios.put(BACK_HOST + `/add_edit/category/${id}/`, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`
            },
          }
        );
        return response;
    }

    static async getCategory(id: string) {
        const response = await axios.get(BACK_HOST + `/add_edit/category/${id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
        return response;
    }

    static async deleteCategory(id: string) {
        const response = await axios.delete(BACK_HOST + `/add_edit/category/${id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
        return response;
    }

    static async sortingCategories(body: any) {
      const response = await axios.put(BACK_HOST + `/add_edit/categories/sorting/`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      }
      );
      return response;
    }


    //Product
    static async addProductByCategory(body: any) {
        const response = await axios.post(BACK_HOST + `/add_edit/products/`, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`
            },
          }
        );
        return response;
    }

    static async editProductByCategory(body: any, id: string) {
      const response = await axios.put(BACK_HOST + `/add_edit/products/${id}/`, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        }
      );
      return response;
    }

    static async getProductById(id: string) {
      const response = await axios.get(BACK_HOST + `/add_edit/products/${id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
      return response;
    }

    static async deleteProductById(id: string) {
      const response = await axios.delete(BACK_HOST + `/add_edit/products/${id}/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          },
        });
      return response;
    }

    static async sortingProducts(body: any) {
      const response = await axios.put(BACK_HOST + `/add_edit/products/sorting/`, body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
        }
      );
      return response;
    }
}

export class User {
  static async getToken(body: any) {
    const response = await axios.post(BACK_HOST + `/auth/token/login/`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  }

  static async checkToken() {
    const response = await axios.post(BACK_HOST + `/auth/token/check/`, {'token': getCookie('token') || 'asd' }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  }

  static async getEstablishmentIdByToken() {
    const response = await axios.post(BACK_HOST + `/auth/token/get_establishment/`, {'token': getCookie('token') || 'asd' }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  }
}