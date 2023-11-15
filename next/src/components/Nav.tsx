import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';
import { WithChildrenProps } from '../types';
import { FaBars } from 'react-icons/fa6';
export function NavLink({ children }: WithChildrenProps) {}

export function Nav() {
    return (
        <nav
            className={clsx(
                'fixed top-0 z-20 font-title flex h-16 w-full items-center justify-between px-6 text-xl mix-blend-difference'
            )}>
            <div className="text-dark font-semibold invert">
                mari<span className="text-primary">.</span>
            </div>
            <button className="text-light flex flex-row items-center justify-center gap-2 ">
                menu <FaBars />
            </button>
        </nav>
    );
}

export function NavSpacer() {
    return <div className="h-16"></div>;
}
