import { Trash2 } from "lucide-react";
import { Person as PersonType } from "../types/person";
import { motion } from "framer-motion";
import React from "react";

export default function Person({
    person,
    onEdit,
    onDelete,
}: {
    person: PersonType;
    onEdit: (id: number, field: keyof PersonType, value: string) => void;
    onDelete: (id: number) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-row justify-between items-center bg-honeydew w-full px-2 py-3 rounded-xl"
        >
            <div className="flex gap-x-2 flex-1">
                <input
                    value={person.name}
                    onChange={e => onEdit(person.id, "name", e.target.value)}
                    className="rounded-md p-1 hover:bg-jade/10 w-1/2 min-w-0"
                />
                <input
                    type="number"
                    value={person.amount}
                    onChange={e => onEdit(person.id, "amount", e.target.value)}
                    className="rounded-md p-1 hover:bg-jade/10 w-1/2 min-w-0"
                />
            </div>
            <div className="flex flex-row space-x-2 ms-2">
                <button
                    onClick={() => onDelete(person.id)}
                    className="bg-red-500 text-white px-2 py-2 me-1 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}