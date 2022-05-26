import {Link} from '@shopify/hydrogen';
import Logo from './Logo.client';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

export default function HeaderBackground() {
  const [scrolledDown, setScrolledDown] = useState(false);

  const handleScroll = () => {
    setScrolledDown(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Background */}
      <div
        className={clsx([
          'absolute inset-0 bg-white transition-opacity duration-500',
          scrolledDown ? 'opacity-100' : 'opacity-0',
        ])}
      />

      {/* Logo */}
      <div className="absolute bottom-0 top-0 left-1/2 flex -translate-x-1/2 items-center">
        <Link className="font-bold" to="/">
          <Logo
            classNameMark={clsx([
              'transition-all duration-700',
              scrolledDown ? 'translate-y-1/4' : 'translate-y-0',
            ])}
            classNameType={clsx([
              'transition-all duration-500',
              scrolledDown
                ? 'opacity-0 translate-y-1'
                : 'opacity-100 translate-y-0',
            ])}
          />
        </Link>
      </div>
    </div>
  );
}
