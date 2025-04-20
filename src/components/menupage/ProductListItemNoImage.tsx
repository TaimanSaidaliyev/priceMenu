import React from 'react'
import { BACK_HOST, BASE_TEXT, HEADER_TEXT } from '../../configs/config';
import { getTextColorForBackground } from '../../utils/getTextColor';
import formatPrice from '../../utils/formatPrice';
import { FaCircleMinus, FaCirclePlus, FaPepperHot } from 'react-icons/fa6';
import ThemeDivider from '../../ui/ThemeDivider';
import ProductTags from './ProductTags';

export default function ProductListItemNoImage({
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
        <div className={`flex w-full py-2 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
            <div className='w-full flex flex-col justify-between me-5 cursor-pointer' onClick={()=>{setProduct(product); setShowProductModal(true)}}>
                <div className='pb-1'>
                    <div className='flex'>
                        <span className={`font-semibold ${HEADER_TEXT} line-clamp-3`}>
                            {product.title}
                            {product.old_price > 0 && (
                            <span
                                className={`rounded-md px-1 ms-1 inline-block ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}
                                style={{ backgroundColor: establishment.default_color }}
                            >
                                -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                            </span>
                            
                            )}
                        </span>
                    </div>
                    {
                        !product.is_active &&
                        <p className='font-semibold text-base mt-1'>Временно отсутствует</p>
                    }
                    <p className={`text-gray-500 mt-1 line-clamp-2 ${BASE_TEXT}`}>{product.description}</p>
                </div>
                <ProductTags product={product} establishment={establishment}/>

            </div>
            <div className='text-nowrap'>
                <div>
                    <p className='text-lg font-semibold text-center' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price)}</p>
                    {
                        product.old_price > 0 &&
                        <p className='text-base text-gray-400 line-through text-center'>{formatPrice(product.old_price)}</p>
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
                        <button className="text-white py-1 flex flex-col justify-center px-2 rounded-xl text-sm" onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}} style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
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
