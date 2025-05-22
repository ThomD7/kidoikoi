import { useTranslation } from 'react-i18next';
import Button from './ui/button';
import React from "react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const switchLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    const currentLanguage = i18n.language;

    return (
        <div className='w-13 h-13'>
            <Button
                onClick={switchLanguage}
                className='h-13'
            >
                {currentLanguage === 'en' ? 'FR' : 'EN'}

            </Button>
        </div>
    );
};

export default LanguageSwitcher;