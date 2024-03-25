import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import parseString from '../parser/parser';
import { useFetching } from '../hooks/useFetching';
import { Dictionary } from '../api/api';
import formatPrice from '../utils/formatPrice';
import ThemeDivider from '../ui/ThemeDivider';
import { WEBSITE_NAME } from '../configs/config';

export default function ListForWaiterPage() {
    document.title = WEBSITE_NAME + 'Заказы клиента';
    const urlParams = new URLSearchParams(window.location.search);
    const productsParam = urlParams.get('products');
    const parsedArray = parseString(productsParam || '');
    const [productList, setProductList] = useState<IProducts[]>([]);
    const [total, setTotal] = useState<number>(0);

    const [getPromotionsList, isGetPromotionsListLoading, isGetPromotionsListError] = useFetching(async () => {
        const response = await Dictionary.getProductsByIds(parsedArray);
        setProductList(response.data);
    });

    useEffect(()=>{
        getPromotionsList();
    },[])

    useEffect(()=>{
        let total = 0;
        productList.map((product)=>{
            total = total + product.price*(product.count || 0);
        })
        setTotal(total);
    },[productList])

    return (
        <div className='flex w-full justify-center'>
            <ToastContainer/>
            <div className='bg-white max-w-[1366px] w-full border-gray-200 border'>
                <div className='p-5'>
                    <span className='text-2xl font-semibold'>Заказы клиента</span>
                </div>
                <div className="p-5">
                    {
                        productList && productList.map((product, indexProduct)=>
                        <>

                            <div className={`flex w-full pt-2 ${!product.is_active && 'opacity-35'}`} key={indexProduct}>
                                <div className='w-full flex flex-col justify-between'>
                                <div>
                                    <div className='flex justify-between'>
                                        <p className='text-lg line-clamp-3'>{product.title}</p>
                                        <span className='text-xl font-semibold'>x{product.count}</span>
                                    </div>
                                    
                                    {
                                    !product.is_active &&
                                    <p className='font-semibold text-md  mt-1'>Временно отсутствует</p>
                                    }
                                </div>
                                <div className='flex flex-row justify-between mt-2'>
                                    {
                                        product.additional_code !== '' 
                                        ? <span className='text-base'>Код: {product.additional_code}</span>
                                        : <span className='text-base'></span>
                                    }
                                    <span className='text-base'>{product.price} x {product.count || 0} = {formatPrice(product.price*(product.count || 0))}</span>
                                </div>
                                <ThemeDivider pt={5}/>
                                </div>
                            </div>
                        </>
                        )
                    }
                    <div className='flex flex-row justify-between pt-3'>
                        <p className='text-lg line-clamp-3'>Общий итог</p>
                        <p className='text-lg line-clamp-3'>{formatPrice(total)}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
