import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import { useFetching } from "../hooks/useFetching";
import { Establishment, User } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, Fragment  } from "react";
// import QRCode from "react-qr-code";
import { QRCode } from 'react-qrcode-logo';

import { BACK_HOST, LOGO, WEBSITE_NAME } from "../configs/config";
import { ThemeInputText, ThemeSwitcher, ThemeTextarea } from "../ui/ThemeForms";
import { HexColorPicker } from "react-colorful";
import { Menu, Transition } from '@headlessui/react'
import { isFile } from "../utils/ifFile";
import { MoonLoader } from "react-spinners";
import { FaDownload } from "react-icons/fa6";


export default function SettingsGeneralPage() {
    document.title = WEBSITE_NAME + 'Общие настройки';
    let navigate = useNavigate();
    const formData = new FormData();

    const [establishmentId, setEstablishementId] = useState<string>('0');
    const [establishment, setEstablishment] = useState<IEstablishment>({id: '0', default_color: '', title:'', address: '', backgroundImage: null, description: '', menu_view_type: '', phoneNumber: '', photo: null, secondary_color: false, workTime: '', tags_type_view: ''});

    const [getEstablishmentIdByToken] = useFetching(async () => {
        const response = await User.getEstablishmentIdByToken()
        .then((value)=>{
            setEstablishementId(value.data.establishment_id);
        })
        .catch((error)=>{
        });
    });

    const [getEstablishmentInfomation, isGetEstablishmentInfomationLoading, isGetEstablishmentInfomationError] = useFetching(async () => {
        const response = await Establishment.getEstablishmentInformationById(establishmentId);
        setEstablishment(response.data.establishment);
    });
    const [setEstablishmentInfomation, isSetEstablishmentInfomationLoading, isSetEstablishmentInfomationError] = useFetching(async () => {
        const response = await Establishment.updateEstablishmentInfo(establishmentId, formData)
        .then(()=>{
            notifySuccess();
            getEstablishmentInfomation();
        });
    });

    const urlQr = `https://${window.location.hostname}/establishment/${establishmentId}/`

    const [checkToken] = useFetching(async () => {
        const response = await User.checkToken().then((res)=>{
            if(!res.data.status){
                return navigate("/login");
            }
        })
    });

    useEffect(()=>{
        getEstablishmentIdByToken(); 
    },[])

    useEffect(()=>{
        checkToken();
    },[]);

    useEffect(()=>{
        if(establishmentId != '0'){
            getEstablishmentInfomation();
        }
    },[establishmentId])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append('id', establishment.id);
        formData.append('title', establishment.title);
        formData.append('default_color', establishment.default_color);
        formData.append('description', establishment.description || '');
        formData.append('workTime', establishment.workTime || '');
        formData.append('menu_view_type', establishment.menu_view_type || '');
        //@ts-ignore
        formData.append('tags_type_view', establishment?.tags_type_view);

        if (isFile(establishment.photo)) {
            formData.append('photo', establishment.photo);
        }
        else {
            delete establishment.photo;
        }

        if (isFile(establishment.backgroundImage)) {
            formData.append('backgroundImage', establishment.backgroundImage);
        }
        else {
            delete establishment.backgroundImage;
        }
        setEstablishmentInfomation();
    };

    const notifySuccess = () => toast.success("Изменения сохранены", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const downloadJPG = (e: Event) => {
        e.preventDefault();
        const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
        if (!canvas) return;
    
        const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);
    
        const link = document.createElement('a');
        link.href = jpgUrl;
        link.download = 'qr-code.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
    
    return (
        <div className='flex w-full justify-center'>
            <ToastContainer/>
            <div className='bg-white max-w-[1366px] w-full border-gray-200 border'>
                <Header page={'general'}/>
                {
                    !isGetEstablishmentInfomationLoading 
                    ?
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="md:flex md:flex-row gap-4 p-5">
                            <div className="w-full md:w-[300px]">
                                <img src={`${BACK_HOST}${establishment?.photo}`} className="object-cover w-full rounded-lg"/>
                                <div className="mt-3">
                                    <p className='mt-4'>Изменить изображение</p>
                                    <input 
                                        type="file" 
                                        name="small-file-input" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{ setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, photo: event.target.files && event.target.files[0]}))}}
                                        id="small-file-input"
                                        className="block 
                                            w-full border border-gray-200 
                                            shadow-sm rounded-lg text-sm focus:z-10 
                                            focus:border-blue-500 focus:ring-blue-500 
                                            disabled:opacity-50 disabled:pointer-events-none 
                                            dark:bg-slate-900 dark:border-gray-700 
                                            dark:text-gray-400 dark:focus:outline-none 
                                            dark:focus:ring-1 dark:focus:ring-gray-600
                                            file:bg-gray-100 file:border-0
                                            file:me-4
                                            file:py-2 file:px-4
                                            dark:file:bg-gray-700 dark:file:text-gray-400
                                            cursor-pointer"
                                    />
                                </div>
                                <div className="mt-3">
                                    <p className='mt-4'>Изменить фон</p>
                                    <input 
                                        type="file" 
                                        name="small-file-input" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{ setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, backgroundImage: event.target.files && event.target.files[0]}))}}
                                        id="small-file-input"
                                        className="block 
                                            w-full border border-gray-200 
                                            shadow-sm rounded-lg text-sm focus:z-10 
                                            focus:border-blue-500 focus:ring-blue-500 
                                            disabled:opacity-50 disabled:pointer-events-none 
                                            dark:bg-slate-900 dark:border-gray-700 
                                            dark:text-gray-400 dark:focus:outline-none 
                                            dark:focus:ring-1 dark:focus:ring-gray-600
                                            file:bg-gray-100 file:border-0
                                            file:me-4
                                            file:py-2 file:px-4
                                            dark:file:bg-gray-700 dark:file:text-gray-400
                                            cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[300px]">
                                <div>
                                    <p className='font-semibold'>Название ресторана</p>
                                    <ThemeInputText value={establishment?.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, title: e.target.value}))}} className={'w-full'} required disabled/>
                                </div>
                                <div className="mt-3">
                                    <p className='font-semibold'>Описание</p>
                                    <ThemeTextarea value={establishment?.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, description: e.target.value}))}} className={'w-full'}/>
                                </div>
                                
                            </div>
                            <div className="w-fill md:w-[300px]">
                                <div >
                                    <p className='font-semibold'>Цвет заведения</p>
                                    <div className="flex w-[200px]">
                                        <ThemeInputText value={establishment?.default_color} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, color: e.target.value}))}} className={'w-full'} required/>
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <div style={{backgroundColor: establishment?.default_color}} className='rounded-full h-[40px] w-[40px] border-gray-200 border-2'></div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <HexColorPicker color={establishment?.default_color} onChange={(newColor: string)=>setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, default_color: newColor}))} />
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className='font-semibold'>Режим работы</p>
                                    <ThemeInputText value={establishment?.workTime} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, workTime: e.target.value}))}} className={'w-full'} required/>
                                </div>
                                <div className="mt-3">
                                    <p className='font-semibold'>Режим отображения</p>
                                    <select value={establishment.menu_view_type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        onChange={(e)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, menu_view_type: e.target.value}))}}>
                                        <option value={'Square'}>Квадратные плиты</option>
                                        <option value={'List'}>Список</option>
                                        <option value={'NoImage'}>Без картинок</option>
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <p className='font-semibold'>Вид тегов</p>
                                    <select value={establishment.tags_type_view} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        onChange={(e)=>{setEstablishment((prevState: IEstablishment | undefined) => ({...prevState!, tags_type_view: e.target.value}))}}>
                                        <option value={'FIRST'}>Стандартный</option>
                                        <option value={'SECOND'}>Упрощенный</option>
                                        <option value={'THIRD'}>Одним стилем</option>
                                    </select>
                                </div>

                            </div>
                            <div className="flex-grow ">
                                <p className="text-center pt-5 ">QR для распечатки</p>
                                <p className="flex justify-center">
                                    <div className="relative">
                                        <QRCode
                                            id="qr-canvas"
                                            //@ts-ignore
                                            className="mx-auto"
                                            size={128}
                                            style={{ 
                                                height: "auto",
                                                width: "100%",
                                                maxWidth: "300px",
                                            }}
                                            fgColor="#000000"
                                            logoWidth={40}
                                            logoHeight={40}
                                            logoImage={`${LOGO}`}
                                            eyeColor={establishment.default_color}
                                            eyeRadius={5}
                                            logoPaddingStyle="circle"
                                            qrStyle="squares"
                                            value={urlQr}
                                        />
                                        <div className="absolute bg-blue-500 rounded-lg right-4 top-4 p-3 justify-center cursor-pointer" onClick={(e)=>downloadJPG(
                                            //@ts-ignore
                                            e
                                        )}>
                                            <FaDownload color="white" size={20}/>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            
                        </div>
                        <div className="px-5 pb-5 text-center">
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                            >
                                {
                                    isSetEstablishmentInfomationLoading ?
                                    <>
                                        <MoonLoader size={18} className="me-3" color="white"/>
                                        Загрузка...
                                    </>
                                    :
                                    <>Сохранить</>
                                }
                            </button>
                        </div>
                    </form>
                    :
                    <div className="h-[400px] flex items-center justify-center">
                        <MoonLoader/>
                    </div>
                }
            </div>
        </div>
    )
}
