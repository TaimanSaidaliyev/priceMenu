import React from "react";
import DialogModal from "../../ui/DialogModal";
import { getTextColorForBackground } from "../../utils/getTextColor";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BACK_HOST } from "../../configs/config";
import { formatDate } from "../../utils/dateConverter";

export const ModalPromotion = ({showPromotionModal, setShowPromotionModal, banner}:{showPromotionModal: boolean, setShowPromotionModal: Function, banner: IBanners | undefined}) => {
    return (
      <DialogModal isOpen={showPromotionModal} setIsOpen={setShowPromotionModal}>
        <div className='w-full flex flex-col overflow-y-scroll no-scrollbar border-b-2 border-gray-200 z-30'>
            <img src={banner?.photo ? BACK_HOST + banner.photo : '/img/food_no_image.png'} className={'object-cover max-h-[400px]'}/>
            <button
              type="button"
              className="absolute rounded-full right-4 top-3 bg-white text-gray-400 p-1"
              onClick={() => setShowPromotionModal(false)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="p-3">
              <p className="font-semibold text-lg">
                {banner?.title}
              </p>
              <p className="mt-2">
                {banner?.description}
              </p>
              <p className="mt-2">
                Акция заканчивается: {formatDate(banner?.until_date.toString() || "")}{}
              </p>
            </div>

        </div>
      </DialogModal>
    )
};