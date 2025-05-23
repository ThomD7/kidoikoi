import { motion } from 'framer-motion';
import React from 'react';

export default function Button({ label, children, onClick, className, disabled }: { label: string; children: React.ReactNode; onClick: () => void; className?: string; disabled?: boolean }) {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            disabled={disabled}
            role='button'
            aria-disabled={disabled}
            aria-label={label}
            className={`bg-jade hover:bg-jade/90 text-white dark:bg-transparent border-2 border-honeydew hover:dark:bg-jade/20 font-bold p-2 w-full rounded-xl cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}