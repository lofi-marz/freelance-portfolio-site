import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSetStoredModeContext } from '@/components/DarkModeContextProvider';
import { Theme } from '../types';

function toggleTheme(theme: Theme): Theme {
    if (theme === 'dark') return 'light';
    return 'dark';
}

export function DarkModeSpacer() {
    return <div className="aspect-[2/1] h-16 w-full"></div>;
}

export function DarkModeToggle({ className }: { className?: string }) {
    const setStoredMode = useSetStoredModeContext();
    //TODO: The animation on hover is a little slow but it does work
    return (
        <motion.button
            layout
            className={clsx(
                'hover:themed-bg-invert hover:themed-text-invert flex flex-col items-center rounded transition-all duration-500 hover:aspect-[1/2]',
                className
            )}
            onClick={() => {}}>
            <DarkModeIcon dark={true} />
        </motion.button>
    );
}

function DarkModeIcon({ dark }: { dark: boolean }) {
    return (
        <motion.div
            className="flex aspect-square w-full flex-row items-center justify-center overflow-clip rounded-full p-1"
            layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={dark ? 'dark' : 'light'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {dark ? <FaMoon /> : <FaSun />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
