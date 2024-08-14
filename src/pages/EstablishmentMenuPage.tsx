import React, { useState, useEffect } from 'react'
import './../App.css'
import { useFetching } from './..//hooks/useFetching';
import { Establishment } from './..//api/api';
import { WEBSITE_NAME } from './..//configs/config';
import BounceLoader from "react-spinners/BounceLoader";
import { useParams } from 'react-router-dom';
import { Footer } from '../components/homepage/FotterMainPage';
import { PageHeader } from '../components/menupage/PageHeader';
import { BannersPromotions } from '../components/menupage/BannersPromotions';
import { MenuBlock } from '../components/menupage/MenuBlock';
import { SearchField } from '../components/menupage/SearchField';
import { ProductList } from '../components/menupage/ProductList';
import { BottomNavigationBar } from '../components/menupage/BottomNavigationBar';
import { ModalWindow } from '../components/menupage/ModalWindow';
import { ModalEstablishmentWindow } from '../components/menupage/ModalEstablishmentWindow';
import { ModalCategoryList } from '../components/menupage/ModalCategoryList';
import { ModalProductInfo } from '../components/menupage/ModalProductInfo';


export const isLight: boolean = false;

function EstablishmentMenuPage() {
  let { establishment_id } = useParams();

  const [productList, setProductList] = useState<IMenuList[]>([
    {
      establishment: '0',
      id: 0,
      menu_title: '',
      categories: [
      {
        category_title: '', 
        id: 0, 
        products: [],
        sorting_number: 0
      }],
      sorting_number: 0
    }
  ]);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [product, setProduct] = useState<IProducts>({
    id: '',
    title: '',
    category: '',
    description: '',
    price: 0,
    old_price: 0,
    is_active: true,
    is_published: true,
    photo: null,
    count: 0,
    establishment: '',
    sorting_number: 0,
    additional_code: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<number>(productList[0].id || 0);
  const [cartProducts, setCartProducts] = useState<IMenuList[]>([]);
  const [total, setTotal] = useState({totalPrice: 0, totalCount: 0});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [establishment, setEstablishment] = useState<IEstablishment>();
  const [banners, setBanners] = useState<IBanners[]>([]);
  const [promotions, setPromotions] = useState<IPromotions[]>([]);
  const [untilDate, setUntilDate] = useState<Date>();

  
  const [getEstablishmentInfomation, isGetEstablishmentInfomationLoading] = useFetching(async () => {
    const response = await Establishment.getEstablishmentInformationById(establishment_id || '0');
    setEstablishment(response.data.establishment);
    setUntilDate(new Date(response.data.establishment.until_date));
  });

  const [getProductList, isGetProductListLoading] = useFetching(async () => {
    const response = await Establishment.getEstablishmentProductList(establishment_id || '0');
    setProductList(response.data.list);
    setSelectedMenu(response.data.list.sort((a: any, b: any) => a.sorting_number - b.sorting_number)[0].id);
  });

  const [getPromotionsList, isGetPromotionsListLoading] = useFetching(async () => {
    const response = await Establishment.getEstablishmentPromotions(establishment_id || '0');
    setPromotions(response.data.promotions);
    setBanners(response.data.promotions);
  });

  useEffect(()=>{
    getEstablishmentInfomation();
    getProductList();
    getPromotionsList();
  },[]);

  const filteredProductList = productList && productList.map(category => ({
    ...category,
    categories: category.categories.map(subcategory => ({
      ...subcategory,
      products: subcategory.products.filter(product => product.count && product.count > 0)
    }))
  }));

  useEffect(()=>{
    setCartProducts(filteredProductList);
    setTotal({totalPrice: totalPrice, totalCount: totalCount});
  },[productList]);

  useEffect(() => {
    document.title = WEBSITE_NAME + 'Меню заведения ' + establishment?.title;
  }, [establishment]);

  const incrementCount = (menuId: number, categoryId: number, productId: string, operations: boolean) => {
    setProductList((prevProductList) => {
      return prevProductList.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            categories: menu.categories.map((category) => {
              if (category.id === categoryId) {
                return {
                  ...category,
                  products: category.products.map((product) => {
                    if (product.id === productId) {
                      if (operations) {
                        return {
                          ...product,
                          count: (product.count || 0) + 1,
                        };
                      } else {
                        if ((product.count || 0) > 0) {
                          return {
                            ...product,
                            count: (product.count || 0) - 1,
                          };
                        }
                      }
                    }
                    return product;
                  }),
                };
              }
              return category;
            }),
          };
        }
        return menu;
      });
    });
  };

  const totalPrice = productList.reduce((total, menu) => {
    return total + menu.categories.reduce((categoryTotal, category) => {
      return categoryTotal + category.products.reduce((subTotal, product) => {
        return subTotal + (product.count || 0) * product.price;
      }, 0);
    }, 0);
  }, 0);
  
  const totalCount: number = productList.reduce((total, menu) => {
    return total + menu.categories.reduce((categoryTotal, category) => {
      return categoryTotal + category.products.reduce((subTotal, product) => {
        return subTotal + (product.count || 0);
      }, 0);
    }, 0);
  }, 0);

  return (
    <>
      <div className='flex w-full justify-center'>
        <div className='bg-white max-w-[900px] w-full border-gray-200 border min-h-[300px]'>
          {
            isGetEstablishmentInfomationLoading || isGetProductListLoading || isGetPromotionsListLoading ?
              <BounceLoader/>
            :
            <>
              {
                (untilDate || new Date('2024-01-01')) <= new Date() 
                ?
                <div className='text-center w-full p-5  items-center'>
                  <p>Меню не существует</p>
                  <p className='text-blue-500'>Вернуться на главную страницу</p>
                </div>
                :
                <>
                  <PageHeader establishment={establishment} setShowInfoModal={setShowInfoModal} />
                  <BannersPromotions searchText={searchText} establishment={establishment} banners={banners} promotions={promotions} isLoading={isGetPromotionsListLoading}/>
                  <MenuBlock productList={productList} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} establishment={establishment} isLoading={isGetProductListLoading}/>
                  <SearchField searchText={searchText} setSearchText={setSearchText}/>
                  {/* <ProductCategoriesButtons establishment={establishment} productList={productList} selectedCategory={selectedCategory} selectedMenu={selectedMenu} setSelectedCategory={setSelectedCategory}/> */}
                  <ProductList establishment={establishment} incrementCount={incrementCount} productList={productList} searchText={searchText} selectedMenu={selectedMenu} setShowCategoryModal={setShowCategoryModal} isGetProductListLoading={isGetProductListLoading} showProductModal={showProductModal} setShowProductModal={setShowProductModal} setProduct={setProduct}/>
                  <BottomNavigationBar establishment={establishment} setShowModal={setShowModal} totalCount={totalCount} totalPrice={totalPrice}/>
                  <ModalWindow cartProducts={cartProducts} incrementCount={incrementCount} setShowModal={setShowModal} showModal={showModal} total={total} establishment={establishment}/>
                  <ModalEstablishmentWindow setShowModal={setShowInfoModal} showModal={showInfoModal} establishment={establishment}/>
                  <ModalCategoryList establishment={establishment} productList={productList} selectedCategory={selectedCategory} selectedMenu={selectedMenu} setSelectedCategory={setSelectedCategory} setShowCategoryModal={setShowCategoryModal} showCategoryModal={showCategoryModal}/>
                  <ModalProductInfo establishment={establishment} productList={productList} selectedCategory={selectedCategory} selectedMenu={selectedMenu} setSelectedCategory={setSelectedCategory} setShowProductModal={setShowProductModal} showProductModal={showProductModal} product={product} incrementCount={incrementCount}/>
                  <Footer/>
                </>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}



export default EstablishmentMenuPage;
