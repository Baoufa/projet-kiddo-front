import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'

import NavIcon from './NavIcon'
import { navigationHeader } from '../../../../utils/constants/navigation';

import Logo from '../../../shared/Logo';
import Nav from './Nav';

const titleProp = navigationHeader.titleProp;
const navigation = navigationHeader.navigation;
const navIcon = navigationHeader.navIcon;

export default function Navbar() {
  return (
    <div className="relative z-20">
      <div className="header__navbar--flex">
        <Logo titleProp={titleProp} className="w-36 h-36"/>
        <div className="md:-my-2 md:-mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:underline">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Nav navigation={navigation}/>
        <NavIcon navIcon={navIcon} />
      </div>
    </div>
  )
}