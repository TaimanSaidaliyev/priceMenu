import { useEffect, useState } from 'react';
import { useFetching } from './..//hooks/useFetching';
import { Dictionary } from '../api/api';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { FaGripVertical } from 'react-icons/fa6';
import ThemeDivider from '../ui/ThemeDivider';


export default function MenuEditPage() {
    const [productList, setProductList] = useState<IProducts[]>([]);
    const [menuList, setMenuList] = useState<IMenuList[]>([]);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);

    const [getMenuList, isGetMenuListLoading, isGetMenuListError] = useFetching(async () => {
        const response = await Dictionary.getMenuListByEstablishmentId('2');
        setMenuList(response.data.menus);
    });

    const [getCategoryList, isGetCategoryListLoading, isGetCategoryListError] = useFetching(async () => {
        const response = await Dictionary.getCategoriesByMenuId('5');
        setCategoryList(response.data.categories);
    });
    
    const [getproductList, isGetProductListLoading, isGetProductListError] = useFetching(async () => {
        const response = await Dictionary.getProductsByCategoryId('4');
        setProductList(response.data.products);
    });

    useEffect(()=>{
        getMenuList();
        getCategoryList();
        getproductList();
    },[])
    
    // useEffect(()=>{
    //     console.log(categoryList);
    // },[categoryList])

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
                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
                <div className='flex flex-row mt-5 gap-4'>
                    <div className='w-[250px] h-auto overflow-auto'>
                        <EstablishmentCategoryList categoryList={categoryList} onDragEndCategoryList={onDragEndCategoryList}/>
                    </div>
                    <div className='w-[350px]'>
                        <EstablishmentProductList productList={productList} onDragEndProductList={onDragEndProductList} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const EstablishmentCategoryList = ({onDragEndCategoryList, categoryList}:{onDragEndCategoryList: Function, categoryList: ICategory[]}) => {
    return (
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
                            <div className='flex items-center bg-white hover:bg-gray-300 p-3 rounded-md cursor-pointer'>
                                <div {...provided.dragHandleProps}>
                                    <span><FaGripVertical className='text-gray-400 me-3'/></span>
                                </div>
                                <span>{item.category_title}</span>
                            </div>
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

const EstablishmentProductList = ({onDragEndProductList, productList}:{onDragEndProductList: Function, productList: IProducts[]}) => {
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
                            <div className='flex items-center bg-white hover:bg-gray-300 p-3 rounded-md cursor-pointer'>
                                <div {...provided.dragHandleProps}>
                                    <span><FaGripVertical className='text-gray-400 me-3'/></span>
                                </div>
                                
                                <span>{item.title}</span>
                            </div>
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