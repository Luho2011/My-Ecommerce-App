"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from "@/store/cart-store"
import { useSession } from "next-auth/react";
import { genders, menu, brands, MenuSection } from "@/lib/menu"
import { useParams, usePathname } from "next/navigation"
import { UserIcon } from "@heroicons/react/24/outline"
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import SearchBar from './SearchBar';



export default function NavBar() {
const [openSection, setOpenSection] = useState<string | null>(null);
const [burgerLevel, setBurgerLevel] = useState<"main" | "section" | "brands">("main");
const [activeBurgerSection, setActiveBurgerSection] = useState<MenuSection | null>(null);
const [menuOpen, setMenuOpen] = useState(false);
const [burgerOpen, setBurgerOpen] = useState(false);
const { data: session } = useSession();
const userId = (session?.user as { id?: string })?.id;
const items = useCartStore(state => state.items)
const clearCart = useCartStore(state => state.clear)
const pathname = usePathname()
const [visible, setVisible] = useState(true)
const [lastScrollY, setLastScrollY] = useState(0)
let activeGender: "herren" | "damen" = "herren";

if (pathname.startsWith("/shop/")) {
  activeGender = pathname.split("/")[2] as "herren" | "damen";
} else if (pathname.startsWith("/damen")) {
  activeGender = "damen";
} else if (pathname.startsWith("/herren")) {
  activeGender = "herren";
}

//reduce zählt Anzahl an items im array wie items.length, welches aber nur unterschiedliche items zählt anstatt insgesamt
const totalItems = items.reduce(
  (sum, item) => sum + item.quantity,
  0
)

//Navbar scroll Verhalten
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // scroll nach unten
      setVisible(false)
    } else {
      // scroll nach oben
      setVisible(true)
    }

    setLastScrollY(currentScrollY)
  }

  window.addEventListener("scroll", handleScroll)

  return () => {
    window.removeEventListener("scroll", handleScroll)
  }
}, [lastScrollY])


  return (
    <nav className={`[@media(max-width:949px)]:gap-5 bg-gray-950 flex items-center justify-center sticky top-0 z-100 w-full h-18 gap-20 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
       {/* --- MOBILE HEADER --- */}
        <div className='hidden [@media(max-width:949px)]:flex relative left-0 px-4 h-18'>
          <button
            onClick={() => setBurgerOpen(!burgerOpen)}
            aria-label="Menü öffnen"
            className="text-white cursor-pointer"
          >
            {burgerOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
            {burgerOpen && (
              <div className="absolute top-full left-0 bg-gray-700 p-6 z-110 flex flex-col gap-4">

                 {/* GENDER SWITCH */}
                <div className="flex gap-4">
                  {genders.map((gender) => (
                    <Link
                      key={gender}
                      href={`/${gender}`}
                      className={`
                        px-4 py-3 flex h-15 w-35 items-center justify-center uppercase italic text-white border cursor-pointer
                        ${activeGender === gender ? "bg-gray-950" : "bg-gray-700"}
                      `}
                    >
                      {gender}
                    </Link>
                  ))}
                </div>

                  {/* LEVEL 1 */}
                {burgerLevel === "main" && (
                  <>
                  {(Object.keys(menu) as MenuSection[]).map((section) => {
                    return (
                      <button
                        key={section}
                        onClick={() => {
                          setActiveBurgerSection(section); // ✅ section ist MenuSection
                          setBurgerLevel("section");
                        }}
                        className="text-left py-3 border-b border-white text-white cursor-pointer"
                      >
                        {section} →
                      </button>
                    );
                  })}

                    <button
                      onClick={() => setBurgerLevel("brands")}
                      className="text-left py-3 border-b border-white text-white cursor-pointer"
                    >
                      Marken →
                    </button>
                  </>
                )}

                  {/* LEVEL 2 – Kategorien */}
                {burgerLevel === "section" && activeBurgerSection && (
                  <>
                    <button
                      onClick={() => setBurgerLevel("main")}
                      className="py-3 font-semibold text-white cursor-pointer hover:text-blue-600"
                    >
                      ← Zurück
                    </button>

                    {menu[activeBurgerSection].map((category) => (
                      <Link
                        key={category}
                        href={`/shop/${activeGender}/${category}`}
                        className="block py-2 capitalize text-white hover:text-blue-600"
                        onClick={() => setBurgerOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </>
                )}

                  {/* LEVEL 2 – Marken */}
                {burgerLevel === "brands" && (
                  <>
                    <button
                      onClick={() => setBurgerLevel("main")}
                      className="py-3 font-semibold text-white hover:text-blue-600 cursor-pointer"
                    >
                      ← Zurück
                    </button>

                    {brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/shop/${activeGender}/brand/${brand}`}
                        className="block py-2 capitalize text-white hover:text-blue-600"
                        onClick={() => setBurgerOpen(false)}
                      >
                        {brand}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            )}
        </div>



          {/* --- DESKTOP HEADER --- */}
      <Link href="/">
         <h1 className='hidden [@media(min-width:1169px)]:flex text-amber-50 text-3xl italic'>Home</h1>
      </Link>
        <div className='hidden [@media(min-width:950px)]:flex gap-1'>
            {genders.map(gender => (
                <Link
                    key={gender}
                    href={`/${gender}`}
                    className={`
                    px-4 h-18 w-40 flex items-center justify-center cursor-pointer hover:bg-gray-700
                    ${activeGender === gender ? "bg-gray-700" : "bg-gray-950"}
                    `}
                >
                    <h1 className='text-amber-50 text-xl uppercase italic'>{gender}</h1>
                </Link>
            ))}
                <div className={`absolute top-full h-13 left-0 right-0 bg-gray-700 flex items-center justify-center gap-5  ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {Object.entries(menu).map(([section, categories]) => (
                        <div
                           key={section}
                           className="relative hover:bg-white group"
                           onMouseEnter={() => setOpenSection(section)}
                           onMouseLeave={() => setOpenSection(null)}
                        >
                            <button className='cursor-pointer px-3 h-13'>
                                 <p className='text-white group-hover:text-black'>{section}</p>
                            </button>
                            {openSection === section && (
                            <div className=''>
                                <ul className='bg-white absolute py-2'>
                                    {categories.map(category => (
                                        <li key={category}>
                                            <Link
                                                href={`/shop/${activeGender}/${category}`}  
                                                className="block px-8 py-1 hover:text-blue-500 capitalize"
                                            >
                                                {category}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            )}
                        </div>
                    ))}
                      <div
                        className="relative hover:bg-white group"
                        onMouseEnter={() => setOpenSection("brands")}
                        onMouseLeave={() => setOpenSection(null)}
                      >
                        <button className="cursor-pointer px-3 h-13">
                          <p className="text-white group-hover:text-black">Marken</p>
                        </button>

                        {openSection === "brands" && (
                          <ul className="bg-white absolute py-2">
                            {brands.map((brand) => (
                              <li key={brand}>
                                <Link
                                  href={`/shop/${activeGender}/brand/${brand}`}
                                  className="block px-8 py-1 hover:text-blue-500 capitalize"
                                >
                                  {brand}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                </div>
 
        </div>

        <div className='flex-1 max-w-150'>
           <SearchBar />
        </div>

        <div
        className='text-white cursor-pointer hover:border rounded-md w-10 h-10 flex justify-center items-center relative'
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        >
          <UserIcon className='h-8 w-8' />

            {menuOpen && (
               session ? (
                    <form action="/api/auth/signout" method="post">
                        <button 
                            onClick={() =>{
                             clearCart()    
                            }}
                            type="submit" className='cursor-pointer text-white bg-gray-950 px-5 py-1 hover:bg-gray-800 uppercase 
                                                     absolute top-full left-1/2 -translate-x-1/2 rounded-md border border-white'>
                            Logout
                        </button>
                    </form>
               ) : (
                <div className='bg-white border border-black absolute top-full h-18 px-3 rounded-md flex justify-center items-center'>
                    <Link href="/login">
                        <div className='flex gap-2'>
                            <h1 className='text-white bg-gray-950 px-8 py-1 hover:bg-gray-800 uppercase'>Anmelden</h1>
                            <h1 className='text-white bg-gray-950 px-5 py-1 hover:bg-gray-800 uppercase'>Registrieren</h1>
                        </div>
                    </Link>
                </div>
               )
            )}
        </div>
        
            {session && (
              <p className="[@media(max-width:1350px)]:hidden text-[16px] text-white">
                 Hallo, {session?.user?.name}
              </p>
            )}
        
        <Link href="/cart" className='relative'>
            <ShoppingBagIcon className='[@media(max-width:1660px)]:mr-5 h-8 w-8 text-white'/>
              {totalItems > 0 && (
                <span className="[@media(max-width:1660px)]:mr-5
                absolute -top-2 -right-2
                bg-red-500 text-white
                text-xs font-bold
                rounded-full
                px-2
                ">
                 {totalItems}
                </span>
              )}
        </Link>

    </nav>
  )
}

