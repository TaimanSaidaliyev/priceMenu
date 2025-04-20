import React, { useEffect, useState } from 'react'
import { BACK_HOST, BASE_TEXT, HEADER_TEXT } from '../../configs/config';
import { getTextColorForBackground } from '../../utils/getTextColor';
import formatPrice from '../../utils/formatPrice';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import ThemeDivider from '../../ui/ThemeDivider';
import ProductTags from './ProductTags';

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
        product: IProducts, 
        indexProduct: any, 
        establishment: any, 
        showProductModal: boolean, 
        setShowProductModal: Function, 
        setProduct: Function,
        incrementCount: Function,
        menu: any,
        category: any
    }) {
    
    const [priceFrom, setPriceFrom] = useState<number>(0);

    useEffect(()=>{
        if (product.child_products?.length || 0 > 0) {
            const minPrice = product.child_products?.reduce(
              (acc, curr) => (curr.price < acc ? curr.price : acc),
              product.child_products[0].price
            );
            setPriceFrom(minPrice || 0);
          }
    },[product]);
    
    return (
        <div className='px-5'>
            <div className={`flex w-full py-2 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
                <div className='w-full flex flex-col justify-between me-5'>
                    <div>
                        <p className={`font-semibold ${HEADER_TEXT} line-clamp-3`}>{product.title}</p>
                        {
                        !product.is_active &&
                        <p className='font-semibold text-base mt-1'>Временно отсутствует</p>
                        }
                        {!priceFrom 
                        ?
                        <div className='flex flex-row items-end mt-2'>
                            <span className='text-lg font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>
                                {formatPrice(product.price)}
                            </span>
                            {
                                product.old_price > 0 &&
                                <span className='text-base text-gray-400 line-through ms-2'>{formatPrice(product.old_price)}</span>
                            }
                        </div>
                        :
                        <span className='text-lg font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>
                           от { formatPrice(priceFrom)}
                        </span>
                        }
                        <p className={`text-gray-500 mt-1 line-clamp-2 ${BASE_TEXT}`}>{product.description}</p>
                        
                        
                    </div>
                    <div className='flex flex-row justify-between items-end pt-1'>
                        <ProductTags product={product} establishment={establishment}/>
                    </div>
                </div>
                <div className='relative w-[80px]' >
                    <div onClick={()=>{setProduct(product); setShowProductModal(true)}}>
                        {
                            product.photo &&
                            <>
                            <div className='me-3 w-[80px]'>
                                <img className='object-cover rounded-xl w-[80px] h-[80px]' src={`${BACK_HOST + product.photo}`}/>
                            </div>
                            {
                                product.old_price > 0 &&
                                <div className='rounded-md px-2 py-1 flex justify-center items-center absolute' style={{top: 1, right: 1, backgroundColor: establishment.default_color}}>
                                    <span className={`${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'}`}>
                                        -{Math.round(((product.old_price - product.price)/product.old_price)*100)}%
                                    </span>
                                </div>
                            }
                            </>
                        }
                    </div>
                
                {
                    product.is_active && !priceFrom &&
                    <div className='flex flex-row items-center mt-1 w-[80px] h-[28px]'>
                        <div className='flex flex-row justify-center text-center w-full'>
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
                            <button 
                                className="text-white py-1 flex flex-col justify-center px-2 rounded-xl text-sm" 
                                onClick={()=>{incrementCount(menu.id, category.id, product.id, true);}} 
                                style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
                                Добавить 
                            </button>
                            }
                        </div>
                    </div>
                }
                {
                    priceFrom ?
                    <button 
                        className="text-white py-1 flex flex-col justify-center px-2 rounded-xl text-sm mt-1" 
                        onClick={()=>{setProduct(product); setShowProductModal(true);}} 
                        style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
                        Добавить 
                    </button>
                    : <></>
                }
                </div>
            </div>
            <ThemeDivider/>
        </div>
    )
}
