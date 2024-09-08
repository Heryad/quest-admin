'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Button } from "../ui/button";
import { Activity, CreditCard, Database, Home, HomeIcon, IceCream, List, LogOut, LucideIcon, Map, Receipt, Settings, ShoppingCart, Star, StarIcon, User, User2 } from "lucide-react";

type Props = {};

type NavProps = {
    title: string;
    href: string;
    icon: LucideIcon;
    type: string;
}
  
const items: NavProps[] = [
    {
        title: 'Main',
        icon: IceCream,
        href: '',
        type: 'sep'
    },
    {
        title: 'Dashboard',
        icon: Database,
        href: '/',
        type: 'link'
    },
    {
        title: 'Analytics',
        icon: IceCream,
        href: '',
        type: 'sep'
    },
    {
        title: 'Users',
        icon: User,
        href: '/users',
        type: 'link'
    },
    {
        title: 'Reviews & Feedbacks',
        icon: StarIcon,
        href: '/feedbacks',
        type: 'link'
    },
    {
        title: 'App',
        icon: IceCream,
        href: '',
        type: 'sep'
    },
    {
        title: 'Vendors',
        icon: HomeIcon,
        href: '/vendors',
        type: 'link'
    },
    {
        title: 'Activities',
        icon: Activity,
        href: '/activities',
        type: 'link'
    },
    {
        title: 'Cities',
        icon: Map,
        href: '/cities',
        type: 'link'
    },
    {
        title: 'Categories',
        icon: List,
        href: '/categories',
        type: 'link'
    },
    {
        title: 'Finance',
        icon: IceCream,
        href: '',
        type: 'sep'
    },
    {
        title: 'Bookings',
        icon: ShoppingCart,
        href: '/booking',
        type: 'link'
    },
    {
        title: 'Payment Types',
        icon: CreditCard,
        href: '/payments',
        type: 'link'
    },
    {
        title: 'Settings',
        icon: Settings,
        href: '/',
        type: 'link'
    },
    {
        title: 'Dashboard',
        icon: IceCream,
        href: '',
        type: 'sep'
    },
    {
        title: 'Admins',
        icon: User2,
        href: '/admins',
        type: 'link'
    }
]

export default function SideNavbar({}: Props){
    const pathname = usePathname()

    return (
        <main className="w-64 h-screen justify-center items-center flex flex-col">
            {items.map(items => (
                items.type == 'sep' ? <text className="text-left w-48 mb-0 mt-5">{items.title}</text> : 
                <Button className={`justify-start min-w-52 mt-2 ml-2 ${items.href == pathname.replace('/dashboard', '') ? 'bg-black hover:text-white hover:bg-black' : 'bg-white text-black hover:text-white hover:bg-black'}`}>
                    <items.icon className="mr-2"/>
                    <Link as={items} href={pathname == '/dashboard' ? `dashboard${items.href}` : '.' + items.href}>{items.title}</Link>
                </Button>
            ))}
        </main>
    )
}