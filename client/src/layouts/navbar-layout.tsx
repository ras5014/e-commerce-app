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
import { ShoppingCart, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function NavbarLayout() {
    return (
        <div className="w-full border-b py-4 px-20 flex justify-between items-center">
            <div>Logo</div>
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
                <div>
                    <Input type="text" placeholder="Search products..." className="w-96" />
                </div>
            </div>
            <div className="flex gap-8 items-center">
                <div><User /></div>
                <div> <ShoppingCart /></div>
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
