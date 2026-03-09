import { LANGUAGE_CATEGORIES, type LanguageCategory } from '../core/constants/language_categories';
import { CATEGORY_ORDER } from '../core/constants/language_categories';

export const getLanguageCategory = (language: string): LanguageCategory => {
    for (const [category, languages] of Object.entries(LANGUAGE_CATEGORIES) as Array<[LanguageCategory, readonly string[]]>) {
        if (languages.includes(language)) {
            return category;
        }
    }
    return 'other';
};

export const sortLanguagesByCategory = (languages: string[]) => {
    const categoryOrder = CATEGORY_ORDER as readonly LanguageCategory[];

    return languages
        .map(language => ({
            name: language,
            category: getLanguageCategory(language)
        }))
        .sort((a, b) => {
            const aIndex = categoryOrder.indexOf(a.category);
            const bIndex = categoryOrder.indexOf(b.category);
            if (aIndex !== bIndex) {
                return aIndex - bIndex;
            }
            return a.name.localeCompare(b.name);
        });
};
