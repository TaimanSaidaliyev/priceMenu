import { useEffect, useState } from "react";
import FullSizeModal from "../../ui/FullSizeModal";
import { stringifyArray } from "../../parser/parser";
import { getTextColorForBackground } from "../../utils/getTextColor";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import ThemeDivider from "../../ui/ThemeDivider";
import formatPrice from "../../utils/formatPrice";
import QRCode from "react-qr-code";

export const ModalWindow = ({establishment, showModal, setShowModal, cartProducts, incrementCount, total } : {establishment?: IEstablishment, showModal: boolean, setShowModal: Function, cartProducts: IMenuList[], incrementCount: Function, total: any }) => {
    const [urlQr, setUrlQr] = useState<string>('');
    
    useEffect(()=>{
      const menuList: IMenuList[] = cartProducts;
      const productsWithCount: IProducts[] = menuList.flatMap(menu => 
        menu.categories.flatMap(category => 
            category.products.filter(product => product.count || 0 > 0)
        )
      );
      setUrlQr(`https://${window.location.hostname}/list_for_waiter/?products=` + stringifyArray(productsWithCount));
      
      
    },[cartProducts]);
  
    return (
      <FullSizeModal isOpen={showModal} setIsOpen={setShowModal}>
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
                                      <FaCircleMinus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id, category.id, product.id, false);}}/>
                                      <span className='text-xl font-semibold px-3'>{product.count}</span>
                                    </>
                                  }
                                  <FaCirclePlus size={24} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}} onClick={()=>{incrementCount(menu.id,category.id, product.id, true);}}/>
                                </div>
                              }
                              <div className='flex flex-row items-end'>
                                <span className='text-xl font-semibold' style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{formatPrice(product.price*(product.count || 0))}</span>
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
            <ThemeDivider pt={5} pb={5}/>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }} className='pt-3'>
              <QRCode
                size={128}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                fgColor='#3b3b3b'
                value={urlQr}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className='w-full text-center mt-2'>
              <span>Покажите полученный QR код официанту</span>
            </div>
            
        </div>  
      </FullSizeModal>
    );
  };