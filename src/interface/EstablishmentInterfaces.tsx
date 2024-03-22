  interface IBanners {
    id: number;
    photo: string;
    promotion_type: string;
  };
  
  interface IPromotions {
    id: Number;
    title: string;
    description?: string;
    promotion_type?: string;
    until_date: Date;
  };
  
  interface IProducts {
    id: number;
    title: string;
    description: string;
    price: number;
    old_price: number;
    is_active: boolean;
    is_published: boolean;
    photo: string;
    count?: number | undefined;
  }
  
  interface IMenuList {
    id: number;
    menu_title: string;
    photo: string;
    categories: {
      id: number;
      category_title: string;
      products: IProducts[];
    } [];
  };
  
  interface ICategory {
    id: number;
    category_title: string;
    photo?: string | '';
  }

  interface IEstablishment {
    id: number,
    title: string,
    default_color: string | '#000000',
    secondary_color?: boolean | true,
    description?: string,
    photo?: string,
    backgroundImage?: string,
    address?: string,
    workTime?: string,
    phoneNumber?: string,
    menu_view_type?: string
  }