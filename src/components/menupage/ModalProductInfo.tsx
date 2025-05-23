import { XMarkIcon } from "@heroicons/react/24/outline";
import { BACK_HOST } from "../../configs/config";
import DialogModal from "../../ui/DialogModal";
import { getTextColorForBackground } from "../../utils/getTextColor";
import formatPrice from "../../utils/formatPrice";
import ProductTags from "./ProductTags";
import { useEffect, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export const ModalProductInfo = ({
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
    const [isMultiple, setIsMultiple] = useState<boolean>(false);

    useEffect(()=>{
        if (product.child_products?.length || 0 > 0) {
          setIsMultiple(true);
        }
        else {
          setIsMultiple(false);
        }
    },[product]);

    return (
      <DialogModal isOpen={showProductModal} setIsOpen={setShowProductModal}>
        <div className='w-full flex flex-col overflow-y-scroll no-scrollbar border-b-2 border-gray-200 z-30'>
            <img src={product.photo ? BACK_HOST + product.photo : '/img/food_no_image.png'} className={'object-cover rounded-2xl max-h-[400px]'}/>
            <button
              type="button"
              className="absolute rounded-full right-4 top-3 bg-white text-gray-400 p-1"
              onClick={() => setShowProductModal(false)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className='px-2 py-3'>
              <p className='text-xl font-semibold mb-2'>{product.title}</p>
              <ProductTags product={product} establishment={establishment}/>
              {
                product.old_price > 0 &&
                <div className='rounded-md px-2 py-1 flex justify-center items-center absolute' style={{top: 10, left: 10, backgroundColor: establishment?.default_color}}>
                  <span className={`text-xl ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>
                    -{Math.round(((product.old_price - product.price)/product.old_price)*100)}%
                  </span>
                </div>
              }
              {
                !isMultiple &&
                <div className='flex flex-row items-end mt-3'>
                  <span className='text-2xl font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price)}</span>
                  {
                    product.old_price > 0 &&
                    <>
                    <span className='text-xl text-gray-400 line-through ms-2'>{formatPrice(product.old_price)}</span>
                    </>
                    
                  }
                </div>
              }
              {
                !isMultiple &&
                <div className="pt-2">
                  {product.child_products?.map((subProduct)=>
                      <div className="flex flex-row justify-between gap-2 pt-1" key={subProduct.id}>
                        <p className="font-semibold">{subProduct.title}</p>
                        <p>{formatPrice(subProduct.price)}</p>
                        
                        <div className='flex flex-row items-center mt-1 w-[80px] h-[28px]'>
                          <div className='flex flex-row justify-center text-center w-full'>
                              {
                              product.count !== undefined && product.count > 0 && 
                              <>
                                  <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} 
                                    onClick={()=>{incrementCount(selectedMenu, product.category, product.id, false);}}/>
                                  <span className={`text-md font-semibold px-1`}>{product.count}</span>
                                  <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} 
                                    onClick={()=>{incrementCount(selectedMenu, product.category, product.id, true);}}/>
                              </>
                              }
                              {
                              !(product.count !== undefined && product.count) && 
                              <button 
                                  className="text-white py-1 flex flex-col justify-center px-2 rounded-xl text-sm" 
                                  onClick={()=>{incrementCount(selectedMenu, product.category, product.id, true);}} 
                                  style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
                                  Добавить 
                              </button>
                              }
                          </div>
                        </div>

                      </div>
                  )}
                </div>
              }
              <p className='mt-3 text-md text-gray-600 '>{product.description}</p>

            </div>
        </div>
      </DialogModal>
    );
  }
  