import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'

import NavIcon from './NavIcon'
import { navigationHeader } from '../../../../utils/constants/navigation';

import Logo from './Logo';
import Nav from './Nav';

const submenu = [
  { name: 'Activité culturelles', href: '/category/:category' },
  { name: 'Activité manuelles', href: '/category/:category' },
  { name: 'Activités Sportives', href: '/category/:category' },
  { name: 'Activités Artistiques', href: '/category/:category' },
  { name: 'Activités d\'éveil corporel', href: '/category/:category' },
  { name: 'Autre', href: '/category/:category' },
]

const titleProp = navigationHeader.titleProp;
// const navigation = navigationHeader.navigation;
const navIcon = navigationHeader.navIcon;

export default function Navbar() {
  return (
    <div className="relative z-20">
      <div className="header__navbar--flex">
        <Logo titleProp={titleProp} />
        <div className="md:-my-2 md:-mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:underline">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Nav submenu={submenu}/>
        <NavIcon navIcon={navIcon} />
      </div>
    </div>
  )
}