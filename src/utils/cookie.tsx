import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
    const valueToSave: string = value;
    Cookies.set(key, valueToSave, { expires: 7 });
}

export const getCookie = (key: string) => {
    const savedValue = Cookies.get(key);
    return savedValue;
}

export const deleteCookie = (key: string) => {
    Cookies.remove(key);
  };
