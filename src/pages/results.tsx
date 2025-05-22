import Layout from "../components/ui/layout";
import { useListContext } from "../contexts/list-context";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router";
import { MoveRight } from "lucide-react";
import Button from "../components/ui/button";

type Transaction = { from: string; to: string; amount: number };

function calculateSettlements(peoples: { name: string; amount: number }[]): Transaction[] {
    const n = peoples.length;
    if (n === 0) return [];

    const total = peoples.reduce((sum, p) => sum + p.amount, 0);
    const average = total / n;

    const balances = peoples.map(p => ({
        name: p.name,
        balance: +(p.amount - average).toFixed(2),
    }));

    const debtors = [...balances].filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);
    const creditors = [...balances].filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);

    const transactions: Transaction[] = [];

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const amount = Math.min(-debtor.balance, creditor.balance);

        if (amount > 0.01) {
            transactions.push({
                from: debtor.name,
                to: creditor.name,
                amount: +amount.toFixed(2),
            });
            debtor.balance += amount;
            creditor.balance -= amount;
        }

        if (Math.abs(debtor.balance) < 0.01) i++;
        if (creditor.balance < 0.01) j++;
    }

    return transactions;
}

function encodePeoples(peoples: { name: string; amount: number }[]) {
    return encodeURIComponent(btoa(JSON.stringify(peoples)));
}

function decodePeoples(str: string) {
    try {
        return JSON.parse(atob(decodeURIComponent(str)));
    } catch {
        return [];
    }
}

export default function Results() {
    const { peoples } = useListContext();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (!params.get("data") && peoples.length > 0) {
            params.set("data", encodePeoples(peoples));
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        }
    }, [peoples, location.pathname]);

    const params = new URLSearchParams(location.search);
    const peoplesFromUrl = params.get("data") ? decodePeoples(params.get("data")!) : peoples;

    const transactions = calculateSettlements(peoplesFromUrl);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    useEffect(() => {
        if (peoples.length < 3) {
            navigate("/");
        }
    }, [peoples]);


    return (
        <Layout>
            <title>{`Kidoikoi | ${t("results.title")}`}</title>
            <div className="w-full h-screen flex flex-col items-center mt-10">
                <div className="w-80">
                    <Button
                        onClick={handleCopy}
                    >
                        {t("results.copy")}
                    </Button>
                </div>

                {transactions.length === 0 ? (
                    <div>{t('results.balanced')}</div>
                ) : (
                    <div className="w-full max-w-xl">
                        <ul className="space-y-2 mt-4">
                            {transactions.map((t, idx) => (
                                <li
                                    key={idx}
                                    className="grid grid-cols-3 gap-2 items-center bg-honeydew w-full h-10 px-2 rounded-xl text-center"
                                >
                                    <span className="font-semibold">{t.from}</span>
                                    <span className="font-semibold flex items-center justify-center gap-6">
                                        <MoveRight className="inline-block" />
                                        {t.amount}$
                                        <MoveRight className="inline-block" />
                                    </span>
                                    <span className="font-semibold">{t.to}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    );
}