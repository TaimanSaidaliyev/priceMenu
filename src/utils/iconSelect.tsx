import React from 'react'
import * as FaIcons from 'react-icons/fa6'
import * as TbIcons from 'react-icons/tb'
import * as GiIcons from 'react-icons/gi'
import * as PiIcons from 'react-icons/pi'

// Объединяем все библиотеки в один массив, порядок в котором определит приоритет поиска
const iconLibraries: Record<string, React.ComponentType<any>>[] = [
  FaIcons,
  TbIcons,
  GiIcons,
  PiIcons,
];

export default function iconSelect(iconName: string, size?: number) {
  for (const library of iconLibraries) {
    if (iconName in library) {
      // Находим компонент и возвращаем его как JSX элемент
      const IconComponent = library[iconName] as React.ComponentType<any>;
      return <IconComponent size={size}/>;
    }
  }
  // Если ничего не найдено, возвращаем null
  return null;
}