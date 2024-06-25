import { Footer } from "../components/homepage/FotterMainPage";
import TariffBlock from "../components/homepage/TariffBlock";
import { Helmet } from 'react-helmet';

export default function MainPage() {
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
    <>
      <Helmet>
        <title>EzQr.kz - Электронное меню. Цифровизируйтесь уже сегодня</title>
        <meta name="description" content="Узнайте, как электронное QR-меню может увеличить доход, обеспечить гигиеничность, удобство обновления, повысить эффективность, поддержать экологичность и персонализацию." />
        <meta name="keywords" content="QR-меню, ресторан, электронное меню, увеличение дохода, гигиеничность, удобство обновления, повышение эффективности, экологичность, персонализация" />
        <meta property="og:title" content="EzQr.kz - Электронное меню. Цифровизируйтесь уже сегодня" />
        <meta property="og:description" content="Узнайте, как электронное QR-меню может увеличить доход, обеспечить гигиеничность, удобство обновления, повысить эффективность, поддержать экологичность и персонализацию." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezqr.kz/" />
        <meta property="og:image" content="https://ezqr.kz/img/logo_qr.png" />
      </Helmet>
      <section className='bg-gray-0 p-5 border-b'>
        <div className='container mx-auto'>
          <div className="flex justify-between">
            <div>
              {/* <img className="w-[100px] h-[30px] object-cover" src={'/img/logo_qr.png'}/> */}
              <span className="text-3xl font-semibold">EzQr.kz</span>
            </div>
            {/* <div className="flex gap-10 text-gray-700">
              <span>Главная</span>
              <span>Преимущества</span>
              <span>Тарифы</span>
              <span>Контакты</span>
            </div> */}
            <div className="flex gap-4">
              {/* <div className="flex gap-1 items-center">
                <img src={'/img/instagram_icon.png'} className="w-[30px] h-[30px]"/>
                <span>ezqr.kz</span>
              </div> */}
              <div className="flex gap-1 items-center">
                <div className="me-4 hidden md:block">
                  <a href="/login/" target="_blank" className="text-white bg-orange-600 hover:bg-orange-700 focus:orange-4 focus:orange-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-orange-900">
                    Войти в кабинет
                  </a>
                </div>
                <img src={'/img/WhatsApp_icon.png'} className="w-[30px] h-[30px]"/>
                <a  href="https://wa.me/77051214871" target="_blank">+7 705 121 4871</a>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </section>
      <section className="bg-gray-100 min-h-[500px]">
        <div className="container mx-auto h-full px-5 md:px-0">
          <div className="md:flex h-full items-center">
            <div className="text-center md:text-start w-full lg:w-2/3">
              <p className="font-semibold text-5xl leading-snug">Электронное QR меню - EzQr.kz</p>
              <p className="text-2xl">Увеличим  продажи и эффективность персонала.</p>
              <p className="text-2xl">Просто посмотрите демо</p>
              <div className="flex gap-3 mt-4 items-center justify-center md:items-start md:justify-start">
                <a className="p-4 bg-orange-700 hover:bg-orange-600 rounded-xl text-white text-lg" href="/establishment/3/" target="_blank">Демо</a>
                <a className="p-4 bg-orange-700 hover:bg-orange-600 rounded-xl text-white text-lg" href="https://wa.me/77051214871" target="_blank">Оставить заявку</a>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/3 justify-end items-center mt-5">
              <img src={'/img/mock_double.png'} className="md:h-[450px] object-cover"/>
                
        <div className="me-4 block md:hidden mb-4">
          <a href="/login/" target="_blank" className="text-white bg-orange-600 hover:bg-orange-700 focus:orange-4 focus:orange-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-orange-900">
            Войти в кабинет
          </a>
        </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto my-10">
          <div className="text-center w-full mt-5">
            <p className="font-semibold text-4xl">Преимущества</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-10 text-center">
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_1.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Увелечение дохода
              </p>
              <p className="text-gray-500 text-lg mt-3">
              QR-меню позволяет ресторанам предлагать специальные акции и обновления в реальном времени, стимулируя гостей к дополнительным заказам и увеличивая средний чек.
              </p>
            </div>
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_2.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Гигиеничность
              </p>
              <p className="text-gray-500 text-lg mt-3">
              QR-меню исключает необходимость в печатных меню, снижая риск передачи микробов и обеспечивая безопасные условия для гостей.
              </p>
            </div>
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_3.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Удобство обновления
              </p>
              <p className="text-gray-500 text-lg mt-3">
              Обновление меню происходит мгновенно, без затрат на печать и распределение новых версий. Это позволяет оперативно добавлять новые блюда и корректировать цены.
              </p>
            </div>
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_4.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Повышение эффективности
              </p>
              <p className="text-gray-500 text-lg mt-3">
              Официанты могут уделять больше времени обслуживанию гостей, так как QR-меню снижает нагрузку на прием заказов и позволяет гостям самостоятельно просматривать и заказывать блюда.
              </p>
            </div>
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_5.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Экологичность
              </p>
              <p className="text-gray-500 text-lg mt-3">
              QR-меню сокращает использование бумаги и типографских материалов, что помогает уменьшить экологический след ресторана.
              </p>
            </div>
            <div className="mx-5 md:mx-0">
              {/* <img src={'/img/3d_icons/3dicons_6.png'} className="w-[150px] h-[150px] object-cover"/> */}
              <p className="font-semibold text-gray-700 text-2xl">
              Возможность персонализации
              </p>
              <p className="text-gray-500 text-lg mt-3">
              QR-меню может быть настроено под уникальные потребности ресторана и его гостей, предлагая персонализированные рекомендации и специальные предложения на основе предпочтений посетителей.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100">
          <TariffBlock/>
      </section>
      <section className="bg-white pt-10">
        <div className="lg:grid grid-cols-2 container mx-auto mt-10 text-center lg:text-start ">
          <div className="flex items-center justify-center">
            <img src={`/img/snap-1.png`} className={` object-cover w-[300px] lg:w-full`}/>
          </div>
          <div className="mx-5">
            <p className="font-semibold text-4xl">Присоединяйтесь к нашей сети EzQr.kz</p>
            <p className="text-xl text-gray-500 mt-3">Будьте в тренде, цифровизируйте ваше меню, всегда имея гибкий инструмент для ведения вашего списка блюд</p>
            <p className="text-xl text-gray-500 mt-3">Телефон: +7 705 121 4871</p>
            <p className="text-xl text-gray-500 mt-3">Адрес: г. Астана, Туран 56/1</p>
            <div className="mb-10"></div>
            <a className="p-4 bg-orange-700 hover:bg-orange-600 rounded-xl text-white text-lg" href="https://wa.me/77051214871" target="_blank">Оставить заявку</a>
            <div className="mb-10 block lg:hidden"></div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
