import { useTranslation } from "react-i18next";
import Button from "./ui/button";
import { useListContext } from "../contexts/list-context";
import { Person } from "../types/person";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router";

export default function Add() {
    const { t } = useTranslation();
    const { addPerson, peoples } = useListContext();
    const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});
    const navigate = useNavigate();

    const add = () => {
        const name = (document.getElementById('name-input') as HTMLInputElement).value;
        const amount = (document.getElementById('amout-input') as HTMLInputElement).value;
        const newErrors: { name?: string; amount?: string } = {};

        if (!name) {
            newErrors.name = t('name-required');
        }

        if (!amount) {
            newErrors.amount = t('amount-required');
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const person: Person = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
        };

        addPerson(person);

        (document.getElementById('name-input') as HTMLInputElement).value = '';
        (document.getElementById('amout-input') as HTMLInputElement).value = '';
    };

    const handleInputChange = (field: 'name' | 'amount') => {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const calculate = () => {
        if (peoples.length < 3) {
            return;
        }

        navigate("/results");
    };

    return (
        <div className="w-full flex items-start space-x-3">
            <div className="flex w-2/3 flex-col items-center space-y-2">
                <form className="w-full">
                    <div className="w-full">
                        <input
                            id="name-input"
                            required
                            type="text"
                            placeholder={t('name')}
                            className={`border rounded-xl p-2 w-full bg-honeydew ${errors.name ? 'border-red-500' : 'mb-6 border-transparent'}`}
                            onChange={() => handleInputChange('name')}
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div className="w-full">
                        <input
                            id="amout-input"
                            required
                            min="0"
                            type="number"
                            placeholder={t('amount')}
                            className={`border rounded-xl p-2 w-full bg-honeydew ${errors.amount ? 'border-red-500' : 'mb-6 border-transparent'}`}
                            onChange={() => handleInputChange('amount')}
                        />
                        {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                    </div>
                    <Button onClick={add}>
                        {t('add')}
                    </Button>
                </form>

            </div>
            <div className="w-1/2 flex items-center">
                <Button
                    onClick={calculate}
                    disabled={peoples.length < 3}
                    className={`${peoples.length < 3 ? 'bg-jade/10 hover:cursor-not-allowed' : ''
                        }`}
                >
                    {t('calculate')}
                </Button>
            </div>
        </div>
    );
}