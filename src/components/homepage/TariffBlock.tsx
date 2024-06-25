import React from 'react'

export default function TariffBlock() {
    const demoTariff = [
        {
          id: 1,
          title: 'QR Menu'
        },
        {
          id: 2,
          title: 'Админ панель'
        },
    ]
    
    const standartTariff = [
        {
            id: 3,
            title: 'QR Menu'
        },
        {
            id: 4,
            title: 'Админ панель'
        },
        {
            id: 5,
            title: 'Подписка'
        },
        {
            id: 6,
            title: 'Стилизация интерфейса'
        },
    ]

    const premiumTariff = [
        {
            id: 7,
            title: 'QR Menu'
        },
        {
            id: 8,
            title: 'Админ панель'
        },
        {
            id: 9,
            title: 'Подписка'
        },
        {
            id: 10,
            title: 'Стилизация интерфейса'
        },
        {
            id: 11,
            title: 'Неограниченное количество блюд'
        },
        {
            id: 12,
            title: 'Размещение акций по запросу'
        },
    ]

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-white">
                    Наши тарифы
                </h2>
                <p className="mb-5 text-gray-500 sm:text-xl dark:text-gray-400">
                    Самые низкие тарифы на рынке
                </p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center w-full text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <h3 className="text-2xl font-semibold">Demo</h3>
                    <div className="flex justify-center items-baseline my-4">
                        <span className="mr-2 text-3xl font-extrabold">0 тг</span>
                        <span className="text-gray-500 dark:text-gray-400">/мес.</span>
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        {
                            demoTariff.map((item, index) => 
                                <li className="flex items-center space-x-3" key={item.id}>
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 0l-4-4a1 1 0 01-1.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.title}</span>
                                </li>
                            )
                        }
                    </ul>
                    <a href="https://wa.me/77051214871" target="_blank" className="text-white bg-orange-600 hover:bg-orange-700 focus:orange-4 focus:orange-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-orange-900">
                        Получить бесплатно
                    </a>
                </div>
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center w-full text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <h3 className="text-2xl font-semibold">STANDART</h3>
                    <div className="flex justify-center items-baseline my-4">
                        <span className="mr-2 text-3xl font-extrabold">9 990 тг</span>
                        <span className="text-gray-500 dark:text-gray-400">/мес.</span>
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        {
                            standartTariff.map((item, index) => 
                                <li className="flex items-center space-x-3" key={item.id}>
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 0l-4-4a1 1 0 01-1.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.title}</span>
                                </li>
                            )
                        }
                    </ul>
                    <a href="https://wa.me/77051214871" target="_blank" className="text-white bg-orange-600 hover:bg-orange-700 focus:orange-4 focus:orange-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-orange-900">
                        Получить
                    </a>
                </div>
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center w-full text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <h3 className="text-2xl font-semibold">PREMIUM</h3>
                    <div className="flex justify-center items-baseline my-4">
                        <span className="mr-2 text-3xl font-extrabold">13 990 тг</span>
                        <span className="text-gray-500 dark:text-gray-400">/мес.</span>
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        {
                            premiumTariff.map((item, index) => 
                                <li className="flex items-center space-x-3" key={item.id}>
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 0l-4-4a1 1 0 01-1.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{item.title}</span>
                                </li>
                            )
                        }
                    </ul>
                    <a href="https://wa.me/77051214871" target="_blank" className="text-white bg-orange-600 hover:bg-orange-700 focus:orange-4 focus:orange-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-orange-900">
                        Получить
                    </a>
                </div>
            </div>
        </div>
    )
}
