import React from 'react'

export const ThemeInputText = ({onChange, value, className, required}:{onChange?: React.ChangeEventHandler<HTMLInputElement>, value?: string, className?: string, required?: boolean}) => {
  return (
    <input 
      type="text" 
      placeholder='Поиск' 
      onChange={onChange} 
      value={value} 
      required={required || false}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    />
  )
}

export const ThemeTextarea = ({onChange, value, className, rows}:{onChange?: React.ChangeEventHandler<HTMLTextAreaElement>, value?: string, className?: string, rows?: number}) => {
  return (
    <textarea 
      placeholder='Поиск' 
      onChange={onChange} 
      value={value} 
      rows={rows || 5}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    />
  )
}

export const ThemeInputNumber = ({onChange, value, required}:{onChange?: React.ChangeEventHandler<HTMLInputElement>, value?: string, required?: boolean}) => {
  return (
    <input 
      placeholder='Текущая цена' 
      onChange={onChange} 
      value={value} 
      type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      required={required || false}
    />
  )
}

export const ThemeSwitcher = ({onChange, checked, title}:{onChange?: React.ChangeEventHandler<HTMLInputElement>, checked?: boolean, title?: string}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" onChange={onChange} checked={checked}/>
        <div className="relative w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</span>
    </label>
  )
}


