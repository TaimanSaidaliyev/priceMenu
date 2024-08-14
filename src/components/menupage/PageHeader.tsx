import { BACK_HOST } from "../../configs/config";

export const PageHeader = ({ establishment, setShowInfoModal }: { establishment?: IEstablishment, setShowInfoModal: Function }) => {
    return (
      <>
        <div>
          {
            establishment?.backgroundImage != null &&
            <img src={`${BACK_HOST + establishment?.backgroundImage}`} className='object-cover h-[125px] w-full pointer-events-none'/>
          }
        </div>
        {
          establishment?.photo &&
          <div className='flex justify-center mt-[-50px] z-100'>
            <img src={BACK_HOST + establishment?.photo} className='md:w-[150px] md:h-[150px] w-[100px] h-[100px] object-cover rounded-3xl shadow-lg'/>
          </div>
        }
        
        <div className='text-center'>
          <p className='text-2xl font-semibold mt-2'>
            {establishment?.title}
          </p>
          <p className='text-sm text-gray-400 mt-2 px-5'>
            {establishment?.description}
          </p>
          <p className='text-md text-gray-600 mt-2 px-5 font-semibold '>
            {
              establishment?.workTime != '' &&  
              <>
                  {establishment?.workTime}
                  <span className='mx-2 font-bold'>·</span>
              </>
            }
            
            {
              establishment?.phoneNumber != '' && 
              <>
                {establishment?.phoneNumber}
                <span className='mx-2 font-bold'>·</span> 
              </>
            }
  
            {
              establishment?.address != '' && 
              <>
                {establishment?.address}
              </>
            }
            
          </p>
        </div>
      </>
    );
  };