import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Person } from '../types/person';

interface ListContextType {
    peoples: Person[];
    addPerson: (person: Person) => void;
    editPerson: (id: number, updatedPerson: Person) => void;
    deletePerson: (id: number) => void;
    resetList: () => void;
}

const STORAGE_KEY = "kidoikoi_peoples";

const ListContext = createContext<ListContextType | undefined>(undefined);

export function ListProvider({ children }: { children: ReactNode }) {
    const [peoples, setPeoples] = useState<Person[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(peoples));
    }, [peoples]);

    const addPerson = (person: Person) => {
        setPeoples((prev) => [...prev, person]);
    };

    const editPerson = (id: number, updatedPerson: Person) => {
        setPeoples((prev) =>
            prev.map((person) => (person.id === id ? updatedPerson : person))
        );
    };

    const deletePerson = (id: number) => {
        setPeoples((prev) => prev.filter((person) => person.id !== id));
    };

    const resetList = () => {
        setPeoples([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <ListContext.Provider value={{ peoples, addPerson, editPerson, deletePerson, resetList }}>
            {children}
        </ListContext.Provider>
    );
};

export const useListContext = () => {
    const context = useContext(ListContext);
    if (!context) {
        throw new Error('useListContext must be used within a ListProvider');
    }
    return context;
};