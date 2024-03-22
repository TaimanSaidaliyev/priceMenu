import { useEffect, useState } from 'react';
import { useFetching } from './..//hooks/useFetching';
import { Dictionary, Establishment } from '../api/api';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { FaGripVertical, FaPlus, FaStop, FaTrash } from 'react-icons/fa6';
import ThemeDivider from '../ui/ThemeDivider';
import {ThemeInputNumber, ThemeInputText, ThemeSwitcher, ThemeTextarea} from '../ui/ThemeForms';
import { BACK_HOST } from '../configs/config';
import { FaPen } from 'react-icons/fa6';
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ConfirmModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onYes: () => void;
    onNo: () => void;
    onContinue: () => void;
}

export default function MenuEditPage() {
    const [productList, setProductList] = useState<IProducts[]>([]);
    const [menuList, setMenuList] = useState<IMenuList[]>([]);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [product, setProduct] = useState<IProducts>({description: '', id: 0, is_active: false, old_price: 0, photo: '', price: 0, title: '', is_published: false});
    const [selectedMenu, setSelectedMenu] = useState<string>('0');
    const [selectedCategory, setSelectedCategory] = useState<string>('0');
    const [selectedProduct, setSelectedProduct] = useState<string>('0');
    const [establishment, setEstablishment] = useState<IEstablishment>();
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setCategoryList(response.data.categories);
    });
    
    const [getProductList, isGetProductListLoading, isGetProductListError] = useFetching(async () => {
        const response = await Dictionary.getProductsByCategoryId(selectedCategory);
        setProductList(response.data.products);
    });

    const [getProduct, isGetProductLoading, isGetProductError] = useFetching(async () => {
        if(selectedProduct !== '0'){
            const response = await Dictionary.getProductById(selectedProduct);
            setProduct(response.data.product);
        }
    });

    const notifyCancel = () => toast.warn("Изменения отменены", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const notifySave = () => toast.success("Изменения сохранены", {
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
        alert('Вы внесли изменения в карточку блюда. Сохраните или отмените изменения перед тем как покинуть карточку.')
    }

    useEffect(()=>{
        setProductList([]);
        setSelectedProduct('0');
        setSelectedCategory('0');
        setProduct({description: '', id: 0, is_active: false, old_price: 0, photo: '', price: 0, title: '', is_published: false});
        getCategoryList();
    },[selectedMenu]);

    useEffect(()=>{
        getProductList();
        setProduct({description: '', id: 0, is_active: false, old_price: 0, photo: '', price: 0, title: '', is_published: false});
        setSelectedProduct('0');
    },[selectedCategory])

    useEffect(()=>{
        getProduct();
    },[selectedProduct])

    useEffect(()=>{
        checkInProductData();
        // console.log(product);
    },[product])

    const checkInProductData = () => {
        if(Number.isNaN(product.price)) {setProduct(prevProduct => ({...prevProduct, price: 0}))};
        if(Number.isNaN(product.old_price)) {setProduct(prevProduct => ({...prevProduct, old_price: 0}))};
    }

    const onDragEndCategoryList = (result: DropResult) => {
        if (!result.destination) return;
    
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
    
        const reorderedItems = Array.from(categoryList);
        const [removed] = reorderedItems.splice(startIndex, 1);
        reorderedItems.splice(endIndex, 0, removed);
    
        const updatedItems = reorderedItems.map((menu, index) => ({
          ...menu,
          sortingNumber: index + 1
        }));
    
        setCategoryList(updatedItems);
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
          sortingNumber: index + 1
        }));
    
        setProductList(updatedItems);
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
                <div className='flex flex-row w-full items-center gap-4'>
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
                </div>
                <div className='flex md:flex-row flex-col mt-5 gap-4'>
                    <div className='md:w-[250px] w-full h-auto overflow-auto'>
                        <div className='flex flex-row bg-gray-200 p-3 rounded-md font-semibold justify-between items-center'>
                            <div className='flex flex-row'>
                                <button className='p-1 bg-green-500 rounded-md text-white me-1'>
                                    <FaPlus/>
                                </button>
                                Категории
                            </div>
                            {
                                selectedCategory !== '0' &&
                                <div className='flex flex-row gap-1'>
                                    <button className='p-1 bg-blue-500 rounded-md text-white'>
                                        <FaPen/>
                                    </button>
                                    <button className='p-1 bg-red-500 rounded-md text-white'>
                                        <FaTrash/>
                                    </button>
                                </div>
                            }
                        </div>
                        <EstablishmentCategoryList categoryList={categoryList} onDragEndCategoryList={onDragEndCategoryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isChanged={isChanged} SaveAlert={SaveAlert}/>
                    </div>
                    <div className='md:w-[350px] w-full'>
                        <div className='flex flex-row bg-gray-200 p-3 rounded-md font-semibold justify-between items-center'>
                            <div className='flex flex-row'>
                                <button className='p-1 bg-green-500 rounded-md text-white me-1'>
                                    <FaPlus/>
                                </button>
                                Блюда
                            </div>
                            {
                                selectedProduct !== '0' &&
                                <div className='flex flex-row gap-1'>
                                    <button className='p-1 bg-blue-500 rounded-md text-white'>
                                        <FaPen/>
                                    </button>
                                    <button className='p-1 bg-red-500 rounded-md text-white'>
                                        <FaTrash/>
                                    </button>
                                </div>
                            }
                        </div>
                        <EstablishmentProductList productList={productList} onDragEndProductList={onDragEndProductList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} isChanged={isChanged} SaveAlert={SaveAlert}/>
                    </div>
                    <div className='flex-grow'>
                        {
                            selectedProduct !== '0' && 
                            <ProductCardEdit product={product} setProduct={setProduct} isChanged={isChanged} setIsChanged={setIsChanged} getProduct={getProduct} notifyCancel={notifyCancel} notifySave={notifySave}/>
                        }
                    </div>
                </div>
            </div>
            <CustomConfirmModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onYes={() => setModalIsOpen(false)}
                onNo={() => setModalIsOpen(false)}
                onContinue={() => setModalIsOpen(false)}
            />
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

const ProductCardEdit = ({product, setProduct, isChanged, setIsChanged, getProduct, notifyCancel, notifySave}:{product: IProducts, setProduct: Function, isChanged: boolean, setIsChanged: Function, getProduct: Function, notifyCancel: Function, notifySave: Function}) => {
    return (
        <>
            <div className='bg-gray-200 px-3 py-3 rounded-md font-semibold flex flex-row justify-between items-center'>
                {product.title}
                <div className='flex flex-row'>
                    {
                        isChanged &&
                        <>
                            <button className='px-4 py-1 rounded-lg text-white font-semibold me-2 whitespace-nowrap w-full bg-green-600 hover:bg-green-700'>
                                <div className='flex flex-row items-center justify-center'>
                                    <FaPen className='me-1' size={12}/>
                                    <span className='text-base text-white' onClick={()=>{setIsChanged(false); notifySave();}}>Сохранить</span>
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
                    <button className='py-1 px-1 bg-red-500 rounded-md text-white'>
                        <FaTrash size={16}/>
                    </button>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='relative '>
                    <span className='text-gray-400 absolute top-5 right-2 rounded-full bg-white p-1 shadow-md cursor-pointer'>
                        <FaPen/>
                    </span>
                    <img className='object-cover w-[200px] h-[200px] rounded-lg mt-3 shadow-lg' src={`${BACK_HOST}${product.photo}`}/>
                </div>
                
                <div className='flex-grow'>
                    <div className='mt-2'>
                        <p className='font-semibold'>Название блюда</p>
                        <ThemeInputText value={product.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, title: e.target.value})); setIsChanged(true);}} className={'w-full'}/>
                    </div>
                    <div className='mt-3'>
                        <p className='font-semibold'>Описание блюда</p>
                        <ThemeTextarea value={product.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, description: e.target.value})); setIsChanged(true);}} className={'w-full'} rows={4}/>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <p className='font-semibold'>Текущая цена</p>
                <ThemeInputNumber value={product.price.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, price: parseFloat(e.target.value)})); setIsChanged(true);}}/>
            </div>
            <div className='mt-3'>
                <p className='font-semibold'>Старая цена</p>
                <ThemeInputNumber value={product.old_price.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, old_price: parseFloat(e.target.value)})); setIsChanged(true);}}/>
            </div>
            <div className='flex flex-row mt-3 gap-10'>
                <ThemeSwitcher checked={product.is_active} title={'Есть на кухне'} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, is_active: !prevProduct.is_active})); setIsChanged(true);}}/>
                <ThemeSwitcher checked={product.is_published} title={'Опубликовано'} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setProduct((prevProduct: IProducts) => ({...prevProduct, is_published: !prevProduct.is_published})); setIsChanged(true);}}/>
            </div>
        </>
    );
}

const CustomConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onRequestClose, onYes, onNo, onContinue }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Подтвердите действие"
            style={{content: {width: 400, height: 160, borderRadius: 10, alignSelf: 'center', justifySelf: 'center' }, overlay: {alignItems: 'center', backgroundColor: '#00000099'}}}
        >
            <div className='flex flex-col text-center'>
                <span className='text-lg'>Сохранить изменения в карточке этого блюда?</span>
                <div className='mt-5 gap-4 flex flex-row justify-center'>
                    <button className={'bg-blue-500 px-3 py-2 rounded-md text-white'} onClick={onYes}>Да</button>
                    <button className={'bg-orange-500 px-3 py-2 rounded-md text-white'} onClick={onNo}>Нет</button>
                    <button className={'bg-gray-500 px-3 py-2 rounded-md text-white'} onClick={onContinue}>Продолжить</button>
                </div>
            </div>
        </Modal>
    );
};