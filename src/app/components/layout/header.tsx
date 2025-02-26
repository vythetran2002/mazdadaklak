"use client";

import { paths } from "@/app/utils/paths";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import images from "../../../../public/img";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FaPhone } from "react-icons/fa6";
import { usePathname } from "next/navigation";

interface NavSection {
  prefix?: React.ReactElement;
  label: string;
  url?: string;
  suffix?: React.ReactElement;
  children?: NavSection[];
  preffix?: React.ReactElement;
}

function Header() {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isActive = useMemo(() => {
    return (url?: string) => {
      return pathname === url;
    };
  }, [pathname]);

  const navSections: NavSection[] = useMemo(
    () => [
      {
        label: "Trang chủ",
        url: paths.index,
      },
      {
        label: "Giới thiệu",
        url: paths.about,
      },
      {
        label: "Sản phẩm",
        url: paths.products,
      },
      {
        label: "Showroom",
        suffix: <ChevronDownIcon />,
        url: paths.products,
        children: [
          {
            label: "Mazda Buôn Hồ",
            url: paths.showRoom.buonHo,
          },
          {
            label: "Mazda Buôn Ma Thuột",
            url: paths.showRoom.bmt,
          },
        ],
      },
      {
        label: "dịch vụ",
        url: paths.services,
      },
      {
        label: "Tin tức",
        url: paths.news.index,
        suffix: <ChevronDownIcon />,
        children: [
          {
            label: "Sự kiện",
            url: paths.news.event,
          },
          {
            label: "Ưu đãi",
            url: paths.news.promotion,
          },
        ],
      },
      {
        label: "Liên hệ",
        url: paths.contact,
      },
      {
        preffix: <FaPhone className="mr-[5px]" />,
        label: "0816789439",
      },
    ],
    [],
  );

  return (
    <header className="flex justify-center flex-row bg-[#444] min-h-[80px] ">
      <div className="w-[1080px] flex flex-row max-w-[1080px] m-auto px-[15px] items-center text-[white] text-[12.8px] font-bold leading-[20.48px] tracking-[0.256px]">
        <Image
          width={60}
          height={60}
          alt="mazda"
          src={images.mazdaLogo}
          className="mr-[30px]"
        />
        <span className="leading-tight uppercase flex-1">mazda đắk lắk</span>
        <ul className={`flex flex-row gap-[7px] py-[10px]`}>
          {navSections.map((nav: NavSection, index: number) => {
            return (
              <li
                key={index}
                className={`uppercase cursor-pointer hover:text-[white] duration-300 relative  ${
                  isActive(nav.url)
                    ? "text-[white]"
                    : "text-[hsla(0,0%,100%,.8)]"
                }
                  
                `}
              >
                <div
                  className="flex flex-row items-center "
                  onMouseOver={() => {
                    if (nav.children) setHoverIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (nav.children) setHoverIndex(null);
                  }}
                >
                  {nav.preffix && nav.preffix}
                  <span>{nav.label}</span>
                  {nav.suffix && nav.suffix}
                </div>
                {nav.children && (
                  <ul
                    onMouseOver={() => {
                      if (nav.children) setHoverIndex(index);
                    }}
                    onMouseLeave={() => {
                      if (nav.children) setHoverIndex(null);
                    }}
                    className={`flex flex-col gap-2 ${
                      hoverIndex === index ? "opacity-1" : "opacity-0"
                    }   duration-300  absolute top-[30px] left-[-30px] text-[#9a9a9a] bg-[white] min-w-[250px] py-5 border-[#d9d9d9] border-[1px] border-solid
                    `}
                  >
                    <div className="absolute top-[-10px] bottom-[20px] left-[30px] w-[30%] h-[20%] right-0 bg-[transparent] content-['']"></div>
                    {nav.children.map((child) => {
                      return (
                        <li
                          key={child.label}
                          className="hover:bg-[#d9d9d9] hover:text-black px-5 py-2 duration-300 text-sm"
                        >
                          <span>{child.label}</span>
                          <div className="absolute w-[20px] h-[20px] bg-[white] top-[-5px] left-[50px] rotate-45"></div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

export default Header;
