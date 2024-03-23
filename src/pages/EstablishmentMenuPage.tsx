import React, { useState, useEffect } from 'react'
import './../App.css'
import ThemeDivider from './../ui/ThemeDivider';
import { FaCircleMinus, FaCirclePlus, FaCartShopping, FaXmark, FaCircleQuestion, FaPlus } from "react-icons/fa6";
import Modal from "react-modal" 
import QRCode from 'react-qr-code';
import formatPrice from './../utils/formatPrice';
import { useFetching } from './..//hooks/useFetching';
import { Establishment } from './..//api/api';
import { BACK_HOST } from './..//configs/config';
import { format } from 'date-fns';
import BounceLoader from "react-spinners/BounceLoader";
import { useParams } from 'react-router-dom';

function EstablishmentMenuPage() {
  let { establishment_id } = useParams();

  const [productList, setProductList] = useState<IMenuList[]>([
    {
      id: 1,
      menu_title: 'Меню ресторана',
      photo: 'https://e1.edimdoma.ru/data/posts/0002/7253/27253-ed4_wide.jpg?1671786759',
      categories: [
        {
          id: 1, 
          category_title: 'Салаты',
          products: [
            {
              id: 1,
              description: 'Куриное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Оливье с курицей',
              old_price: 1500,
              price: 1300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/WgykJzu85H_thumb.jpeg',
              is_published: false
            },
            {
              id: 2,
              description: 'Рыбное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Сельдь под шубой',
              old_price: 2200,
              price: 1900,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/vWZX42y8vE_thumb.jpeg',
              count: 0,
              is_published: false
            },
            
          ],
        },
        {
          id: 2,
          category_title: 'Горячие блюда',
          products: [
            {
              id: 3,
              description: 'Котлета с луком по домащнему с картофельным пюре',
              title: 'Котлета с луком по домащнему с картофельным пюре',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 4,
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              title: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/mi8vTWknvq_thumb.jpeg',
              count: 0,
              is_published: false
            }
          ]
        },
        {
          id: 3,
          category_title: 'Супы',
          products: [
            {
              id: 5,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 6,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: false,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 7,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 8,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            }
          ]
        },
      ]
      
    },
    {
      id: 2,
      menu_title: 'Завтраки',
      photo: 'https://opis-cdn.tinkoffjournal.ru/mercury/main_recept-gruzia.gbgyes.jpg',
      categories: [
        {
          id: 1, 
          category_title: 'Анчоусы',
          products: [
            {
              id: 1,
              description: 'Куриное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Рыба запеченная в духовке',
              old_price: 1500,
              price: 1300,
              is_active: true,
              photo: 'https://gotovim-doma.ru/images/recipe/a/af/aaf296508a1b60d2aeb7460574aadcfb_l.jpg',
              is_published: false
            },
            {
              id: 2,
              description: 'Рыбное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Сельдь под шубой',
              old_price: 2200,
              price: 1900,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/vWZX42y8vE_thumb.jpeg',
              is_published: false,
              count: 0
            },
            
          ],
        },
        {
          id: 2,
          category_title: 'Соусы',
          products: [
            {
              id: 3,
              description: 'Котлета с луком по домащнему с картофельным пюре',
              title: 'Котлета с луком по домащнему с картофельным пюре',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 4,
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              title: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/mi8vTWknvq_thumb.jpeg',
              is_published: false,
              count: 0
            }
          ]
        },
        {
          id: 3,
          category_title: 'Супы',
          products: [
            {
              id: 5,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 6,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: false,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 7,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            },
            {
              id: 8,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              is_active: true,
              photo: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg',
              is_published: false
            }
          ]
        },
      ]
      
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<number>(productList[0].id);
  const [selectedCategory, setSelectedCategory] = useState<number>(productList[0].id);
  const [cartProducts, setCartProducts] = useState<IMenuList[]>([]);
  const [total, setTotal] = useState({totalPrice: 0, totalCount: 0});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [qrLink, setQrLink] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [establishment, setEstablishment] = useState<IEstablishment>();
  const [banners, setBanners] = useState<IBanners[]>([]);
  const [promotions, setPromotions] = useState<IPromotions[]>([]);

  const [getEstablishmentInfomation, isProductInfomationLoading, isProductInfomationError] = useFetching(async () => {
    const response = await Establishment.getEstablishmentInformationById(establishment_id || '0');
    setEstablishment(response.data.establishment);
  });

  const [getProductList, isGetProductListLoading, isGetProductListError] = useFetching(async () => {
    const response = await Establishment.getEstablishmentProductList(establishment_id || '0');
    setProductList(response.data.list);
    setSelectedMenu(response.data.list[0].id);
  });

  const [getPromotionsList, isGetPromotionsListLoading, isGetPromotionsListError] = useFetching(async () => {
    const response = await Establishment.getEstablishmentPromotions(establishment_id || '0');
    setPromotions(response.data.promotions);
    setBanners(response.data.promotions);
  });

  useEffect(()=>{
    getEstablishmentInfomation();
    getProductList();
    getPromotionsList();
  },[]);

  const filteredProductList = productList.map(category => ({
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
    let idProducts = '';
    productList.forEach((menu) => {
      menu.categories.forEach((category) => {
        category.products.forEach((product) => {
          idProducts += product.id + ',';
        });
      });
    });
    setQrLink(idProducts);
  }, [productList]);

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
        <div className='bg-white max-w-[900px] w-full border-gray-200 border'>
            <PageHeader establishment={establishment} />
            <BannersPromotions searchText={searchText} establishment={establishment} banners={banners} promotions={promotions} isLoading={isGetPromotionsListLoading}/>
            <MenuBlock productList={productList} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} establishment={establishment} isLoading={isGetProductListLoading}/>
            <SearchFiled searchText={searchText} setSearchText={setSearchText}/>
            <ProductCategoriesButtons establishment={establishment} productList={productList} selectedCategory={selectedCategory} selectedMenu={selectedMenu} setSelectedCategory={setSelectedCategory}/>
            <ProductList establishment={establishment} incrementCount={incrementCount} productList={productList} searchText={searchText} selectedMenu={selectedMenu}/>
            <BottomNavigationBar establishment={establishment} setShowModal={setShowModal} totalCount={totalCount} totalPrice={totalPrice}/>
            <ModalWindow cartProducts={cartProducts} incrementCount={incrementCount} qrLink={qrLink} setShowModal={setShowModal} showModal={showModal} total={total} establishment={establishment}/>
        </div>
      </div>
    </>
  )
}

const PageHeader = ({ establishment }: { establishment?: IEstablishment }) => {
  return (
    <div className={`flex bg-gray-500 w-full items-end bg-cover bg-center bg-[url('${BACK_HOST + establishment?.backgroundImage}')]`}>
      <div className='w-full'>
        <div className='p-5'>
          <div className='flex w-full justify-end pb-6'>
            <span className='text-white me-6 font-semibold'>
              Оставить отзыв
            </span>
            <span className='text-white font-semibold'>
              Книга жалоб
            </span>
            <span className='text-white'></span>
          </div>
          <p className='text-xl text-white font-semibold mb-3'>
            <div className='flex flex-row items-center'>
                {establishment?.title || ''} 
                <a href={`/establishment/${establishment?.id}/info/`} target='_blank'>
                    <FaCircleQuestion className='ms-2' size={24}/>
                </a>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

const BannersPromotions = ({searchText, establishment, banners, promotions, isLoading} : {searchText: string | ''; establishment?: IEstablishment; banners: IBanners[], promotions: IPromotions[], isLoading: boolean}) => {
  return (
    <>
      {
        isLoading ?
          <SpinnerLoading color={establishment?.default_color}/>
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
                      <p className={`text-xl font-semibold`} style={{color: establishment?.default_color}}>{promotion.title}</p>
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
      <SpinnerLoading color={establishment?.default_color}/>
      :
      <>
        {
          productList.length > 1 &&
          <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5 mt-2'>
            {
              productList.map((menu, index)=>
                <div key={index} onClick={()=>{setSelectedMenu(menu.id)}}>
                  {
                    menu.id === selectedMenu ?
                    <div className='w-[120px] p-3 rounded-xl text-center me-3 h-[170px] cursor-pointer' style={{backgroundColor: establishment?.default_color}} key={index} >
                      <img className='object-cover w-[100px] h-[100px] rounded-full mx-auto' src={BACK_HOST + menu.photo} />
                      <p className='text-white mt-1 text-sm font-semibold'>{menu.menu_title}</p>
                    </div>
                    :
                    <div className='w-[120px] p-3 bg-gray-100 rounded-xl text-center me-3 h-[170px] cursor-pointer' key={index}>
                      <img className='object-cover  w-[100px] h-[100px] rounded-full mx-auto' src={BACK_HOST + menu.photo}/>
                      <p className='text-sm mt-1'>{menu.menu_title}</p>
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

const SearchFiled = ({searchText, setSearchText} : {searchText: string, setSearchText: Function}) => {
  return (
    <>
      <div className='px-5 pt-5 pb-3'>
        <input type="text" placeholder='Поиск' onChange={(e)=>{setSearchText(e.target.value)}} value={searchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
              menu.categories && menu.categories.map((category, index)=>
              <div key={index}>
                {
                  category.id === selectedCategory ?
                  <button className={`py-2 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap`} style={{backgroundColor: establishment?.default_color}} key={index} onClick={()=>{setSelectedCategory(category.id)}}>
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

const ProductList = ({productList, selectedMenu, searchText, establishment, incrementCount}:{productList: IMenuList[], selectedMenu: number, searchText: string, establishment?: IEstablishment, incrementCount: Function}) => {
  if(establishment?.menu_view_type === "List"){
    return (
      <div className='w-full p-5 pb-[100px]'>
        {productList.filter(menu => menu.id === selectedMenu).map((menu)=>
          <div key={menu.id}>
            {
              menu.categories && menu.categories.map((category, index) =>
              <div key={index}>
                { 
                  category.products.length > 0 &&
                  <div key={index} id={category.id.toString()}>
                    {
                      searchText.length === 0 &&
                      <p className='text-2xl font-semibold my-3'>
                        {category.category_title}
                      </p>
                    }
                    {
                      category.products
                      .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                      .map((product, indexProduct)=>
                        <div className={`flex w-full py-3 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
                          {
                            product.photo &&
                            <div className='me-3'>
                              <img className='object-cover rounded-lg w-[150px] min-h-[150px]' src={`${BACK_HOST + product.photo}`}/>
                            </div>     
                          }
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
                                <span className='text-xl font-semibold' style={{color: establishment?.default_color}}>{formatPrice(product.price)}</span>
                                {
                                  product.old_price > 0 &&
                                  <span className='text-lg text-gray-400 line-through ms-3'>{formatPrice(product.old_price)}</span>
                                }
                              </div>
                              {
                                product.is_active &&
                                <div className='flex flex-row items-center'>
                                  {
                                    product.count !== undefined && product.count > 0 && 
                                    <>
                                      <FaCircleMinus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className='text-xl font-semibold px-3'>{product.count}</span>
                                    </>
                                  }
                                  <FaCirclePlus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
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
      <div className='w-full p-5 pb-[100px]'>
          {productList.filter(menu => menu.id === selectedMenu).map((menu)=>
            <div key={menu.id}>
              {
                menu.categories && menu.categories.map((category, index) =>
                <div key={index}>
                  { 
                    category.products.length > 0 &&
                    <div key={index} id={category.id.toString()}>
                      {
                        searchText.length === 0 &&
                        <p className='text-2xl font-semibold my-3'>
                          {category.category_title}
                        </p>
                      }
                      <div className='grid gap-4 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'>
                      {
                        category.products
                        .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                        .map((product, indexProduct)=>
                          <div className={`text-center justify-center bg-gray-100 rounded-lg p-3 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
                            <img className='object-cover rounded-lg h-[150px] w-full' src={`${product.photo ? BACK_HOST + product.photo : '/img/food_no_image.png'} `}/>
                            <p className='pb-2 text-start line-clamp-2'>
                              {product.title}
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
                                      <FaCircleMinus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className='text-xl font-semibold px-3'>{product.count}</span>
                                      <FaCirclePlus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
                                    </div> 
                                    <div className='flex justify-center'>
                                      <span className='text-lg font-semibold' style={{color: establishment?.default_color}}>x {formatPrice(product.price*product.count)}</span>
                                    </div>
                                    
                                  </>
                                  :
                                  <>
                                    <button className='px-4 py-2 rounded-lg text-white font-semibold me-2 whitespace-nowrap w-full' style={{backgroundColor: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}>
                                      <div className='flex flex-col items-center w-full justify-center'>
                                        <div className='flex flex-row items-center'>
                                          <FaPlus className='me-1'/>
                                          <span className='text-lg text-white'>{formatPrice(product.price)}</span>
                                        </div>
                                      </div>
                                    </button>
                                    {
                                      product.old_price > 0 &&
                                      <span className='text-sm line-through ms-3' style={{color: establishment?.default_color}} >{formatPrice(product.old_price)}</span>
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
        <div className={`transition duration-300 ease-in-out flex fixed bottom-0 z-49 w-full text-center max-w-[899px] px-10 py-5 justify-center ${totalCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button className='px-4 py-3 rounded-3xl text-white font-semibold me-2 whitespace-nowrap' style={{backgroundColor: establishment?.default_color}}>
            <div className='flex flex-row items-center' onClick={() => setShowModal(true)}><FaCartShopping className='me-3'/> Оформить корзину {formatPrice(totalPrice)}</div>
          </button>
        </div>
      }
    </>
  );
};

const ModalWindow = ({establishment, showModal, setShowModal, cartProducts, incrementCount, total, qrLink} : {establishment?: IEstablishment, showModal: boolean, setShowModal: Function, cartProducts: IMenuList[], incrementCount: Function, total: any, qrLink: string }) => {
  return (
    <Modal
      isOpen={showModal}
      ariaHideApp={false}
      contentLabel="Modal"
      className={'w-full max-w-[899px] bg-white h-full z-50 p-5'}
    >
      <div className='w-full flex justify-between'>
        <span className='text-3xl' style={{color: establishment?.default_color}}>Корзина</span>
        <FaXmark size={36} onClick={()=>{setShowModal(false);}}/>
      </div>
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
                                  <FaCircleMinus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                  <span className='text-xl font-semibold px-3'>{product.count}</span>
                                </>
                              }
                              <FaCirclePlus size={24} style={{color: establishment?.default_color}} onClick={()=>{incrementCount(menu.id,category.id, product.id, true);}}/>
                            </div>
                          }
                          <div className='flex flex-row items-end'>
                            <span className='text-xl font-semibold' style={{color: establishment?.default_color}}>{formatPrice(product.price*(product.count || 0))}</span>
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
        {/* <div className='text-center w-full mt-4'>
          <button className='bg-blue-500 py-2 hover:bg-blue-700 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap'>
            <div className='flex flex-row items-center' onClick={() => setShowModal(true)}><FaQrcode className='me-3'/> Сгенерировать QR</div>
          </button>
        </div> */}
        <ThemeDivider pt={5} pb={5}/>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }} className='pt-3'>
          <QRCode
            size={128}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            fgColor='#3b3b3b'
            value={'https://example.com/page?array=1,2,3,4,5'}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className='w-full text-center mt-2'>
          <span>Покажите полученный QR код официанту</span>
          {qrLink}
        </div>
        
      </div>
    </Modal>
  );
};

const SpinnerLoading = ({color}:{color?: string}) => {
  return (
    <div className='flex justify-center text-center mt-2'>
      <BounceLoader
        color={color || '#555555'}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default EstablishmentMenuPage;
