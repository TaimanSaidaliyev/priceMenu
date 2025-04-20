import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa6';
import { getTextColorForBackground } from '../../utils/getTextColor';
import { isLight } from '../../pages/EstablishmentMenuPage';

const ScrollToTopButton = ({establishment}:{establishment: IEstablishment | undefined}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buttonStyle = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    cursor: 'pointer',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <button
      onClick={scrollToTop}
      //@ts-ignore
      style={{...buttonStyle, backgroundColor: getTextColorForBackground(establishment?.default_color ?? '#000000') ? '#777777' : establishment?.default_color}}
      className={`${isLight ? 'text-gray-800' : 'text-white'} p-2 rounded-full`  }
      aria-label="Scroll to top"
    >
      <FaArrowUp size={30}/>
    </button>
  );
};

export default ScrollToTopButton;
