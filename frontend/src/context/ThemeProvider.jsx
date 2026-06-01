import { useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = createContext(null);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [tema, setTema] = useLocalStorage('tema', 'claro');

    useEffect(() => {
        document.body.setAttribute('data-theme', tema);
    }, [tema]);

    const toggleTema = () => {
        setTema(t => t === 'claro' ? 'oscuro' : 'claro');
    };

    return (
        <ThemeContext.Provider value={{ tema, toggleTema }}>
            {children}
        </ThemeContext.Provider>
    );
}
