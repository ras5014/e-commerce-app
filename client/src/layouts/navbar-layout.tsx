import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { categories } from "@/constants"
import { Link } from "react-router"
import { GalleryVerticalEnd, ShoppingCart, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';

export default function NavbarLayout() {
    return (
        <div className="w-full border-b py-4 px-20 flex justify-between items-center">

            <div className="flex justify-center gap-2 md:justify-start">
                <Link to="/" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    <span className="text-lg font-bold">E-Comm</span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent className="">
                                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {categories.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center">
                    <Input type="text" placeholder="Search products..." className="w-96" />
                    <Button className="ml-2 cursor-pointer"><Search /></Button>
                </div>
            </div>
            <div className="flex gap-8 items-center">

                <Popover>
                    <PopoverTrigger><User className="navbar-focus" /></PopoverTrigger>
                    <PopoverContent className="mt-4 mr-4">
                        <ul className="flex flex-col gap-2 py-2 ml-2">
                            <li className="navbar-focus">
                                <Link to="/orders">Orders</Link>
                            </li>
                            <li className="navbar-focus">
                                <Link to="/wishlist">Wishlist</Link>
                            </li>
                            <li className="navbar-focus">
                                <Link to="/saved-addresses">Saved Addresses</Link>
                            </li>
                            <Separator />
                            <li className="navbar-focus font-semibold">
                                <Link to="/edit-profile">Edit Profile</Link>
                            </li>
                            <li className="navbar-focus font-semibold">
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>

                <HoverCard>
                    <HoverCardTrigger><ShoppingCart className="navbar-focus" /></HoverCardTrigger>
                    <HoverCardContent className="mt-4 mr-4">
                        List Cart Items will be shown here
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link to={href}>
                    <img src="https://m.media-amazon.com/images/I/310MGJMMYJL._SR290,290_.jpg" className="" alt="" />
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
