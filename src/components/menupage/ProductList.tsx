import { FaChevronDown, FaCircleMinus, FaCirclePlus, FaPlus } from "react-icons/fa6";
import { BACK_HOST, BASE_TEXT, HEADER_TEXT } from "../../configs/config";
import { getTextColorForBackground } from "../../utils/getTextColor";
import formatPrice from "../../utils/formatPrice";
import ThemeDivider from "../../ui/ThemeDivider";
import { isLight } from "../../pages/EstablishmentMenuPage";

export const ProductList = ({productList, selectedMenu, searchText, establishment, incrementCount, setShowCategoryModal, isGetProductListLoading, showProductModal, setShowProductModal, setProduct}:{productList: IMenuList[], selectedMenu: number, searchText: string, establishment?: IEstablishment, incrementCount: Function, setShowCategoryModal: Function, isGetProductListLoading: boolean, showProductModal: boolean, setShowProductModal: Function, setProduct: Function }) => {
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
                            <p className='text-xl font-semibold my-3'>
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
                          <div className='px-5'>
                            <div className={`flex w-full py-3 ${!product.is_active && 'opacity-35'} pb-5 z-1`} key={indexProduct}>
                              <div className='w-full flex flex-col justify-between me-5'>
                                <div>
                                  <p className={`font-semibold ${HEADER_TEXT} line-clamp-3`}>{product.title}</p>
                                  {
                                    !product.is_active &&
                                    <p className='font-semibold text-base mt-1'>Временно отсутствует</p>
                                  }
                                  <div className='flex flex-row items-end mt-2'>
                                    <span className='text-lg font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price)}</span>
                                    {
                                      product.old_price > 0 &&
                                      <span className='text-base text-gray-400 line-through ms-2'>{formatPrice(product.old_price)}</span>
                                    }
                                  </div>
                                  <p className={`text-gray-500 mt-1 line-clamp-3 ${BASE_TEXT}`}>{product.description}</p>
                                </div>
                                <div className='flex flex-row justify-between items-end'>
                                  
                                </div>
                              </div>
                              <div className='relative' >
                                <div onClick={()=>{setProduct(product); setShowProductModal(true)}}>
                                {
                                  product.photo &&
                                  <>
                                    <div className='me-3 w-[110px]'>
                                      <img className='object-cover rounded-xl w-[110px] h-[110px]' src={`${BACK_HOST + product.photo}`}/>
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
                              
                              {
                                product.is_active &&
                                <div className='flex flex-row items-center mt-1'>
                                  <div className='flex flex-row justify-center text-center w-full ms-[-6px]'>
                                  {
                                    product.count !== undefined && product.count > 0 && 
                                    <>
                                      <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className={`text-md font-semibold px-1`}>{product.count}</span>
                                      <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}}/>
                                    </>
                                  }
                                  {
                                    !(product.count !== undefined && product.count) && 
                                    <button className="text-white py-2 px-4 rounded-3xl w-[110px]" onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}} style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
                                      Добавить 
                                    </button>
                                  }
                                  </div>
                                </div>
                              }
                              </div>
                            </div>
                            <ThemeDivider/>
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
                              
                              <p className='line-clamp-2 text-center text-sm font-semibold mt-1'>
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