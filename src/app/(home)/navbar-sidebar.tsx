import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  openChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, openChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={openChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 boder-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => openChange(false)}
            >
              {item.children}
            </Link>
          ))}
        </ScrollArea>
        <div className="border-t">
          <Link
            onClick={() => openChange(false)}
            href="/sign-in"
            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
          >
            Log in
          </Link>
          <Link
            onClick={() => openChange(false)}
            href="/sign-up"
            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
          >
            Start Selling
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
