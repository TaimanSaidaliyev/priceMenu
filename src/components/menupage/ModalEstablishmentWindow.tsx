import { FaBars, FaClock, FaLocationArrow, FaPhone } from "react-icons/fa6";
import { BACK_HOST } from "../../configs/config";
import DialogModal from "../../ui/DialogModal";
import { isLight } from "../../pages/EstablishmentMenuPage";

export const ModalEstablishmentWindow = ({establishment, showModal, setShowModal} : {establishment?: IEstablishment, showModal: boolean, setShowModal: Function }) => {
    return (
      <DialogModal isOpen={showModal} setIsOpen={setShowModal}>
        <div className={`w-full mt-5 overflow-auto no-scrollbar`}>
          <div className='flex w-full justify-center'>
              <div className='bg-white w-full'>
                  <div className='flex flex-row w-full p-5'>
                      <img className='object-cover w-[150px] h-[150px] rounded-lg' src={BACK_HOST + establishment?.photo}/>
                      <div className='ms-3'>
                          <p className={`text-2xl font-semibold`} style={{color: establishment?.default_color}}>{establishment?.title}</p>
                          {
                            establishment && establishment.phoneNumber && establishment.phoneNumber.length &&
                            <p className='text-lg flex items-center mt-2'>
                              <FaPhone className='me-2' style={{color: establishment?.default_color}}/>
                              {establishment?.phoneNumber}
                            </p>
                          }
                          {
                            establishment && establishment.address && establishment.address.length &&
                            <p className='text-lg flex items-center mt-2'>
                              <FaLocationArrow className='me-2' style={{color: establishment?.default_color}}/>
                              {establishment?.address}
                            </p>
                          }
                          {
                            establishment && establishment.workTime && establishment.workTime.length &&
                            <p className='text-lg flex items-center mt-2'>
                              <FaClock className='me-2' style={{color: establishment?.default_color}}/>
                              {establishment?.workTime}
                            </p>
                          }
                          
                      </div>
                  </div>
                  {
                    establishment && establishment.description && establishment.description.length > 0  &&
                    <div className='w-full px-5 py-5' >
                        <p className='text-lg font-semibold'>Описание</p>
                        {establishment?.description}
                    </div>
                  }
                  
                  <div className='flex justify-center pb-5'>
                      <button className={`px-4 py-2 rounded-3xl ${isLight ? 'text-gray-800' : 'text-white'} font-semibold me-2 whitespace-nowrap`} style={{backgroundColor: establishment?.default_color}} onClick={()=>{setShowModal(false)}}>
                          <div className='flex flex-row items-center cursor-pointer' >
                              <FaBars size={20} className='me-3'/>Вернуться в меню
                          </div>
                      </button>
                  </div>
              </div>
          </div>
        </div>  
      </DialogModal>
    );
  };