import { format } from "date-fns";
import { BACK_HOST, BASE_TEXT, HEADER_TEXT } from "../../configs/config";
import { getTextColorForBackground } from "../../utils/getTextColor";
import ThemeDivider from "../../ui/ThemeDivider";

export const BannersPromotions = ({searchText, establishment, banners, promotions, isLoading} : {searchText: string | ''; establishment?: IEstablishment; banners: IBanners[], promotions: IPromotions[], isLoading: boolean}) => {
    return (
      <>
        {
          isLoading ?
            // <SpinnerLoading color={establishment?.default_color}/>
            <>
            <div className="animate-pulse flex flex-row w-full overflow-y-scroll no-scrollbar h-[150px] pe-5 mt-3">
              <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
              <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
              <div className="rounded-lg ms-5 h-[150px] w-[280px] bg-gray-200"></div>
            </div>
            <div className='w-full px-5 pt-5'>
              <div className="w-full animate-pulse">
                <div> 
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1">
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full">
                  </div>
                </div>
              </div>
            </div>
            </>
          :
          <>
            {
              searchText.length === 0 &&
              <>
                  {
                      banners.filter(banner => banner.promotion_type === 'Banner' ).length > 0 && 
                      <div className='flex flex-row w-full overflow-y-scroll no-scrollbar h-[150px] pe-5 mt-3'>
                          {banners.filter(banner => banner.promotion_type === 'Banner' ).map((banner, index)=>
                          <img src={BACK_HOST + banner.photo} className='rounded-lg ms-5 h-[150px] w-[280px]' key={index}/>
                          )}
                      </div>
                  }
                <div className='w-full px-5 pt-5'>
                  {
                    promotions.filter(promotion => promotion.promotion_type === 'Label' ).map((promotion, index) =>
                    <div className='w-full' key={index}>
                      <div> 
                        <p className={`${HEADER_TEXT} font-semibold`} style={{color: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#000000' : establishment?.default_color}}>{promotion.title}</p>
                        <span className={`${BASE_TEXT} text-gray-500`}>
                          {promotion.description}
                        </span>
                      </div>
                      <div className='w-full flex justify-end mt-1'>
                        <span className={BASE_TEXT}>
                          до {format(promotion.until_date, 'dd.MM.yyyy')}
                        </span>
                      </div>
                      <div className='py-3'>
                        <ThemeDivider/>
                      </div>
                    </div>
                    )
                  }
                </div>
              </>
            }
          </>
          }
      </>
    );
  };