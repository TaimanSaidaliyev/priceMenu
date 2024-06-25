import React, { useState, useEffect } from 'react'
import './../App.css'
import ThemeDivider from './../ui/ThemeDivider';
import { FaCircleMinus, FaCirclePlus, FaCartShopping, FaCircleQuestion, FaPlus, FaBars, FaWhatsapp, FaPhone, FaLocationArrow, FaClock, FaChevronDown } from "react-icons/fa6";
import QRCode from 'react-qr-code';
import formatPrice from './../utils/formatPrice';
import { useFetching } from './..//hooks/useFetching';
import { Establishment } from './..//api/api';
import { BACK_HOST, WEBSITE_NAME } from './..//configs/config';
import { format } from 'date-fns';
import BounceLoader from "react-spinners/BounceLoader";
import { useParams } from 'react-router-dom';
import FullSizeModal from '../ui/FullSizeModal';
import { stringifyArray } from '../parser/parser';
import { FaInstagram } from 'react-icons/fa';
import DialogModal from '../ui/DialogModal';
import { ClockIcon, PhoneIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getTextColorForBackground } from '../utils/getTextColor';
import { Footer } from '../components/homepage/FotterMainPage';


const isLight: boolean = false;

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

const PageHeader = ({ establishment, setShowInfoModal }: { establishment?: IEstablishment, setShowInfoModal: Function }) => {
  return (
    <>
      <div>
        {
          establishment?.backgroundImage != null &&
          <img src={`${BACK_HOST + establishment?.backgroundImage}`} className='object-cover h-[125px] w-full pointer-events-none'/>
        }
      </div>
      {
        establishment?.photo &&
        <div className='flex justify-center mt-[-50px] z-100'>
          <img src={BACK_HOST + establishment?.photo} className='md:w-[150px] md:h-[150px] w-[100px] h-[100px] object-cover rounded-3xl shadow-lg'/>
        </div>
      }
      
      <div className='text-center'>
        <p className='text-2xl font-semibold mt-2'>
          {establishment?.title}
        </p>
        <p className='text-md text-gray-400 mt-2'>
          {establishment?.description}
        </p>
        <p className='text-md text-gray-600 mt-2 px-5 font-semibold '>
          {
            establishment?.workTime != '' &&  
            <>
                {establishment?.workTime}
                <span className='mx-2 font-bold'>·</span>
            </>
          }
          
          {
            establishment?.phoneNumber != '' && 
            <>
              {establishment?.phoneNumber}
              <span className='mx-2 font-bold'>·</span> 
            </>
          }

          {
            establishment?.address != '' && 
            <>
              {establishment?.address}
            </>
          }
          
        </p>
      </div>
    </>
  );
};

const BannersPromotions = ({searchText, establishment, banners, promotions, isLoading} : {searchText: string | ''; establishment?: IEstablishment; banners: IBanners[], promotions: IPromotions[], isLoading: boolean}) => {
  return (
    <>
      {
        isLoading ?
          // <SpinnerLoading color={establishment?.default_color}/>
          <>
          <div className="animate-pulse flex flex-row w-full overflow-y-scroll no-scrollbar h-[150px] pe-5 mt-3">
            <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
            <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
            <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
          </div>
          <div className='w-full px-5 pt-5'>
            <div className="w-full animate-pulse">
              <div> 
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1">
                </div>
                <div className="h-4 bg-gray-200 rounded w-full">
                </div>
              </div>
            </div>
          </div>
          </>
        :
        <>
          {
            searchText.length === 0 &&
            <>
                {
                    banners.filter(banner => banner.promotion_type === 'Banner' ).length > 0 && 
                    <div className='flex flex-row w-full overflow-y-scroll no-scrollbar h-[150px] pe-5 mt-3'>
                        {banners.filter(banner => banner.promotion_type === 'Banner' ).map((banner, index)=>
                        <img src={BACK_HOST + banner.photo} className='rounded-lg ms-5 h-[150px] w-[280px]' key={index}/>
                        )}
                    </div>
                }
              <div className='w-full px-5 pt-5'>
                {
                  promotions.filter(promotion => promotion.promotion_type === 'Label' ).map((promotion, index) =>
                  <div className='w-full' key={index}>
                    <div> 
                      <p className={`text-xl font-semibold`} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{promotion.title}</p>
                      <span className='text-gray-500'>
                        {promotion.description}
                      </span>
                    </div>
                    <div className='w-full flex justify-end'>
                      <span className='text-${firstColor}'>
                        до {format(promotion.until_date, 'dd.MM.yyyy')}
                      </span>
                    </div>
                    <div className='py-3'>
                      <ThemeDivider/>
                    </div>
                  </div>
                  )
                }
              </div>
            </>
          }
        </>
        }
    </>
  );
};

const MenuBlock = ({ establishment, productList, selectedMenu, setSelectedMenu, isLoading }: { establishment?: IEstablishment, productList: IMenuList[], selectedMenu: number, setSelectedMenu: Function, isLoading: boolean }) => {
  return (
    <>
    {
      isLoading ?
      <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5 mt-2 animate-pulse'>
        <div className='w-[130px] p-3 rounded-xl text-center me-3 h-[170px]'>
          <div className='object-cover w-[100px] h-[100px] rounded-full mx-auto bg-gray-200'>
          </div>
          <div className='mt-1 text-sm font-semibold h-4 bg-gray-200'></div>
        </div>
        <div className='w-[120px] p-3 rounded-xl text-center me-3 h-[170px]'>
          <div className='object-cover  w-[100px] h-[100px] rounded-full mx-auto bg-gray-200'>
          </div>
          <div className='mt-1 h-4 bg-gray-200'></div>
        </div>
      </div>
      :
      <>
        {
          productList.length > 1 &&
          <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5 mt-2'>
            {
              productList.sort((a, b) => a.sorting_number - b.sorting_number).map((menu, index)=>
                <div key={index} onClick={()=>{setSelectedMenu(menu.id)}}>
                  {
                    menu.id === selectedMenu ?
                    <div className='w-[130px] p-3 rounded-xl text-center me-3 h-[170px] cursor-pointer' style={{backgroundColor: establishment?.default_color}} key={index} >
                      <img className='object-cover w-[100px] h-[100px] rounded-full mx-auto' src={BACK_HOST + menu.photo} />
                      <p className={`${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'} mt-1 text-sm line-clamp-2`}>{menu.menu_title}</p>
                    </div>
                    :
                    <div className='w-[130px] p-3 bg-gray-100 rounded-xl text-center me-3 h-[170px] cursor-pointer' key={index}>
                      <img className='object-cover w-[100px] h-[100px] rounded-full mx-auto' src={BACK_HOST + menu.photo}/>
                      <p className='text-sm mt-1 line-clamp-2'>{menu.menu_title}</p>
                    </div>
                  }
                </div>
              )
            }
          </div>
        }
        
      </>
    }
    </>
    
  );
};

const SearchField = ({searchText, setSearchText} : {searchText: string, setSearchText: Function}) => {
  return (
    <>
      <div className='px-5 pt-5 pb-3'>
        <input type="text" placeholder='Поиск по этому меню' onChange={(e)=>{setSearchText(e.target.value)}} value={searchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
    </>
  );
};

const ProductCategoriesButtons = ({productList, selectedMenu, selectedCategory, setSelectedCategory, establishment}:{productList: IMenuList[], selectedMenu: number, selectedCategory: number, setSelectedCategory: Function, establishment?: IEstablishment}) => {
  return (
    <>
    <div className='w-full flex flex-row overflow-y-scroll no-scrollbar px-5 py-2 sticky top-0 border-b-2 border-gray-200 bg-white'>
        {
          productList
          .filter(menu => menu.id === selectedMenu)
          .map((menu, index)=>
          <React.Fragment key={index}>
            {
              menu.categories && menu.categories.sort((a, b) => a.sorting_number - b.sorting_number).map((category, index)=>
              <div key={index}>
                {
                  category.id === selectedCategory ?
                  <button className={`py-2 px-4 rounded-3xl ${isLight ? 'text-gray-800' : 'text-white'} font-semibold me-2 whitespace-nowrap`} style={{backgroundColor: establishment?.default_color}} key={index} onClick={()=>{setSelectedCategory(category.id)}}>
                    {category.category_title}
                  </button>
                  :
                  <button className="bg-white py-2 px-4 rounded-3xl text-gray-500 font-semibold me-2 whitespace-nowrap border border-gray-200" key={index} onClick={()=>{setSelectedCategory(category.id); window.location.href=`#${category.id}`}}>
                    {category.category_title}
                  </button>
                }
              </div>
              )
            }
          </React.Fragment>
          )
        }
    </div>
    </>
  );
};

const ProductList = ({productList, selectedMenu, searchText, establishment, incrementCount, setShowCategoryModal, isGetProductListLoading, showProductModal, setShowProductModal, setProduct}:{productList: IMenuList[], selectedMenu: number, searchText: string, establishment?: IEstablishment, incrementCount: Function, setShowCategoryModal: Function, isGetProductListLoading: boolean, showProductModal: boolean, setShowProductModal: Function, setProduct: Function }) => {
  if(isGetProductListLoading){
    return(
      <div className='w-full p-5 pb-[100px] animate-pulse'>
        <div>
          <div>
            <div>
              <div className='sticky top-0 flex flex-row justify-between backdrop-blur-md items-center bg-white/60 py-1'>
                <div className='h-6 bg-gray-200 rounded w-1/4 my-3'></div>
                <div className='h-6 bg-gray-200 rounded w-4'></div>
              </div>
            </div>
            <div className='flex w-full py-3'>
              <div className='me-3 w-[150px]'>
                <div className='h-24 bg-gray-200 rounded'></div>
              </div>
              <div className='w-full flex flex-col justify-between'>
                <div>
                  <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded w-1/2 mt-1'></div>
                  <div className='h-4 bg-gray-200 rounded w-full mt-1'></div>
                </div>
                <div className='flex flex-row justify-between items-end'>
                  <div className='flex flex-row items-end'>
                    <div className='h-6 bg-gray-200 rounded w-16'></div>
                    <div className='h-6 bg-gray-200 rounded w-16 ms-3'></div>
                  </div>
                  <div className='h-6 bg-gray-200 rounded w-16'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if(establishment?.menu_view_type === "List"){
    return (
      <div className='w-full pb-[100px]'>
        {productList.filter(menu => menu.id === selectedMenu).map((menu)=>
          <div key={menu.id}>
            {
              menu.categories && menu.categories.sort((a, b) => a.sorting_number - b.sorting_number).map((category, index) =>
              <div key={index}>
                { 
                  category.products.length > 0 &&
                  <div key={index} id={`category_${category.id.toString()}`}>
                    {
                        searchText.length === 0 &&
                        <div className='sticky top-0 flex flex-row justify-between backdrop-blur-md items-center bg-white/60 py-1 z-1 p-5 z-10'>
                          <p className='text-2xl font-semibold my-3'>
                            {category.category_title}
                          </p>
                          <FaChevronDown size={20} onClick={()=>{setShowCategoryModal(true)}}/>
                        </div>
                    }
                    {
                      category.products
                      .sort((a, b) => a.sorting_number - b.sorting_number)
                      .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                      .map((product, indexProduct)=>
                        <div className={`flex w-full py-3 ${!product.is_active && 'opacity-35'} p-5 z-1`} key={indexProduct}>
                          <div className='relative' onClick={()=>{setProduct(product); setShowProductModal(true)}}>
                          {
                            product.photo &&
                            <>
                              <div className='me-3 w-[110px]'>
                                <img className='object-cover rounded-lg w-[110px] h-[110px]' src={`${BACK_HOST + product.photo}`}/>
                              </div>
                              {
                                product.old_price > 0 &&
                                <div className='rounded-md px-2 py-1 flex justify-center items-center absolute' style={{top: -2, right: 15, backgroundColor: establishment.default_color}}>
                                  <span className={`${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>
                                    -{Math.round(((product.old_price - product.price)/product.old_price)*100)}%
                                  </span>
                                </div>
                              }
                            </>
                          }
                          </div>
                          
                          <div className='w-full flex flex-col justify-between'>
                            <div>
                              <p className='font-semibold text-lg line-clamp-3'>{product.title}</p>
                              {
                                !product.is_active &&
                                <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                              }
                              <p className='text-gray-500 mt-1 line-clamp-3 text-sm'>{product.description}</p>
                            </div>
                            <div className='flex flex-row justify-between items-end'>
                              <div className='flex flex-row items-end'>
                                <span className='text-lg font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price)}</span>
                                {
                                  product.old_price > 0 &&
                                  <span className='text-base text-gray-400 line-through ms-2'>{formatPrice(product.old_price)}</span>
                                }
                              </div>
                              {
                                product.is_active &&
                                <div className='flex flex-row items-center'>
                                  {
                                    product.count !== undefined && product.count > 0 && 
                                    <>
                                      <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className={`text-xl font-semibold px-1`}>{product.count}</span>
                                    </>
                                  }
                                  <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                }
              </div>
              )
            }
          </div>
        )}
      </div>
    );
  }
  else {
    return (
      <div className='w-full pb-[100px]'>
          {productList.filter(menu => menu.id === selectedMenu).map((menu)=>
            <div key={menu.id}>
              {
                menu.categories && menu.categories.map((category, index) =>
                <div key={index}>
                  { 
                    category.products.length > 0 &&
                    <div key={index} id={`category_${category.id.toString()}`}>
                      {
                        searchText.length === 0 &&
                        <div className='sticky top-0 bg-white/60 py-0 z-10 px-5'>
                          <div className='flex flex-row justify-between backdrop-blur-md items-center'>
                            <p className='text-2xl font-semibold my-3'>
                              {category.category_title}
                            </p>
                            <FaChevronDown size={20} onClick={()=>{setShowCategoryModal(true)}}/>
                          </div>
                          
                        </div>
                      }
                      <div className='grid gap-4 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 p-5'>
                      {
                        category.products
                        .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                        .map((product, indexProduct)=>
                          <div className={`text-center justify-center bg-gray-100 rounded-lg p-3 ${!product.is_active && 'opacity-35'} z-1`} key={indexProduct}>
                            <div className='relative'>
                              <img className='object-cover rounded-lg h-[150px] w-full' src={`${product.photo ? BACK_HOST + product.photo : '/img/food_no_image.png'} `} onClick={()=>{setProduct(product); setShowProductModal(true)}}/>
                                {
                                  product.old_price > 0 &&
                                  <div className='rounded-md px-2 py-1 flex justify-center items-center absolute' style={{top: -2, right: 0, backgroundColor: establishment?.default_color}}>
                                    <span className={`${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>
                                      -{Math.round(((product.old_price - product.price)/product.old_price)*100)}%
                                    </span>
                                  </div>
                                }
                            </div>
                            
                            <p className='line-clamp-2 text-center text-sm font-semibold'>
                              {product.title}
                            </p>
                            <p className='pb-1 line-clamp-2 text-center text-sm text-gray-500'>
                              {product.description}
                            </p>
                            {
                              !product.is_active &&
                              <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                            }
                            {
                              product.is_active && 
                              <>
                                {
                                  product.count !== undefined && product.count > 0 ?
                                  <>
                                    <div className='flex flex-row items-center justify-center'>
                                      <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className='text-xl font-semibold px-3'>{product.count}</span>
                                      <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
                                    </div> 
                                    <div className='flex justify-center'>
                                      <span className='text-lg font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>x {formatPrice(product.price*product.count)}</span>
                                    </div>
                                    
                                  </>
                                  :
                                  <>
                                    <button className={`px-4 py-2 rounded-lg ${isLight ? 'text-gray-800' : 'text-white'} font-semibold me-1 whitespace-nowrap w-full`} style={{backgroundColor: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}>
                                      <div className='flex flex-col items-center w-full justify-center'>
                                        <div className='flex flex-row items-center'>
                                          <FaPlus className={`me-1 ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}/>
                                          <span className={`text-lg ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>{formatPrice(product.price)}</span>
                                        </div>
                                      </div>
                                    </button>
                                    {
                                      product.old_price > 0 &&
                                      <span className='text-sm line-through ms-3' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#555555' : establishment?.default_color}}>{formatPrice(product.old_price)}</span>
                                    }
                                  </>
                                }
                              </>
                            }
                            
                          </div>
                        )
                      }
                      </div>
                    </div>
                  }
                </div>
                )
              }
            </div>
          )}
      </div>
    );
  }
  
};

const BottomNavigationBar = ({totalCount, totalPrice, setShowModal, establishment}:{totalCount: number, totalPrice: number, setShowModal: Function, establishment?: IEstablishment}) => {
  return (
    <>
    {
        totalCount > 0 &&
        <div className={`transition duration-300 ease-in-out flex fixed bottom-0 w-full text-center max-w-[899px] px-10 py-5 justify-center ${totalCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-20`}>
          <button className={`px-4 py-3 rounded-3xl font-semibold me-2 whitespace-nowrap ${isLight ? 'text-gray-800' : 'text-white'}`} style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
            <div className='flex flex-row items-center' onClick={() => setShowModal(true)}><FaCartShopping className='me-3'/> Оформить корзину {formatPrice(totalPrice)}</div>
          </button>
        </div>
      }
    </>
  );
};

const ModalWindow = ({establishment, showModal, setShowModal, cartProducts, incrementCount, total } : {establishment?: IEstablishment, showModal: boolean, setShowModal: Function, cartProducts: IMenuList[], incrementCount: Function, total: any }) => {
  const [urlQr, setUrlQr] = useState<string>('');
  
  useEffect(()=>{
    const menuList: IMenuList[] = cartProducts;
    const productsWithCount: IProducts[] = menuList.flatMap(menu => 
      menu.categories.flatMap(category => 
          category.products.filter(product => product.count || 0 > 0)
      )
    );
    setUrlQr(`https://${window.location.hostname}/list_for_waiter/?products=` + stringifyArray(productsWithCount));
    
    
  },[cartProducts]);

  return (
    <FullSizeModal isOpen={showModal} setIsOpen={setShowModal}>
      <div className={`w-full mt-5 overflow-auto h-lvh pb-[120px] no-scrollbar`}>
          {
            cartProducts.map((menu, cartIndex)=>
              <div key={cartIndex}>
                {
                  menu.categories.map((category, categoryIndex)=>
                  <div key={categoryIndex}>
                    {category.products.map((product, indexProduct)=>
                      <div className={`flex w-full pt-2 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
                        <div className='w-full flex flex-col justify-between'>
                          <div>
                            <p className='text-lg line-clamp-3'>{product.title}</p>
                            {
                              !product.is_active &&
                              <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                            }
                          </div>
                          <div className='flex flex-row justify-between mt-2'>
                            {
                              product.is_active &&
                              <div className='flex flex-row items-center'>
                                {
                                  product.count !== undefined && product.count > 0 && 
                                  <>
                                    <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                    <span className='text-xl font-semibold px-3'>{product.count}</span>
                                  </>
                                }
                                <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id,category.id, product.id, true);}}/>
                              </div>
                            }
                            <div className='flex flex-row items-end'>
                              <span className='text-xl font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price*(product.count || 0))}</span>
                            </div>
                          </div>
                          <ThemeDivider pt={5}/>
                        </div>
                      </div>
                    )}
                  </div>
                  )
                }
              </div>
            )
          }
          <div className='flex flex-row justify-between pt-4'>
            <span className='text-xl'>
              Сумма заказа:
            </span>
            <span className='text-xl'>
              {formatPrice(total.totalPrice)}
            </span>
          </div>
          <ThemeDivider pt={5} pb={5}/>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }} className='pt-3'>
            <QRCode
              size={128}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              fgColor='#3b3b3b'
              value={urlQr}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className='w-full text-center mt-2'>
            <span>Покажите полученный QR код официанту</span>
          </div>
          
      </div>  
    </FullSizeModal>
  );
};

const ModalEstablishmentWindow = ({establishment, showModal, setShowModal} : {establishment?: IEstablishment, showModal: boolean, setShowModal: Function }) => {
  return (
    <DialogModal isOpen={showModal} setIsOpen={setShowModal}>
      <div className={`w-full mt-5 overflow-auto no-scrollbar`}>
        <div className='flex w-full justify-center'>
            <div className='bg-white w-full'>
                <div className='flex flex-row w-full p-5'>
                    <img className='object-cover w-[150px] h-[150px] rounded-lg' src={BACK_HOST + establishment?.photo}/>
                    <div className='ms-3'>
                        <p className={`text-2xl font-semibold`} style={{color: establishment?.default_color}}>{establishment?.title}</p>
                        {
                          establishment && establishment.phoneNumber && establishment.phoneNumber.length &&
                          <p className='text-lg flex items-center mt-2'>
                            <FaPhone className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.phoneNumber}
                          </p>
                        }
                        {
                          establishment && establishment.address && establishment.address.length &&
                          <p className='text-lg flex items-center mt-2'>
                            <FaLocationArrow className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.address}
                          </p>
                        }
                        {
                          establishment && establishment.workTime && establishment.workTime.length &&
                          <p className='text-lg flex items-center mt-2'>
                            <FaClock className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.workTime}
                          </p>
                        }
                        
                    </div>
                </div>
                {
                  establishment && establishment.description && establishment.description.length > 0  &&
                  <div className='w-full px-5 py-5' >
                      <p className='text-lg font-semibold'>Описание</p>
                      {establishment?.description}
                  </div>
                }
                
                <div className='flex justify-center pb-5'>
                    <button className={`px-4 py-2 rounded-3xl ${isLight ? 'text-gray-800' : 'text-white'} font-semibold me-2 whitespace-nowrap`} style={{backgroundColor: establishment?.default_color}} onClick={()=>{setShowModal(false)}}>
                        <div className='flex flex-row items-center cursor-pointer' >
                            <FaBars size={20} className='me-3'/>Вернуться в меню
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>  
    </DialogModal>
  );
};

const ModalCategoryList = ({productList, selectedMenu, selectedCategory, setSelectedCategory, establishment, showCategoryModal, setShowCategoryModal}:{productList: IMenuList[], selectedMenu: number, selectedCategory: number, setSelectedCategory: Function, establishment?: IEstablishment, showCategoryModal: boolean, setShowCategoryModal: Function}) => {
  return (
    <DialogModal isOpen={showCategoryModal} setIsOpen={setShowCategoryModal}>
      <div className='w-full flex flex-col overflow-y-scroll no-scrollbar px-5 py-2 sticky top-0 border-b-2 border-gray-200 bg-white'>
          {
            productList
            .filter(menu => menu.id === selectedMenu)
            .map((menu, index)=>
            <React.Fragment key={index}>
              {
                menu.categories && menu.categories.sort((a, b) => a.sorting_number - b.sorting_number).map((category, index)=>
                <div key={index}>
                  {
                    category.id === selectedCategory ?
                    <div className={`py-2 px-4 my-1 ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'} font-semibold me-2 whitespace-nowrap w-[300px]`} style={{backgroundColor: establishment?.default_color}} key={index} onClick={()=>{setSelectedCategory(category.id); setShowCategoryModal(false)}}>
                      {category.category_title}
                    </div>
                    :
                    <div className="bg-white py-2 px-4 my-1 text-gray-500 font-semibold me-2 whitespace-nowrap w-[300px]" key={index} onClick={()=>{setSelectedCategory(category.id); window.location.hash=`#category_${category.id}`; setShowCategoryModal(false);}}>
                      {category.category_title}
                    </div>
                  }
                </div>
                )
              }
            </React.Fragment>
            )
          }
      </div>
    </DialogModal>
  );
}

const ModalProductInfo = ({
  productList, 
  selectedMenu, 
  selectedCategory, 
  setSelectedCategory, 
  establishment, 
  showProductModal, 
  setShowProductModal, 
  product, 
  incrementCount}:{
    productList: IMenuList[], 
    selectedMenu: number, 
    selectedCategory: number, 
    setSelectedCategory: Function, 
    establishment?: IEstablishment, 
    showProductModal: boolean, 
    setShowProductModal: Function, 
    product: IProducts, 
    incrementCount: Function
}) => {
  return (
    <DialogModal isOpen={showProductModal} setIsOpen={setShowProductModal}>
      <div className='w-full flex flex-col overflow-y-scroll no-scrollbar border-b-2 border-gray-200 z-30'>
          <img src={product.photo ? BACK_HOST + product.photo : '/img/food_no_image.png'} className={'object-cover max-h-[400px]'}/>
          <button
            type="button"
            className="absolute rounded-full right-4 top-3 bg-white text-gray-400 p-1"
            onClick={() => setShowProductModal(false)}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className='px-2 py-3'>
            <p className='text-xl font-semibold'>{product.title}</p>
                {
                  product.old_price > 0 &&
                  <div className='rounded-md px-2 py-1 flex justify-center items-center absolute' style={{top: 10, left: 10, backgroundColor: establishment?.default_color}}>
                    <span className={`text-xl ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>
                      -{Math.round(((product.old_price - product.price)/product.old_price)*100)}%
                    </span>
                  </div>
                }
            <div className='flex flex-row items-end mt-3'>
              <span className='text-2xl font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price)}</span>
              {
                product.old_price > 0 &&
                <span className='text-xl text-gray-400 line-through ms-2'>{formatPrice(product.old_price)}</span>
              }
            </div>
            <p className='mt-3 text-md text-gray-600 '>{product.description}</p>
          </div>
      </div>
    </DialogModal>
  );
}


export default EstablishmentMenuPage;
