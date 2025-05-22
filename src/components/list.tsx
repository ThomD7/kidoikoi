import Person from "./person";
import { useListContext } from "../contexts/list-context";
import { Person as PersonType } from "../types/person";
import React from "react";

export default function List() {
    const { peoples, editPerson, deletePerson } = useListContext();

    const onEdit = (id: number, field: keyof PersonType, value: string) => {
        const person = peoples.find((p) => p.id === id);
        if (!person) return;
        const updatedPerson = {
            ...person,
            [field]: field === "amount" ? Number(value) : value,
        };
        editPerson(id, updatedPerson);
    };

    const onDelete = (id: number) => {
        deletePerson(id);
    };

    return (
        <div className="flex w-full flex-col space-y-2 mt-10">
            {peoples.map((person) => (
                <Person key={person.id} person={person} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}