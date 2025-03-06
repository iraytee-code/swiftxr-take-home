import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [{ label: "Home", href: "/" }];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDropdown = (label: string) => {
        setActiveDropdown((prev) => (prev === label ? null : label));
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="w-full bg-black mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex items-center">
                        <a
                            href="/"
                            className="text-xl md:text-2xl font-bold text-white "
                        >
                            swiftXR
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navItems.map((item, index) => (
                            <div
                                key={item.label}
                                className="relative"
                                style={
                                    {
                                        "--item-index": index,
                                    } as React.CSSProperties
                                }
                            >
                                {item.children ? (
                                    <div className="nav-item">
                                        <button
                                            onClick={() =>
                                                toggleDropdown(item.label)
                                            }
                                            className={cn(
                                                "nav-link group flex items-center",
                                                activeDropdown === item.label
                                                    ? "active"
                                                    : ""
                                            )}
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={cn(
                                                    "ml-1 h-4 w-4 transition-transform duration-200",
                                                    activeDropdown ===
                                                        item.label
                                                        ? "rotate-180"
                                                        : ""
                                                )}
                                            />
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black ring-opacity-5 animate-scale-in origin-top-left">
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                >
                                                    {item.children.map(
                                                        (child) => (
                                                            <a
                                                                key={
                                                                    child.label
                                                                }
                                                                href={
                                                                    child.href
                                                                }
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                                                role="menuitem"
                                                            >
                                                                {child.label}
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="nav-item nav-link"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Navigation Toggle */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden h-screen bg-white">
                    <nav className="px-4 pt-2 pb-5 space-y-1 animate-slide-in">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                toggleDropdown(item.label)
                                            }
                                            className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={cn(
                                                    "ml-1 h-4 w-4 transition-transform duration-200",
                                                    activeDropdown ===
                                                        item.label
                                                        ? "rotate-180"
                                                        : ""
                                                )}
                                            />
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="pl-4 space-y-1 animate-fade-in">
                                                {item.children.map((child) => (
                                                    <a
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                                    >
                                                        {child.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
