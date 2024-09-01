import React from "react";
import Image from "next/image";

import Link from "next/link";
// import { TriggerApplyFormModalButton } from 'components/App/Common/ApplyOnlineForm';

const showThemeSwitch = false;

const Hamburger: React.FC<any> = ({ onClick }) => {
  return (
    <button
      id="hamburger-menu"
      onClick={onClick}
      className="lg:hidden block hamburger-menu navbar-toggler"
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg> */}
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

const Header: React.FC<any> = ({ themeType, onSwitchTheme }) => {
  const onHamburgerClick = () => {
    const menu = document.getElementById("menu");
    const hamburger = document.getElementById("hamburger-menu");
    menu?.classList.toggle("on-mobile");
    hamburger?.classList.toggle("open");
  };

  return (
    <header className="w-full mb-4">
      <nav className="flex flex-wrap justify-between items-center px-4 md:px-20 py-3 shadow-sm">
        <Link href="/">
          <div className="w-32 relative h-14">
            <Image src={"/assets/logo.png"} fill alt="Education World" />
          </div>
        </Link>

        {/* <Hamburger onClick={onHamburgerClick} /> */}

        <div className="w-full lg:flex lg:items-center lg:w-auto" id="menu">
          <ul
            className="
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li>
              <Link
                className="nav-link md:mr-4 py-2 px-4 bg-neutral-200 rounded-lg"
                href="https://crm.edugyanam.com/admin/content/employee_leads_manage"
                target="_blank"
              >
                CRM
              </Link>
            </li>
            <li>
              <Link
                className="nav-link rounded-lg bg-green-600 py-2 px-4 text-white"
                href="https://eduworldglobal.com/"
                target="_blank"
              >
                Our Site
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
