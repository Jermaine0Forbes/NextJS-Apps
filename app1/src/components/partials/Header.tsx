import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
//   NavigationMenuLink,

} from "@/components/ui/navigation-menu";


export default function Header() 
{

    return (
        <header id="header" className="grid grid-flow-col grid-cols-3 py-2">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>
              <NavigationMenuItem>
                  <Link href={'/'}>home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <Link href={'/register'}>register</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <Link href={'/login'}>login</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <Link href={'/users'}>users</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
    );
}