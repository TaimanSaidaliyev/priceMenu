import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { User } from "../api/api";
import { setCookie } from "../utils/cookie";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { WEBSITE_NAME } from "../configs/config";

interface IUserForm {
    username: string;
    password: string;
}

export default function AuthorizationPage() {
    document.title = WEBSITE_NAME + 'Страница авторизации';
    let navigate = useNavigate();
    const [userForm, setUserForm] = useState<IUserForm>({username: '', password: ''});
    const [error, setError] = useState<boolean>(false);

    const notifySuccess = () => toast.success("Вы авторизировались успешно", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    const [getAuthToken, isGetAuthTokenLoading] = useFetching(async () => {
        await User.getToken(userForm)
        .then((value)=>{
            setCookie('token', value.data.auth_token);
            notifySuccess();
            setTimeout(async ()=>{
                window.location.href = "/settings/menu/";
                // console.log('')
            },2000);
            getEstablishmentIdByToken();
        })
        .catch(()=>{
            setError(true);
        });
    });

    const [getEstablishmentIdByToken] = useFetching(async () => {
        await User.getEstablishmentIdByToken()
        .then((value)=>{
            setCookie('establishment_id', value.data.establishment_id);
        })
        .catch(()=>{
        });
    });

    const [checkToken] = useFetching(async () => {
        await User.checkToken().then((res)=>{
            if(res.data.status){
                return navigate("/settings/menu/");
            }
        })
    });

    useEffect(()=>{
        checkToken();
    },[]);

    useEffect(()=>{
        setError(false);
    },[userForm]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getAuthToken();
    };

    return (
    <>
        <ToastContainer/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto"
                    src="/img/logo_qr.png"
                    alt="Your Company"
                />
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Цифровизация вашего меню
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Ваш логин
                        </label>
                        <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            value={userForm.username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserForm((form: IUserForm)=>({...form, username: event.target.value}))}
                            required
                            className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Пароль
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Забыли пароль?
                            </a>
                        </div>
                        </div>
                        <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={userForm.password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserForm((form: IUserForm)=>({...form, password: event.target.value}))}
                            required
                            className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                        {
                            error &&
                            <div className="flex text-center justify-center text-red-500 mt-5">
                                Введенный логин или пароль неверный. Попробуйте еще раз.
                            </div> 
                        }
                        
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                isGetAuthTokenLoading ?
                                <>
                                    <MoonLoader size={18} className="me-3" color="white"/>
                                    Загрузка...
                                </>
                                :
                                <>Вход</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}
