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
    id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    old_price: number;
    is_active: boolean;
    is_published: boolean;
    photo?: File | null;
    count?: number | undefined;
    establishment?: string;
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
    establishment: number;
  };
  
  interface IMenu {
    id: string;
    menu_title: string;
    photo?: File | null;
    establishment: number;
    categories?: [];
  }

  interface ICategory {
    id: string;
    category_title: string;
    photo?: string | '';
    establishment?: number;
    products?: IProducts[];
  }

  interface IEstablishment {
    id: string,
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