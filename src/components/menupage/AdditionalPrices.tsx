import React, { useEffect, useState } from 'react'
import DialogModal from '../../ui/DialogModal';
import { Dialog } from '@headlessui/react';
import { ThemeInputNumber, ThemeInputText } from '../../ui/ThemeForms';
import { useFetching } from '../../hooks/useFetching';
import { Establishment, SetDict } from '../../api/api';
import NotificationToast from '../../ui/NotificationToast';
import { toast } from 'react-toastify';

export default function AdditionalPrices({product, establishmentId, getProduct}:{product: IProducts, establishmentId: string, getProduct: Function}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    //@ts-ignore
    const [productAddPrice, setProductAddPrice] = useState<IProducts>({
        title: '', price: 0, parent: product.id, establishment: establishmentId, category: product.category
    });

    const notifySave = () => toast.success("Блюдо создано", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [addProduct] = useFetching(async () => {
        const response = await SetDict.addProductByCategory(productAddPrice)
        .then((res)=>{
           notifySave();
           setIsOpen(false);
           getProduct();
        })
        .catch((e)=>{
            NotificationToast(e.message, 'error');
        });;
    });

    useEffect(()=>{
        setProductAddPrice((prevProduct) => ({...prevProduct, parent: product.id}));
        setProductAddPrice((prevProduct) => ({...prevProduct, category: product.category}));
    },[product]);

    return (
            <div className='flex justify-center'>
                <div className='flex flex-row justify-between w-full'>
                    <span className='font-semibold'>
                        Варианты цен
                    </span>
                    <button
                        onClick={()=>setIsOpen(true)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                    >
                        Добавить цену
                    </button>
                </div>
                <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 w-full text-center flex-grow sm:mt-0 sm:text-left">
                                <Dialog.Title as="h2" className="text-lg font-semibold leading-6 text-gray-900">
                                    Добавить цену для {product.title}
                                </Dialog.Title>
                                <div className='flex gap-3 mt-3'>
                                    <ThemeInputText placeholder='Доп атрибут' value={productAddPrice.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProductAddPrice((prevProduct) => ({...prevProduct, title: e.target.value}));}} className={'w-full'} required/>
                                    
                                    <ThemeInputNumber 
                                        //@ts-ignore
                                        value={productAddPrice.price} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProductAddPrice((prevProduct) => ({...prevProduct, price: e.target.value}));}} className={'w-full'} required />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex justify-end sm:flex-row sm:px-6 gap-2">
                        <button onClick={()=>{addProduct()}}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                        >
                            Создать
                        </button>
                        <button
                            type="button"

                            onClick={()=>{setIsOpen(false)}}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Отменить
                        </button>
                    </div>
                </DialogModal>
            </div>
    )
}
