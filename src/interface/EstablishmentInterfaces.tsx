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
    sorting_number: number;
    additional_code?: string;
  }
  
  interface IMenuList {
    id: number;
    menu_title: string;
    photo?: File | null;
    categories: {
      id: number;
      category_title: string;
      products: IProducts[];
      sorting_number: number;
    } [];
    establishment: string;
  };
  
  interface IMenu {
    id: string;
    menu_title: string;
    photo?: File | null;
    establishment: string;
    categories?: [];
    sorting_number?: string;
  }

  interface ICategory {
    id: string;
    category_title: string;
    photo?: string | '';
    establishment?: string;
    products?: IProducts[];
  }

  interface IEstablishment {
    id: string,
    title: string,
    default_color: string | '#000000',
    secondary_color?: boolean | true,
    description?: string,
    photo?: File | null,
    backgroundImage?: File | null,
    address?: string,
    workTime?: string,
    phoneNumber?: string,
    menu_view_type?: string
  }