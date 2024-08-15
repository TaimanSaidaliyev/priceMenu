import { FaChevronDown, FaCircleMinus, FaCirclePlus, FaPlus } from "react-icons/fa6";
import { BACK_HOST } from "../../configs/config";
import { getTextColorForBackground } from "../../utils/getTextColor";
import formatPrice from "../../utils/formatPrice";
import { isLight } from "../../pages/EstablishmentMenuPage";
import ProductListItem from "./ProductListItem";
import { useEffect, useRef, useState } from "react";
import Scrollspy from "react-scrollspy";

export const ProductList = ({productList, selectedMenu, searchText, establishment, incrementCount, setShowCategoryModal, isGetProductListLoading, showProductModal, setShowProductModal, setProduct}:{productList: IMenuList[], selectedMenu: number, searchText: string, establishment?: IEstablishment, incrementCount: Function, setShowCategoryModal: Function, isGetProductListLoading: boolean, showProductModal: boolean, setShowProductModal: Function, setProduct: Function }) => {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);

    const categories = productList.filter(menu => menu.id === selectedMenu).flatMap(menu => menu.categories.map(category => category.category_title));

    useEffect(() => {
      if (activeCategory && navRef.current) {
        const activeCategoryElement = document.querySelector<HTMLAnchorElement>(`a[href="#${activeCategory}"]`);
        if (activeCategoryElement && activeCategory !== '') {
          const { offsetLeft, offsetWidth } = activeCategoryElement;
          navRef.current.scrollTo({
            left: offsetLeft - navRef.current.clientWidth / 2 + offsetWidth / 2,
            behavior: 'smooth',
          });
        }
      }
      
    }, [activeCategory]);

    const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>, category: string) => {
      event.preventDefault();
      const targetElement = document.getElementById(category);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: 'smooth',
        });
        setActiveCategory(category);
      }
    };

    useEffect(() => {
      setLoaded(true);
      if(!loaded){
        navRef.current?.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
      
    }, [categories]);

    if(establishment?.menu_view_type === "List"){
      
      return (
        <>
          <div
            ref={navRef}
            className="flex space-x-4 overflow-x-auto whitespace-nowrap bg-white sticky top-0 z-10 px-5 pt-5 w-full no-scrollbar backdrop-blur-lg bg-opacity-70"
          >
            {
              establishment &&
                <Scrollspy
                items={categories}
                currentClassName={`font-bold border-b-2 pb-4 border-[${getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}]`}
                className="flex space-x-4"
                onUpdate={(el: HTMLElement | undefined) => setActiveCategory(el ? el.getAttribute('id') || '' : '')}
                offset={-60}
              >
                {categories.map(category => 
                  {                
                    return (
                      <a
                        href={`#${category}`}
                        key={category}
                        className={`text-gray-700 cursor-pointer`}
                        onClick={(e) => handleCategoryClick(e, category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    )
                  }
              )}
              </Scrollspy>
            }
            
          </div>
          <div className='w-full pb-[100px]'>
          {productList.filter(menu => menu.id === selectedMenu).map((menu) => (
          <div key={menu.id}>
            {categories.map(category => (
              <div id={category} key={category}>
                {
                    searchText.length === 0 &&
                    <div className='flex flex-row justify-between backdrop-blur-md items-center bg-white/60 py-1 z-1 p-5 z-10'>
                      <p className='text-xl font-semibold my-3'>
                        {category}
                      </p>
                    </div>
                }
                {menu.categories
                  .filter(cat => cat.category_title === category) 
                  .flatMap(cat => cat.products
                    .sort((a, b) => a.sorting_number - b.sorting_number)
                    .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                    .map((product, indexProduct) => (
                    <div key={product.id}>
                      <ProductListItem 
                        category={cat} 
                        establishment={establishment} 
                        incrementCount={incrementCount} 
                        indexProduct={indexProduct} 
                        menu={menu} 
                        product={product} 
                        setProduct={setProduct} 
                        setShowProductModal={setShowProductModal} 
                        showProductModal={showProductModal}
                      />
                    </div>
                  )))
                }
              </div>
            ))}
          </div>
          ))}
          </div>
        </>
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