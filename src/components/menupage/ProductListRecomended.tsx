import React from 'react'
import ThemeDivider from '../../ui/ThemeDivider'
import { BACK_HOST } from '../../configs/config'

export default function ProductListRecomended({recomendedProduct}:{recomendedProduct: IProducts[]}) {
  return (
    <>
        <div className='px-5'>
            <p className='font-semibold ' >Рекомендованные</p>
            <div className='flex flex-row gap-5 pt-4 w-full overflow-y-scroll no-scrollbar'>
              {
                recomendedProduct.map(product => 
                  <div key={product.id}>
                    <div className='flex w-[250px]'>
                      <div className='w-[80px]'>
                      {
                        product.photo &&
                        <img className='w-[80px] h-[80px] rounded-xl' src={BACK_HOST + product.photo}/>
                      }
                      </div>
                      <div>
                        <p className='line-clamp-2 text-sm font-semibold mt-1'>
                          {product.title}
                        </p>
                        <p className='pb-1 line-clamp-2 text-sm text-gray-500'>
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <ThemeDivider pt={3}/>
        </div>
    </>
  )
}
