import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import { Establishment } from '../api/api';
import { BACK_HOST } from '../configs/config';
import { FaPhone, FaLocationArrow, FaClock, FaInstagram, FaWhatsapp, FaBars } from 'react-icons/fa6';

export default function EstablishmentInfoPage() {
    let { establishment_id } = useParams();
    const [establishment, setEstablishment] = useState<IEstablishment>();

    const [getEstablishmentInfomation] = useFetching(async () => {
        const response = await Establishment.getEstablishmentInformationById(establishment_id || '0');
        setEstablishment(response.data.establishment);
    });

    useEffect(()=>{
        getEstablishmentInfomation();
    },[]);

    return (
        <div className='flex w-full justify-center'>
            <div className='bg-white max-w-[900px] w-full border-gray-200 border'>
                <img className='object-cover w-full h-[200px]' src={BACK_HOST + establishment?.backgroundImage}/>
                <div className='flex flex-row w-full p-5'>
                    <img className='object-cover w-[150px] h-[150px] rounded-lg' src={BACK_HOST + establishment?.photo}/>
                    <div className='ms-3'>
                        <p className={`text-2xl font-semibold`} style={{color: establishment?.default_color}}>{establishment?.title}</p>
                        <p className='text-lg flex items-center mt-2'>
                            <FaPhone className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.phoneNumber}
                        </p>
                        <p className='text-lg flex items-center mt-2'>
                            <FaLocationArrow className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.address}
                        </p>
                        <p className='text-lg flex items-center mt-2'>
                            <FaClock className='me-2' style={{color: establishment?.default_color}}/>
                            {establishment?.workTime}
                        </p>
                    </div>
                </div>
                <div className='py-2 px-5'>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold me-2 whitespace-nowrap' style={{backgroundColor: "#E1306C"}}>
                        <div className='flex flex-row items-center cursor-pointer'><FaInstagram size={24} className='me-3'/> aura_restaurant </div>
                    </button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold me-2 whitespace-nowrap' style={{backgroundColor: "#075E54"}}>
                        <div className='flex flex-row items-center cursor-pointer'><FaWhatsapp size={24} className='me-3'/> Написать </div>
                    </button>
                </div>
                <div className='w-full px-5 py-5' >
                    <p className='text-lg font-semibold'>Описание</p>
                    {establishment?.description}
                </div>
                <div className='flex justify-center pb-5'>
                    <Link to={`/establishment/${establishment?.id || 0}`}>
                        <button className='px-4 py-2 rounded-3xl text-white font-semibold me-2 whitespace-nowrap' style={{backgroundColor: establishment?.default_color}}>
                            <div className='flex flex-row items-center cursor-pointer' >
                                <FaBars size={20} className='me-3'/>Перейти в меню
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
