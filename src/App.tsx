import React, { useState, useEffect } from 'react'
import './App.css'
import ThemeDivider from './ui/ThemeDivider';
import { FaCircleMinus, FaCirclePlus, FaCartShopping, FaXmark, FaCircleQuestion } from "react-icons/fa6";
import Modal from "react-modal" 
import QRCode from 'react-qr-code';
import formatPrice from './utils/formatPrice';

interface IBanners {
  id: number;
  img: string;
};

interface IPromotions {
  id: Number;
  title: string;
  description?: string;
};

interface IProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  old_price: number;
  isActive: boolean;
  img: string;
  count?: number | undefined;
}

interface IMenuList {
  id: number;
  menu_title: string;
  img: string;
  categories: {
    id: number;
    category_title: string;
    products: IProducts[];
  } [];
};

function App() {

  const banners: IBanners[] = [
    {
      id: 1,
      img: 'https://ecco.kz/img/684_5181_News-400x254.jpg'
    },
    {
      id: 2,
      img: 'https://delmar-spb.ru/i/page/pivo-113.jpg'
    },
    {
      id: 3,
      img: 'https://gcdn.tomesto.ru/img/events_event/000/022/843/f964a1f968f22f8b9eee6d945c69dc1e_full-282693.png'
    },
    {
      id: 4,
      img: 'https://lh3.googleusercontent.com/proxy/pfrsIZ6wwnHcH9ei7utTL4TzFdmn4gUXy5HpB3lzD6HXWpp7KY4gzeo6Ul10diBlPH6OqLP8_uPZIsuUyb5XL57jczCme8pkFUTNJYYmjUfgD3XeBqPj'
    },
  ];
   
  const promotions: IPromotions[] = [
    {
      id: 1,
      title: 'АКЦИЯ НА ПИВО',
      description: 'При заказе кружки фирменного пива, второй абсолютно в подарок!'
    },
  ];


  const [productList, setProductList] = useState<IMenuList[]>([
    {
      id: 1,
      menu_title: 'Меню ресторана',
      img: 'https://e1.edimdoma.ru/data/posts/0002/7253/27253-ed4_wide.jpg?1671786759',
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
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/WgykJzu85H_thumb.jpeg'
            },
            {
              id: 2,
              description: 'Рыбное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Сельдь под шубой',
              old_price: 2200,
              price: 1900,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/vWZX42y8vE_thumb.jpeg',
              count: 0
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
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 4,
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              title: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/mi8vTWknvq_thumb.jpeg',
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
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 6,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: false,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 7,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 8,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            }
          ]
        },
      ]
      
    },
    {
      id: 2,
      menu_title: 'Завтраки',
      img: 'https://opis-cdn.tinkoffjournal.ru/mercury/main_recept-gruzia.gbgyes.jpg',
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
              isActive: true,
              img: 'https://gotovim-doma.ru/images/recipe/a/af/aaf296508a1b60d2aeb7460574aadcfb_l.jpg'
            },
            {
              id: 2,
              description: 'Рыбное филе, картофель, яйцо, морковь, зеленый горошек, маринованные огурцы',
              title: 'Сельдь под шубой',
              old_price: 2200,
              price: 1900,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/vWZX42y8vE_thumb.jpeg',
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
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 4,
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              title: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/mi8vTWknvq_thumb.jpeg',
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
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 6,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: false,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 7,
              title: 'Харчо',
              description: 'Украинский харчо от нашего шеф повара',
              old_price: 2500,
              price: 2300,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
            },
            {
              id: 8,
              title: 'Мясо по казахски',
              description: 'Томленая телятина с картофельным пюре под имбирно чесночным соусом',
              old_price: 0,
              price: 2500,
              isActive: true,
              img: 'https://kamigroup.fra1.cdn.digitaloceanspaces.com/kami/prod/menuItemThumbnails/kJjem0xN4q_thumb.jpeg'
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

  const incrementCount = (menuId: number, categoryId: number, productId: number, operations: boolean) => {
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
          <div className="flex bg-gray-500 w-full items-end bg-[url('https://cdn.britannica.com/02/239402-050-ACC075DB/plates-of-vegan-foods-ready-serve-restaurant-London.jpg')]">
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
                  <div className='flex flex-row items-center'>Ресторан Svoy <FaCircleQuestion className='ms-2' size={24}/></div>
                </p>
              </div>
            </div>
          </div>
          <div className='w-full py-5 bg-white rounded-t-3xl'>
            {
              searchText.length === 0 &&
              <>
                <div className='flex flex-row w-full overflow-y-scroll no-scrollbar h-[100px] pe-5'>
                  {banners.length > 0 && banners.map((banner, index)=>
                    <img src={banner.img} className='rounded-lg ms-5 h-[100px] w-[190px]' key={index}/>
                  )}
                </div>
                <div className='w-full px-5 pt-5'>
                  {
                    promotions.map((promotion, index) =>
                    <div className='w-full' key={index}>
                      <div> 
                        <p className={`text-xl font-semibold text-blue-500`}>{promotion.title}</p>
                        <span className='text-gray-500'>
                          При заказе кружки фирменного пива, второй абсолютно в подарок!
                        </span>
                      </div>
                      <div className='w-full flex justify-end'>
                        <span className='text-${firstColor}'>
                          до 03.05.2024
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
            <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5'>
              {
                productList.map((menu, index)=>
                  <div key={index} onClick={()=>{setSelectedMenu(menu.id)}}>
                    {
                      menu.id === selectedMenu ?
                      <div className='w-[120px] p-3 bg-blue-500 rounded-xl text-center me-3 h-[170px] cursor-pointer' key={index} >
                        <img className='object-cover w-[100px] h-[100px] rounded-full mx-auto' src={menu.img} />
                        <p className='text-white mt-1 text-sm font-semibold'>{menu.menu_title}</p>
                      </div>
                      :
                      <div className='w-[120px] p-3 bg-gray-100 rounded-xl text-center me-3 h-[170px] cursor-pointer' key={index}>
                        <img className='object-cover  w-[100px] h-[100px] rounded-full mx-auto' src={menu.img}/>
                        <p className='text-sm mt-1'>{menu.menu_title}</p>
                      </div>
                    }
                  </div>
                )
              }
            </div>
            <div className='px-5 pt-5'>
              <input type="text" placeholder='Поиск' onChange={(e)=>{setSearchText(e.target.value)}} value={searchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className='w-full flex flex-row overflow-y-scroll no-scrollbar px-5 pt-5 pb-5 sticky top-0 border-b-2 border-gray-200 bg-white'>
              {
                productList
                .filter(menu => menu.id === selectedMenu)
                .map((menu, index)=>
                <React.Fragment key={index}>
                  {
                    menu.categories.map((category, index)=>
                    <div key={index}>
                      {
                        category.id === selectedCategory ?
                        <button className={`bg-blue-500 py-2 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap`} key={index} onClick={()=>{setSelectedCategory(category.id)}}>
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
            <div className='w-full p-5 pb-[50px]'>
              {productList.filter(menu => menu.id === selectedMenu).map((menu)=>
                <div key={menu.id}>
                  {
                    menu.categories.map((category, index) =>
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
                              <div className={`flex w-full py-3 ${!product.isActive && 'opacity-35'}`} key={indexProduct}>
                                {
                                  product.img &&
                                  <div className='me-3'>
                                    <img className='rounded-lg' width={150} height={150} src={product.img}/>
                                  </div>     
                                }
                                <div className='w-full flex flex-col justify-between'>
                                  <div>
                                    <p className='font-semibold text-lg line-clamp-3'>{product.title}</p>
                                    {
                                      !product.isActive &&
                                      <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                                    }
                                    
                                    <p className='text-gray-500 mt-1 line-clamp-2 text-sm'>{product.description}</p>
                                  </div>
                                  <div className='flex flex-row justify-between items-end'>
                                    <div className='flex flex-row items-end'>
                                      <span className='text-xl font-semibold text-blue-500'>{formatPrice(product.price)}</span>
                                      {
                                        product.old_price > 0 &&
                                        <span className='text-lg text-gray-400 line-through ms-3'>{formatPrice(product.old_price)}</span>
                                      }
                                    </div>
                                    {
                                      product.isActive &&
                                      <div className='flex flex-row items-center'>
                                        {
                                          product.count !== undefined && product.count > 0 && 
                                          <>
                                            <FaCircleMinus size={24} className='text-blue-500' onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                            <span className='text-xl font-semibold px-3'>{product.count}</span>
                                          </>
                                        }
                                        <FaCirclePlus size={24} className='text-blue-500' onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
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
          </div>
          {
            totalCount > 0 &&
            <div className={`transition duration-300 ease-in-out flex fixed bottom-0 z-49 w-full text-center max-w-[899px] px-10 py-5 justify-center ${totalCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button className='bg-blue-500 py-2 hover:bg-blue-700 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap'>
                <div className='flex flex-row items-center' onClick={() => setShowModal(true)}><FaCartShopping className='me-3'/> Оформить корзину {formatPrice(totalPrice)}</div>
              </button>
            </div>
          }
          
          <Modal
            isOpen={showModal}
            ariaHideApp={false}
            contentLabel="Modal"
            className={'w-full max-w-[899px] bg-white h-full z-50 p-5'}
          >
            <div className='w-full flex justify-between'>
              <span className='text-blue-500  text-3xl'>Корзина</span>
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
                          <div className={`flex w-full pt-2 ${!product.isActive && 'opacity-35'}`} key={indexProduct}>
                            <div className='w-full flex flex-col justify-between'>
                              <div>
                                <p className='text-lg line-clamp-3'>{product.title}</p>
                                {
                                  !product.isActive &&
                                  <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                                }
                              </div>
                              <div className='flex flex-row justify-between mt-2'>
                                {
                                  product.isActive &&
                                  <div className='flex flex-row items-center'>
                                    {
                                      product.count !== undefined && product.count > 0 && 
                                      <>
                                        <FaCircleMinus size={24} className='text-blue-500' onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                        <span className='text-xl font-semibold px-3'>{product.count}</span>
                                      </>
                                    }
                                    <FaCirclePlus size={24} className='text-blue-500' onClick={()=>{incrementCount(menu.id,category.id, product.id, true);}}/>
                                  </div>
                                }
                                <div className='flex flex-row items-end'>
                                  <span className='text-xl font-semibold text-blue-500'>{formatPrice(product.price*(product.count || 0))}</span>
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
      </div>

      </div>
      
    </>
  )
}

export default App
