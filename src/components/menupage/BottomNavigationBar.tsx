import { FaCartShopping } from "react-icons/fa6";
import { isLight } from "../../pages/EstablishmentMenuPage";
import formatPrice from "../../utils/formatPrice";
import { getTextColorForBackground } from "../../utils/getTextColor";
import { motion } from "framer-motion"
import { cartButton, containerVariants } from "../../utils/animations";

export const BottomNavigationBar = ({totalCount, totalPrice, setShowModal, establishment}:{totalCount: number, totalPrice: number, setShowModal: Function, establishment?: IEstablishment}) => {
    return (
      <>
      {
          <motion.div custom={1} animate={{opacity: totalCount > 0 ? 1 : 0}} variants={cartButton} className="z-30">
            <div className={`transition duration-300 ease-in-out flex fixed bottom-0 w-full text-center max-w-[899px] px-10 py-5 justify-center ${totalCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-50`}>
              <button className={`px-4 py-3 rounded-3xl font-semibold me-2 whitespace-nowrap ${isLight ? 'text-gray-800' : 'text-white'}`} style={{backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}>
                <div className='flex flex-row items-center' onClick={() => setShowModal(true)}><FaCartShopping className='me-3'/> Оформить корзину {formatPrice(totalPrice)}</div>
              </button>
            </div>
          </motion.div>
        }
      </>
    );
  };