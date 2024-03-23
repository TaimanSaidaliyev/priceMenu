import { useEffect, useState, Fragment, useRef } from 'react';
import { useFetching } from './..//hooks/useFetching';
import { Dictionary, Establishment, SetDict } from '../api/api';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { FaGripVertical, FaPlus, FaStop, FaTrash } from 'react-icons/fa6';
import ThemeDivider from '../ui/ThemeDivider';
import {ThemeInputNumber, ThemeInputText, ThemeSwitcher, ThemeTextarea} from '../ui/ThemeForms';
import { BACK_HOST } from '../configs/config';
import { FaPen } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react'
import { FaExclamationTriangle } from 'react-icons/fa';
import { isFile } from '../utils/ifFile';

export default function MenuEditPage() {
    const [productList, setProductList] = useState<IProducts[]>([]);
    const [menuList, setMenuList] = useState<IMenuList[]>([]);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<string>('0');
    const [selectedCategory, setSelectedCategory] = useState<string>('0');
    const [selectedProduct, setSelectedProduct] = useState<string>('0');
    const [establishment, setEstablishment] = useState<IEstablishment>();
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [isSaveProductModalOpen, setIsSaveProductModalOpen] = useState<boolean>(false);
    const [isMenuAddModalOpen, setIsMenuAddModalOpen] = useState<boolean>(false);
    const [isMenuEditModalOpen, setIsMenuEditModalOpen] = useState<boolean>(false);
    const [isCategoryAddModalOpen, setIsCategoryAddModalOpen] = useState<boolean>(false);
    const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState<boolean>(false);
    const [isDeleteWarningMenuModalOpen, setIsDeleteWarningMenuModalOpen] = useState<boolean>(false);
    const [isDeleteWarningCategoryModalOpen, setIsDeleteWarningCategoryModalOpen] = useState<boolean>(false);
    const [isDeleteWarningProductModalOpen, setIsDeleteWarningProductModalOpen] = useState<boolean>(false);
    const [sortProductList, setSortProductList] = useState<IProducts[]>([]);
    const [sortCategoryList, setSortCategoryList] = useState<ICategory[]>([]);

    const product: IProducts = ({id: '', description: 'Описание нового блюда', is_active: true, is_published: true, old_price: 0, price: 0, title: 'Новое блюдо', category: selectedCategory});

    const [getEstablishmentInfomation, isProductInfomationLoading, isProductInfomationError] = useFetching(async () => {
        const response = await Establishment.getEstablishmentInformationById('2' || '0');
        setEstablishment(response.data.establishment);
    });

    const [getMenuList, isGetMenuListLoading, isGetMenuListError] = useFetching(async () => {
        const response = await Dictionary.getMenuListByEstablishmentId('2');
        setMenuList(response.data.menus);
    });

    const [getCategoryList, isGetCategoryListLoading, isGetCategoryListError] = useFetching(async () => {
        const response = await Dictionary.getCategoriesByMenuId(selectedMenu);
        const sortedList = response.data.categories.sort((a: any, b: any) => a.sorting_number - b.sorting_number)
        setCategoryList(sortedList);
    });
    
    const [getProductList, isGetProductListLoading, isGetProductListError] = useFetching(async () => {
        const response = await Dictionary.getProductsByCategoryId(selectedCategory);
        const sortedList = response.data.products.sort((a: any, b: any) => a.sorting_number - b.sorting_number)
        setProductList(response.data.products);
    });

    const [addProduct, isAddProductLoading, isAddProductError] = useFetching(async () => {
        const response = await SetDict.addProductByCategory(product)
        .then((res)=>{
           notifySave();
           setIsChanged(true); 
           getProductList();
           setSelectedProduct(res.data.id);
        })
        .catch((e)=>{
            console.error(e);
        });;
    });

    const [sortProducts, isSortProductsLoading, isSortProductsError] = useFetching(async () => {
        const response = await SetDict.sortingProducts(sortProductList).catch((e)=>{
            console.error(e);
        });;
    });

    const [sortCategories, isSortCategoriesLoading, isSortCategoriesError] = useFetching(async () => {
        const response = await SetDict.sortingCategories(sortCategoryList).catch((e)=>{
            console.error(e);
        });;
    });

    const notifyCancel = () => toast.warn("Изменения отменены", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const notifySave = () => toast.success("Блюдо создано", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    
    useEffect(()=>{
        getEstablishmentInfomation();
        getMenuList();
    },[])

    function SaveAlert () {
        setIsSaveProductModalOpen(true);
    }

    useEffect(()=>{
        setProductList([]);
        setSelectedProduct('0');
        setSelectedCategory('0');
        getCategoryList();
    },[selectedMenu]);

    useEffect(()=>{
        getProductList();
        setSelectedProduct('0');
    },[selectedCategory])

    useEffect(()=>{
        sortProducts();
    },[sortProductList]);

    useEffect(()=>{
        sortCategories();
    },[sortCategoryList]);

    const onDragEndCategoryList = (result: DropResult) => {
        if (!result.destination) return;
    
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
    
        const reorderedItems = Array.from(categoryList);
        const [removed] = reorderedItems.splice(startIndex, 1);
        reorderedItems.splice(endIndex, 0, removed);
    
        const updatedItems = reorderedItems.map((menu, index) => ({
          ...menu,
          sorting_number: index + 1
        }));
    
        setCategoryList(updatedItems);
        setSortCategoryList(updatedItems);
    };

    const onDragEndProductList = (result: DropResult) => {
        if (!result.destination) return;
    
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
    
        const reorderedItems = Array.from(productList);
        const [removed] = reorderedItems.splice(startIndex, 1);
        reorderedItems.splice(endIndex, 0, removed);
    
        const updatedItems = reorderedItems.map((menu, index) => ({
          ...menu,
          sorting_number: index + 1
        }));
        
        setProductList(updatedItems);
        setSortProductList(updatedItems);
    };

    return (
        <div className='flex w-full justify-center'>
            <ToastContainer/>
            <div className='bg-white max-w-[1366px] w-full border-gray-200 border p-5'>
                <button className={`bg-green-700 py-2 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap`}>
                    Общие
                </button>
                <button className={`bg-green-700 py-2 px-4 rounded-3xl text-white font-semibold me-2 whitespace-nowrap`}>
                    Меню
                </button>
                <ThemeDivider pt={3} pb={3}/>
                <div className='flex flex-row w-full items-center gap-3'>
                    <span>Выберите меню:</span>
                    <div className="inline-block relative w-64">
                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                            onChange={(e)=>{isChanged ?  SaveAlert() : setSelectedMenu(e.target.value)}}>
                            <option value={'0'}>Выберите меню из списка</option>
                            {
                                menuList.map((menuItem, index)=>
                                    <option value={menuItem.id} key={menuItem.id}>{menuItem.menu_title}</option>
                                )
                            }
                        </select>
                        
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <button className='p-1 bg-green-500 rounded-md text-white me-1' onClick={()=>{setIsMenuAddModalOpen(true)}}>
                        <FaPlus/>
                    </button>
                    {
                        selectedMenu !== '0' &&
                        <button className='p-1 bg-blue-500 rounded-md text-white me-1' onClick={()=>{setIsMenuEditModalOpen(true)}}>
                            <FaPen/>
                        </button>
                    }
                </div>
                <div className='flex md:flex-row flex-col mt-5 gap-4'>
                    <div className='md:w-[250px] w-full h-auto overflow-auto'>
                        <div className='flex flex-row bg-gray-200 p-3 rounded-md font-semibold justify-between items-center'>
                            <div className='flex flex-row'>
                                {
                                    selectedMenu !== '0' && 
                                    <button className='p-1 bg-green-500 rounded-md text-white me-1' onClick={()=>setIsCategoryAddModalOpen(true)}>
                                        <FaPlus/>
                                    </button>
                                }
                                Категории
                            </div>
                            {
                                selectedCategory !== '0' &&
                                <div className='flex flex-row gap-1'>
                                    <button className='p-1 bg-blue-500 rounded-md text-white' onClick={()=>{setIsCategoryEditModalOpen(true)}}>
                                        <FaPen/>
                                    </button>
                                </div>
                            }
                        </div>
                        <EstablishmentCategoryList categoryList={categoryList} onDragEndCategoryList={onDragEndCategoryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isChanged={isChanged} SaveAlert={SaveAlert}/>
                    </div>
                    <div className='md:w-[350px] w-full'>
                        <div className='flex flex-row bg-gray-200 p-3 rounded-md font-semibold justify-between items-center'>
                            <div className='flex flex-row'>
                                {
                                    selectedCategory !== '0' &&
                                    <button className='p-1 bg-green-500 rounded-md text-white me-1' onClick={()=>{addProduct()}}>
                                        <FaPlus/>
                                    </button>
                                }
                                
                                Блюда
                            </div>
                        </div>
                        <EstablishmentProductList productList={productList} onDragEndProductList={onDragEndProductList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} isChanged={isChanged} SaveAlert={SaveAlert}/>
                    </div>
                    <div className='flex-grow'>
                        {
                            selectedProduct !== '0' && 
                            <ProductCardEdit isChanged={isChanged} setIsChanged={setIsChanged} selectedProduct={selectedProduct} notifyCancel={notifyCancel} notifySave={notifySave} establishment={establishment} getProductList={getProductList} setIsDeleteWarningProductModalOpen={setIsDeleteWarningProductModalOpen}/>
                        }
                    </div>
                </div>
            </div>
            <DialogModal isOpen={isSaveProductModalOpen} setIsOpen={setIsSaveProductModalOpen}>
                <SaveChangesOfProductModalContent setIsSaveProductModalOpen={setIsSaveProductModalOpen}/>
            </DialogModal>
            <DialogModal isOpen={isDeleteWarningMenuModalOpen} setIsOpen={setIsDeleteWarningMenuModalOpen}>
                <DeleteMenuWarning setIsDeleteWarningMenuModalOpen={setIsDeleteWarningMenuModalOpen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} getMenuList={getMenuList}/>
            </DialogModal>
            <DialogModal isOpen={isDeleteWarningCategoryModalOpen} setIsOpen={setIsDeleteWarningCategoryModalOpen}>
                <DeleteCategoryWarning setIsDeleteWarningCategoryModalOpen={setIsDeleteWarningCategoryModalOpen} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} getCategoryList={getCategoryList}/>
            </DialogModal>
            <DialogModal isOpen={isDeleteWarningProductModalOpen} setIsOpen={setIsDeleteWarningProductModalOpen}>
                <DeleteProductWarning setIsDeleteWarningProductModalOpen={setIsDeleteWarningProductModalOpen} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} getProductList={getProductList} setIsChanged={setIsChanged}/>
            </DialogModal>
            <DialogModal isOpen={isMenuAddModalOpen} setIsOpen={setIsMenuAddModalOpen}>
                <MenuAddModalContent setIsMenuAddModalOpen={setIsMenuAddModalOpen} getMenuList={getMenuList} selectedMenu={selectedMenu}/>
            </DialogModal>
            <DialogModal isOpen={isMenuEditModalOpen} setIsOpen={setIsMenuEditModalOpen}>
                <MenuEditModalContent setIsMenuEditModalOpen={setIsMenuEditModalOpen} getMenuList={getMenuList} selectedMenu={selectedMenu} setIsDeleteWarningModalOpen={setIsDeleteWarningMenuModalOpen}/>
            </DialogModal>
            <DialogModal isOpen={isCategoryAddModalOpen} setIsOpen={setIsCategoryAddModalOpen}>
                <CategoryAddModalContent setIsCategoryAddModalOpen={setIsCategoryAddModalOpen} getCategoryList={getCategoryList} selectedCategory={selectedCategory} selectedMenu={selectedMenu}/>
            </DialogModal>
            <DialogModal isOpen={isCategoryEditModalOpen} setIsOpen={setIsCategoryEditModalOpen}>
                <CategoryEditModalContent setIsCategoryEditModalOpen={setIsCategoryEditModalOpen} getCategoryList={getCategoryList} selectedCategory={selectedCategory} selectedMenu={selectedMenu} setIsDeleteWarningCategoryModalOpen={setIsDeleteWarningCategoryModalOpen}/>
            </DialogModal>
        </div>
    )
}

const EstablishmentCategoryList = ({onDragEndCategoryList, categoryList, selectedCategory, setSelectedCategory, isChanged, SaveAlert}:{onDragEndCategoryList: Function, categoryList: ICategory[], selectedCategory: string, setSelectedCategory: Function, isChanged: boolean, SaveAlert: Function}) => {
    return (
        <>
        <DragDropContext onDragEnd={(result)=>onDragEndCategoryList(result)}>
            <Droppable droppableId="droppable">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {categoryList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <button className='w-full text-left' onClick={()=>
                                    {
                                        isChanged ?  SaveAlert() : setSelectedCategory(item.id)
                                    }
                                }>
                                <div className={`flex justify-between items-center ${selectedCategory == item.id.toString() ? 'bg-blue-300' : 'bg-white'} hover:bg-gray-200 p-3 rounded-md cursor-pointer`}>
                                    <span>{item.category_title}</span>
                                    <div {...provided.dragHandleProps}>
                                        <span><FaGripVertical className='text-gray-400 me-3'/></span>
                                    </div>
                                </div>
                            </button>
                        </li>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
        </>
    );
}

const EstablishmentProductList = ({onDragEndProductList, productList, selectedProduct, setSelectedProduct, isChanged, SaveAlert}:{onDragEndProductList: Function, productList: IProducts[], selectedProduct: string, setSelectedProduct: Function, isChanged: boolean, SaveAlert: Function}) => {
    return (
        <DragDropContext onDragEnd={(result)=>onDragEndProductList(result)}>
            <Droppable droppableId="droppable">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {productList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <button className='w-full text-left' 
                                onClick={()=>
                                    {
                                        isChanged ?  SaveAlert() : setSelectedProduct(item.id)
                                    }
                                }>
                                <div className={`flex justify-between items-center ${selectedProduct == item.id.toString() ? 'bg-blue-300' : 'bg-white'} hover:bg-gray-300 p-3 rounded-md cursor-pointer`}>
                                    <span>{item.title}</span>
                                    <div {...provided.dragHandleProps}>
                                        <span><FaGripVertical className='text-gray-400 me-3'/></span>
                                    </div>
                                </div>
                            </button>
                        </li>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

const DialogModal = ({isOpen, setIsOpen, children}:{isOpen: boolean, setIsOpen: Function, children: React.ReactNode}) => {
    return(
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const SaveChangesOfProductModalContent = ({setIsSaveProductModalOpen}:{setIsSaveProductModalOpen: Function}) => {
    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaExclamationTriangle className="h-6 w-6 text-yellow-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Вы изменили данные
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            Информация по выбранному блюду была изменена и ожидает подтверждения изменений.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsSaveProductModalOpen(false)}
                >
                    Ok
                </button>
            </div>
        </>
    );
};

const MenuAddModalContent = ({setIsMenuAddModalOpen, getMenuList, selectedMenu}:{setIsMenuAddModalOpen: Function, getMenuList: Function, selectedMenu: string}) => {
    const [newMenu, setNewMenu] = useState<IMenu>({id: selectedMenu, menu_title: '', establishment: 2, photo: null});
    const formData = new FormData();

    const menuCreatedNotify = () => toast.success("Меню создано", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [addMenu, isAddMenuLoading, isAddMenuError] = useFetching(async () => {
        const response = await SetDict.addMenu(formData).then(()=>{
            menuCreatedNotify();
            setIsMenuAddModalOpen(false);
            getMenuList();
        });
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('menu_title', newMenu.menu_title);
        if (newMenu.photo) {
            formData.append('photo', newMenu.photo);
        }
        formData.append('establishment', newMenu.establishment.toString());

        if((newMenu.photo != undefined || newMenu.photo != null) && newMenu.menu_title != ''){
            addMenu();            
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 min-w-[400px] text-center flex-grow sm:mt-0 sm:text-left">
                            <Dialog.Title as="h2" className="text-lg font-semibold leading-6 text-gray-900">
                                Добавление нового меню
                            </Dialog.Title>

                            <p className='mt-4'>Название меню</p>
                            <ThemeInputText onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewMenu((menu: IMenu)=>({...menu, menu_title: event.target.value}))} required/>
                            <p className='mt-4'>Изображение</p>

                            <input 
                                type="file" 
                                name="small-file-input" 
                                id="small-file-input"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewMenu((menu: IMenu) => ({...menu, photo: event.target.files && event.target.files[0]}))}
                                className="block 
                                    w-full border border-gray-200 
                                    shadow-sm rounded-lg text-sm focus:z-10 
                                    focus:border-blue-500 focus:ring-blue-500 
                                    disabled:opacity-50 disabled:pointer-events-none 
                                    dark:bg-slate-900 dark:border-gray-700 
                                    dark:text-gray-400 dark:focus:outline-none 
                                    dark:focus:ring-1 dark:focus:ring-gray-600
                                    file:bg-gray-100 file:border-0
                                    file:me-4
                                    file:py-2 file:px-4
                                    dark:file:bg-gray-700 dark:file:text-gray-400"
                                    required
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsMenuAddModalOpen(false)}
                    >
                        Отменить
                    </button>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                    >
                        Создать
                    </button>
                </div>
            </form>
        </>
    );
}

const MenuEditModalContent = ({setIsMenuEditModalOpen, getMenuList, selectedMenu, setIsDeleteWarningModalOpen}:{setIsMenuEditModalOpen: Function, getMenuList: Function, selectedMenu: string, setIsDeleteWarningModalOpen: Function}) => {
    const [menu, setMenu] = useState<IMenu>({id: selectedMenu, menu_title: '2', establishment: 2, photo: null});
    const [img, setImg] = useState<string>('');
    const formData = new FormData();

    const menuEditedNotify = () => toast.success("Меню отредактировано", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [getMenu, isgetMenuLoading, isGetMenuError] = useFetching(async () => {
        const response = await SetDict.getMenu(selectedMenu);
        setMenu(response.data.menu);
        setImg(response.data.menu.photo || '');
    });

    const [editMenu, isEditMenuLoading, isEditMenuError] = useFetching(async () => {
        const response = await SetDict.editMenu(formData, menu.id).then(()=>{
            menuEditedNotify();
            setIsMenuEditModalOpen(false);
            getMenuList();
        });
    });

    useEffect(()=>{
        getMenu();
    },[]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('menu_title', menu.menu_title);
        formData.append('establishment', menu.establishment.toString());

        if (isFile(menu.photo)) {
            formData.append('photo', menu.photo);
        }
        else {
            delete menu.photo;
        }

        if(menu.menu_title != ''){
            editMenu();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                        <div className="mt-3 min text-center sm:mt-0 sm:text-left">
                            <Dialog.Title as="h2" className="text-lg font-semibold flex gap-3 leading-6 text-gray-900">
                                <span>Редактирование меню</span>
                                {
                                    menu?.categories && menu?.categories.length == 0 && 
                                    <span className='p-1 bg-red-500 rounded-md text-white me-1 cursor-pointer' onClick={()=>{setIsMenuEditModalOpen(false); setIsDeleteWarningModalOpen(true);}}>
                                        <FaTrash/>
                                    </span>
                                }
                                {
                                    menu?.categories && menu?.categories.length != 0 && 
                                    <span className='p-1 bg-gray-500 rounded-md text-white me-1 cursor-pointer tooltip'>
                                        <span className="tooltiptext text-base font-normal">Меню содержит категории. Удаление невозможно</span>
                                        <FaTrash/>
                                    </span>
                                }
                                
                            </Dialog.Title>
                            <div className='flex flex-row items-start pt-5 gap-3'>
                                <div className='w-[150px]'>
                                    <img src={BACK_HOST + img} className='object-cover w-[150px] h-[150px] rounded-md'/>
                                </div>
                                <div className='flex-grow'>
                                    <p>Название меню</p>
                                    <ThemeInputText value={menu.menu_title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMenu((menu: IMenu)=>({...menu, menu_title: event.target.value}))} required/>
                                    <p className='mt-4'>Изменить изображение</p>
                                    <input 
                                        type="file" 
                                        name="small-file-input" 
                                        id="small-file-input"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMenu((menu: IMenu) => ({...menu, photo: event.target.files && event.target.files[0]}))}
                                        className="block 
                                            w-full border border-gray-200 
                                            shadow-sm rounded-lg text-sm focus:z-10 
                                            focus:border-blue-500 focus:ring-blue-500 
                                            disabled:opacity-50 disabled:pointer-events-none 
                                            dark:bg-slate-900 dark:border-gray-700 
                                            dark:text-gray-400 dark:focus:outline-none 
                                            dark:focus:ring-1 dark:focus:ring-gray-600
                                            file:bg-gray-100 file:border-0
                                            file:me-4
                                            file:py-2 file:px-4
                                            dark:file:bg-gray-700 dark:file:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:flex justify-end sm:px-6 gap-2">
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsMenuEditModalOpen(false)}
                    >
                        Отменить
                    </button>
                    
                </div>
            </form>
        </>
    );
}

const CategoryAddModalContent = ({setIsCategoryAddModalOpen, selectedCategory, getCategoryList, selectedMenu}:{setIsCategoryAddModalOpen: Function, selectedCategory: string, getCategoryList: Function, selectedMenu: string}) => {
    const [newCategory, setNewCategory] = useState<ICategory>({id: selectedCategory, category_title: '', establishment: 2});
    const formData = new FormData();

    const categoryCreatedNotify = () => toast.success("Категория была успешно добавлена", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [addCategory, isAddCategoryLoading, isAddCategoryError] = useFetching(async () => {
        const response = await SetDict.addCategory(formData).then(()=>{
            categoryCreatedNotify();
            setIsCategoryAddModalOpen(false);
            getCategoryList();
        });
    });

    useEffect(()=>{
        console.log(newCategory);
    },[newCategory])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('category_title', newCategory.category_title);
        formData.append('establishment', (newCategory.establishment || '').toString());
        formData.append('menu', (selectedMenu || '').toString());

        if(newCategory.category_title != ''){
            addCategory();            
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 min-w-[400px] text-center flex-grow sm:mt-0 sm:text-left">
                            <Dialog.Title as="h2" className="text-lg font-semibold leading-6 text-gray-900">
                                Добавление новой категории
                            </Dialog.Title>

                            <p className='mt-4'>Название меню</p>
                            <ThemeInputText onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewCategory((category: ICategory)=>({...category, category_title: event.target.value}))} required/>

                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsCategoryAddModalOpen(false)}
                    >
                        Отменить
                    </button>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                    >
                        Создать
                    </button>
                </div>
            </form>
        </>
    );
}

const CategoryEditModalContent = ({setIsCategoryEditModalOpen, selectedCategory, getCategoryList, selectedMenu, setIsDeleteWarningCategoryModalOpen}:{setIsCategoryEditModalOpen: Function, selectedCategory: string, getCategoryList: Function, selectedMenu: string, setIsDeleteWarningCategoryModalOpen: Function}) => {
    const [category, setCategory] = useState<ICategory>({id: selectedCategory, category_title: '', establishment: 2});
    const formData = new FormData();

    const categoryChangedNotify = () => toast.success("Категория была успешно изменена", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [getCategory, isGetCategoryLoading, isGetCategoryError] = useFetching(async () => {
        const response = await SetDict.getCategory(selectedCategory);
        setCategory(response.data.category);
    });

    const [editCategory, isEditCategoryLoading, isEditCategoryError] = useFetching(async () => {
        const response = await SetDict.editCategory(formData, selectedCategory).then(()=>{
            categoryChangedNotify();
            setIsCategoryEditModalOpen(false);
            getCategoryList();
        });
    });

    useEffect(()=>{
        getCategory();
    },[]);

    useEffect(()=>{
        console.log(category);
    },[category])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('category_title', category.category_title);
        formData.append('establishment', (category.establishment || '').toString());
        formData.append('menu', (selectedMenu || '').toString());

        if(category.category_title != ''){
            editCategory();            
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 min-w-[400px] text-center flex-grow sm:mt-0 sm:text-left">
                            <Dialog.Title as="h2" className="text-lg gap-3 flex ont-semibold leading-6 text-gray-900">
                                Редактирование категории
                                
                                {
                                    category?.products && category?.products.length != 0 ? 
                                    <span className='p-1 bg-gray-500 rounded-md text-white me-1 cursor-pointer tooltip'>
                                        <span className="tooltiptext text-base font-normal">Категория содержит блюда. Удаление невозможно</span>
                                        <FaTrash/>
                                    </span>
                                    :
                                    <span className='p-1 bg-red-500 rounded-md text-white me-1 cursor-pointer' onClick={()=>{setIsCategoryEditModalOpen(false); setIsDeleteWarningCategoryModalOpen(true);}}>
                                        <FaTrash/>
                                    </span>
                                }
                            </Dialog.Title>

                            <p className='mt-4'>Название категории</p>
                            <ThemeInputText value={category.category_title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCategory((category: ICategory)=>({...category, category_title: event.target.value}))} required/>
                            
                            
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsCategoryEditModalOpen(false)}
                    >
                        Отменить
                    </button>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </>
    );
}

const ProductCardEdit = ({isChanged, setIsChanged, notifyCancel, notifySave, selectedProduct, establishment, getProductList, setIsDeleteWarningProductModalOpen}:{isChanged: boolean, setIsChanged: Function, notifyCancel: Function, notifySave: Function, selectedProduct: string, establishment?: IEstablishment, getProductList: Function, setIsDeleteWarningProductModalOpen: Function}) => {
    const [product, setProduct] = useState<IProducts>({description: '', id: selectedProduct, is_active: true, is_published: false, old_price: 0, price: 0, title: '', category: '0'});
    const [img, setImg] = useState<string>('');
    const formData = new FormData();

    const checkInProductData = () => {
        if(Number.isNaN(product.price)) {setProduct(prevProduct => ({...prevProduct, price: 0}))};
        if(Number.isNaN(product.old_price)) {setProduct(prevProduct => ({...prevProduct, old_price: 0}))};
    }

    const [getProduct, isGetProductLoading, isGetProductError] = useFetching(async () => {
        if(selectedProduct !== '0'){
            const response = await SetDict.getProductById(selectedProduct);
            setProduct(response.data.product);
            setImg(response.data.product.photo);
        }
    });

    const [editProduct, isEditProductLoading, isEditProductError] = useFetching(async () => {
        const response = await SetDict.editProductByCategory(formData, selectedProduct)
        .then(()=>{
           notifySave();
           setIsChanged(false); 
           getProductList();
           getProduct();
        })
        .catch((e)=>{
            console.error(e);
        });;
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('id', product.id);
        formData.append('title', product.title);
        if (isFile(product.photo)) {
            formData.append('photo', product.photo);
        }
        else {
            delete product.photo;
        }
        formData.append('establishment', (product.establishment || '').toString());
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('old_price', product.old_price.toString());
        formData.append('is_published', product.is_published.toString());
        formData.append('is_active', product.is_active.toString());
        formData.append('category', product.category.toString());
        editProduct();
    };

    useEffect(()=>{
        getProduct();
    },[selectedProduct]);
    
    useEffect(()=>{
        checkInProductData();
    },[product])
    
    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='bg-gray-200 px-3 py-3 rounded-md font-semibold flex flex-row justify-between items-center'>
                    {product.title}
                    <div className='flex flex-row'>
                        {
                            isChanged &&
                            <>
                                <button className='px-4 py-1 rounded-lg text-white font-semibold me-2 whitespace-nowrap w-full bg-green-600 hover:bg-green-700' type='submit'>
                                    <div className='flex flex-row items-center justify-center'>
                                        <FaPen className='me-1' size={12}/>
                                        <span className='text-base text-white'>Сохранить</span>
                                    </div>
                                </button>
                                <button className='px-4 py-1 rounded-lg text-white font-semibold me-2 whitespace-nowrap w-full bg-gray-600 hover:bg-gray-700'>
                                    <div className='flex flex-row items-center justify-center'>
                                        <FaStop className='me-1' size={12}/>
                                        <span className='text-base text-white' onClick={()=>{setIsChanged(false); getProduct(); notifyCancel();}}>Отменить</span>
                                    </div>
                                </button>
                            </>
                        }
                    </div>
                </div>
                <div className='md:flex md:flex-row gap-4'>
                    <div className='relative '>
                        {
                            img ? <img className='object-cover w-[200px] h-[200px] rounded-lg mt-3 shadow-lg' src={`${BACK_HOST}${img}`}/>
                            : <img className='object-cover w-[200px] h-[200px] rounded-lg mt-3 shadow-lg' src={`/img/food_no_image.png`}/>
                        }
                        
                        <p className='mt-4'>Изменить изображение</p>
                        <input 
                            type="file" 
                            name="small-file-input" 
                            id="small-file-input"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{ setProduct((product: IProducts) => ({...product, photo: event.target.files && event.target.files[0]})); setIsChanged(true); }}
                            className="block 
                                w-[200px] border border-gray-200 
                                shadow-sm rounded-lg text-sm focus:z-10 
                                focus:border-blue-500 focus:ring-blue-500 
                                disabled:opacity-50 disabled:pointer-events-none 
                                dark:bg-slate-900 dark:border-gray-700 
                                dark:text-gray-400 dark:focus:outline-none 
                                dark:focus:ring-1 dark:focus:ring-gray-600
                                file:bg-gray-100 file:border-0
                                file:me-4
                                file:py-2 file:px-4
                                dark:file:bg-gray-700 dark:file:text-gray-400
                                cursor-pointer"
                        />
                        <p className='text-red-500 text-center mt-3 cursor-pointer' onClick={()=>{setIsDeleteWarningProductModalOpen(true)}}>Удалить блюдо</p>
                    </div>
                    <div className='flex-grow'>
                        <div className='mt-2'>
                            <p className='font-semibold'>Название блюда</p>
                            <ThemeInputText value={product.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, title: e.target.value})); setIsChanged(true);}} className={'w-full'} required/>
                        </div>
                        <div className='mt-3'>
                            <p className='font-semibold'>Описание блюда</p>
                            <ThemeTextarea value={product.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, description: e.target.value})); setIsChanged(true);}} className={'w-full'} rows={4}/>
                        </div>
                        <div className='mt-3'>
                            <p className='font-semibold'>Текущая цена</p>
                            <ThemeInputNumber value={product.price.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, price: parseFloat(e.target.value)})); setIsChanged(true);}} required/>
                        </div>
                        <div className='mt-3'>
                            <p className='font-semibold'>Старая цена</p>
                            <ThemeInputNumber value={product.old_price.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, old_price: parseFloat(e.target.value)})); setIsChanged(true);}}/>
                        </div>
                        <div className='flex flex-row mt-3 gap-10'>
                            <ThemeSwitcher checked={product.is_active} title={'Есть на кухне'} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, is_active: !prevProduct.is_active})); setIsChanged(true);}}/>
                            <ThemeSwitcher checked={product.is_published} title={'Опубликовано'} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, is_published: !prevProduct.is_published})); setIsChanged(true);}}/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

const DeleteMenuWarning = ({setIsDeleteWarningMenuModalOpen, selectedMenu, setSelectedMenu, getMenuList}:{setIsDeleteWarningMenuModalOpen: Function, selectedMenu: string, setSelectedMenu: Function, getMenuList: Function}) => {
    const menuDeletedNotify = () => toast.warning("Меню удалено", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });
    
    const [deleteMenu, isDeleteMenuLoading, isDeleteMenuError] = useFetching(async () => {
        const response = await SetDict.deleteMenu(selectedMenu).then((res)=>{
            setSelectedMenu('0');
            setIsDeleteWarningMenuModalOpen(false);
            getMenuList();
            menuDeletedNotify();
        });
    });

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaTrash className="h-6 w-6 text-red-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Вы подтверждаете удаление?
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Данное действие придет к удалению и восстановление данных невозможно. Вы подтверждаете данное действие? 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 gap-3 justify-end px-4 py-3 sm:flex sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                    onClick={() => {deleteMenu();}}
                >
                    Да, удалить
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsDeleteWarningMenuModalOpen(false)}
                >
                    Отменить
                </button>
            </div>
        </>
    );
};

const DeleteCategoryWarning = ({setIsDeleteWarningCategoryModalOpen, selectedCategory, setSelectedCategory, getCategoryList}:{setIsDeleteWarningCategoryModalOpen: Function, selectedCategory: string, setSelectedCategory: Function, getCategoryList: Function}) => {
    const categoryDeletedNotify = () => toast.warning("Категория удалена", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [deleteCategory, isDeleteCategoryLoading, isDeleteCategoryError] = useFetching(async () => {
        const response = await SetDict.deleteCategory(selectedCategory).then((res)=>{
            setSelectedCategory('0');
            setIsDeleteWarningCategoryModalOpen(false);
            getCategoryList();
            categoryDeletedNotify();
        });
    });

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaTrash className="h-6 w-6 text-red-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Вы подтверждаете удаление категории?
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Данное действие придет к удалению и восстановление данных невозможно. Вы подтверждаете данное действие? 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 gap-3 justify-end px-4 py-3 sm:flex sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                    onClick={() => {deleteCategory();}}
                >
                    Да, удалить
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsDeleteWarningCategoryModalOpen(false)}
                >
                    Отменить
                </button>
            </div>
        </>
    );
};

const DeleteProductWarning = ({setIsDeleteWarningProductModalOpen, selectedProduct, setSelectedProduct, getProductList, setIsChanged}:{setIsDeleteWarningProductModalOpen: Function, selectedProduct: string, setSelectedProduct: Function, getProductList: Function, setIsChanged: Function}) => {
    const productDeletedNotify = () => toast.warning("Блюдо удалено", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });
    
    const [deleteProduct, isDeleteProductLoading, isDeleteProductError] = useFetching(async () => {
        const response = await SetDict.deleteProductById(selectedProduct).then((res)=>{
            setSelectedProduct('0');
            setIsDeleteWarningProductModalOpen(false);
            getProductList();
            setIsChanged(false);
            productDeletedNotify();
        });
    });

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaTrash className="h-6 w-6 text-red-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Вы подтверждаете удаление блюда?
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Данное действие придет к удалению и восстановление данных невозможно. Вы подтверждаете данное действие? 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 gap-3 justify-end px-4 py-3 sm:flex sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                    onClick={() => {deleteProduct();}}
                >
                    Да, удалить
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsDeleteWarningProductModalOpen(false)}
                >
                    Отменить
                </button>
            </div>
        </>
    );
};
