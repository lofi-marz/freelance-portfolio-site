import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';
import { WithChildrenProps } from '../types';
export function NavLink({ children }: WithChildrenProps) {}

export function Nav() {
    return (
        <nav
            className={clsx(
                'fixed top-0 z-20 font-title flex h-16 w-full items-center justify-center uppercase mix-blend-difference'
            )}>
            <ul className="flex w-full items-center justify-between px-16 text-sm font-bold md:justify-center md:gap-16">
                {['home', 'about', 'projects'].map((name) => (
                    <li key={name} className="">
                        <a href={'#' + name}>{name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function NavSpacer() {
    return <div className="h-16"></div>;
}
