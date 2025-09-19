import { LANGUAGE_CATEGORIES, type LanguageCategory } from '../_constants/language_categories';
import { CATEGORY_ORDER } from '../_constants/language_categories';

/**
 * Determines the category of a given programming language/technology
 * @param language - The language or technology name to categorize
 * @returns The category of the language ('frontend', 'backend', 'framework', 'libraries', 'database', or 'other')
 */
export const getLanguageCategory = (language: string): LanguageCategory => {
  for (const [category, languages] of Object.entries(LANGUAGE_CATEGORIES) as Array<[LanguageCategory, readonly string[]]>) {
    if (languages.includes(language)) {
      return category;
    }
  }
  return 'other';
};

/**
 * Sorts languages by category order and then alphabetically within each category
 * @param languages - Array of language/technology names
 * @returns Sorted array of language objects with name and category
 */
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
