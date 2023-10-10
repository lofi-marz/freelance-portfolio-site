import { Dispatch, createContext, SetStateAction, useContext } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Theme, WithChildrenProps } from '../types';

const DarkModeContext = createContext<Theme>('light');
const SetStoredModeContext = createContext<
    Dispatch<SetStateAction<Theme | null>>
>((value) => {
    console.log('Default function:', value);
});

export function useSetStoredModeContext() {
    return useContext(SetStoredModeContext);
}
export function DarkModeContextProvider({ children }: WithChildrenProps) {
    const [darkMode, setStoredMode] = useDarkMode();
    return (
        <DarkModeContext.Provider value={darkMode ?? 'light'}>
            <SetStoredModeContext.Provider value={setStoredMode}>
                {children}
            </SetStoredModeContext.Provider>
        </DarkModeContext.Provider>
    );
}
