import React from 'react'
import { BACK_HOST, BASE_TEXT, HEADER_TEXT } from '../../configs/config';
import { getTextColorForBackground } from '../../utils/getTextColor';
import formatPrice from '../../utils/formatPrice';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import ThemeDivider from '../../ui/ThemeDivider';

export default function ProductListItem({
    product, 
    indexProduct, 
    establishment, 
    setShowProductModal, 
    setProduct, 
    incrementCount,
    menu,
    category
    }:{
    product: any, 
    indexProduct: any, 
    establishment: any, 
    showProductModal: boolean, 
    setShowProductModal: Function, 
    setProduct: Function,
    incrementCount: Function,
    menu: any,
    category: any
    }) {
  return (
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
