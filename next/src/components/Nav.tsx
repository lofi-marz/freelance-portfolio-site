import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';
import { WithChildrenProps } from '../types';
import { FaBars } from 'react-icons/fa6';
import { HiBars2 } from 'react-icons/hi2';
import { useState } from 'react';
export function NavLink({ children }: WithChildrenProps) {}

export function Nav() {
    const [open, setOpen] = useState(false);
    return (
        <nav
            className={clsx(
                'fixed top-0 z-20 font-title flex h-16 w-full items-center justify-between px-6 text-xl'
            )}>
            <div className="text-dark font-semibold invert">
                mari<span className="text-primary">.</span>
            </div>
            <button
                className="text-light flex flex-row items-center justify-center gap-2 z-10"
                onClick={() => setOpen((o) => !o)}>
                <HiBars2 />
            </button>
            {open && (
                <div className="h-screen w-1/2 bg-primary fixed right-0 top-0 flex items-center justify-center">
                    <div className="flex flex-col text-5xl font-semibold gap-8">
                        <div className="text-sm">navigation</div>
                        {['home', 'about', 'projects'].map((link) => (
                            <div>{link}</div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export function NavSpacer() {
    return <div className="h-16"></div>;
}
