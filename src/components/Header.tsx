import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie, getCookie } from '../utils/cookie'
import { useFetching } from '../hooks/useFetching'
import { Establishment, User } from '../api/api'


const sessionRemove = () => {
    deleteCookie('token');
    deleteCookie('establishment_id');
    window.location.href = "/login/";
}

export default function Header({page}:{page: string}) {
    let navigate = useNavigate();
    const [establishmentId, setEstablishementId] = useState<string>('0');
    const [establishment, setEstablishment] = useState<IEstablishment>();

    const navigation = [
        { name: 'Редактор меню', href: '/settings/menu/', current: page === 'menu' ? true : false },
        { name: 'Настройки', href: '/settings/general/', current: page === 'general' ? true : false },
        { name: 'Перейти в меню', href: `/establishment/${establishment?.id}/`, current: page === 'menuList' ? true : false },
    ]   
      

    const [checkToken] = useFetching(async () => {
        const response = await User.checkToken().then((res)=>{
            if(!res.data.status){
                return navigate("/login");
            }
        })
    });

    const [getEstablishmentInfomation, isProductInfomationLoading, isProductInfomationError] = useFetching(async () => {
        const response = await Establishment.getEstablishmentInformationById(establishmentId);
        setEstablishment(response.data.establishment);
    });

    useEffect(()=>{
        checkToken().then(()=>{
            setEstablishementId(getCookie('establishment_id') || '');
        });
    },[]);

    useEffect(()=>{
        if(establishmentId != '0'){
            getEstablishmentInfomation()
        }
        
    },[establishmentId])

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
                    <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="absolute text-white inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <span className='me-2 invisible sm:visible'>Админ панель: {establishment?.title}</span>
                        <span className='text-red-200 ms-5 cursor-pointer' onClick={()=>{sessionRemove()}}>Выход</span>
                    </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            >
                            {item.name}
                        </Link>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
    )
}
