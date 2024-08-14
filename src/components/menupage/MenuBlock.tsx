import { BACK_HOST, BASE_TEXT } from "../../configs/config";

export const MenuBlock = ({ establishment, productList, selectedMenu, setSelectedMenu, isLoading }: { establishment?: IEstablishment, productList: IMenuList[], selectedMenu: number, setSelectedMenu: Function, isLoading: boolean }) => {
    return (
      <>
      {
        isLoading ?
        <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5 mt-2 animate-pulse'>
          <div className='w-[130px] p-3 rounded-xl text-center me-3 h-[170px]'>
            <div className='object-cover w-[100px] h-[100px] rounded-full mx-auto bg-gray-200'>
            </div>
            <div className='mt-1 text-sm font-semibold h-4 bg-gray-200'></div>
          </div>
          <div className='w-[120px] p-3 rounded-xl text-center me-3 h-[170px]'>
            <div className='object-cover  w-[100px] h-[100px] rounded-full mx-auto bg-gray-200'>
            </div>
            <div className='mt-1 h-4 bg-gray-200'></div>
          </div>
        </div>
        :
        <>
          {
            productList.length > 1 &&
            <div className='flex flex-row w-full overflow-y-scroll no-scrollbar px-5 mt-2'>
              {
                productList.sort((a, b) => a.sorting_number - b.sorting_number).map((menu, index)=>
                  <div key={index} onClick={()=>{setSelectedMenu(menu.id)}}>
                    {
                      menu.id === selectedMenu ?
                      <div className='w-[130px] rounded-xl text-center me-3 h-[160px] cursor-pointer' key={index}>
                        <div className="relative flex items-end w-full bg-cover bg-center h-full justify-center rounded-lg" style={{backgroundImage: `url(${BACK_HOST + menu.photo})`}}>
                          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent rounded-lg"></div>
                          <p className={`text-gray-700'} mb-2 mt-1 ${BASE_TEXT} line-clamp-2 relative z-10 font-semibold`}>
                            {menu.menu_title}
                          </p>
                        </div>
                      </div>
                      :
                      <div className='w-[130px] rounded-xl text-center me-3 h-[160px] cursor-pointer' key={index}>
                        <div className="relative flex items-end w-full bg-cover bg-center h-full justify-center rounded-lg" style={{backgroundImage: `url(${BACK_HOST + menu.photo})`}}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
                          <p className={`text-white mt-1 ${BASE_TEXT} line-clamp-2 relative z-10 mb-2`}>
                            {menu.menu_title}
                          </p>
                        </div>
                      </div>
                    }
                  </div>
                )
              }
            </div>
          }
          
        </>
      }
      </>
      
    );
  };