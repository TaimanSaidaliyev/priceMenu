import axios from 'axios';
import { BACK_HOST } from '../configs/config';

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
}