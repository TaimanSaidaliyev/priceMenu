import React from "react";
import DialogModal from "../../ui/DialogModal";
import { getTextColorForBackground } from "../../utils/getTextColor";

export const ModalCategoryList = ({productList, selectedMenu, selectedCategory, setSelectedCategory, establishment, showCategoryModal, setShowCategoryModal}:{productList: IMenuList[], selectedMenu: number, selectedCategory: number, setSelectedCategory: Function, establishment?: IEstablishment, showCategoryModal: boolean, setShowCategoryModal: Function}) => {
    return (
      <DialogModal isOpen={showCategoryModal} setIsOpen={setShowCategoryModal}>
        <div className='w-full flex flex-col overflow-y-scroll no-scrollbar px-5 py-2 sticky top-0 border-b-2 border-gray-200 bg-white'>
            {
              productList
              .filter(menu => menu.id === selectedMenu)
              .map((menu, index)=>
              <React.Fragment key={index}>
                {
                  menu.categories && menu.categories.sort((a, b) => a.sorting_number - b.sorting_number).map((category, index)=>
                  <div key={index}>
                    {
                      category.id === selectedCategory ?
                      <div className={`py-2 px-4 my-1 ${getTextColorForBackground(establishment?.default_color ?? '#000000') ? 'text-gray-800' : 'text-white'} font-semibold me-2 whitespace-nowrap w-[300px]`} style={{backgroundColor: establishment?.default_color}} key={index} onClick={()=>{setSelectedCategory(category.id); setShowCategoryModal(false)}}>
                        {category.category_title}
                      </div>
                      :
                      <div className="bg-white py-2 px-4 my-1 text-gray-500 font-semibold me-2 whitespace-nowrap w-[300px]" key={index} onClick={()=>{setSelectedCategory(category.id); window.location.hash=`#category_${category.id}`; setShowCategoryModal(false);}}>
                        {category.category_title}
                      </div>
                    }
                  </div>
                  )
                }
              </React.Fragment>
              )
            }
        </div>
      </DialogModal>
)
};