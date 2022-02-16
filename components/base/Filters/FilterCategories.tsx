import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCategories } from 'actions/category';
import { FilterTitle, FilterSubtitle } from 'components/layout';
import { FiltersSortDefaultState, FiltersSortNominalSetState, CATEGORIES_FILTER } from 'components/pages/Explore';
import Button from 'components/ui/Button';
import { CategoryType } from 'interfaces';
import { emojiMapping } from 'utils/functions';

interface FilterCategoriesProps {
  setFilters: FiltersSortNominalSetState;
  value: string[] | null;
}

const FilterCategories = ({ setFilters, value }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const toggleCategory = (code: string) => {
    setFilters((prevState) => {
      const prevCategoriesFiltered = prevState[CATEGORIES_FILTER];
      if (prevCategoriesFiltered === null) {
        return { ...FiltersSortDefaultState, [CATEGORIES_FILTER]: [code] };
      }

      const categoryIdx = prevCategoriesFiltered.findIndex((item) => item === code);
      if (categoryIdx < 0) {
        return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.concat(code) };
      }

      return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.filter((item) => item !== code) };
    });
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      <FilterTitle>Categories</FilterTitle>
      <SFilterSubtitle>Filter your search according to your favorites categories</SFilterSubtitle>
      <SCategoriesContainer>
        {categories
          // Categories with related emoji are displayed first
          .sort((a, b) => {
            const aBit = emojiMapping(a.code) === undefined ? 1 : 0;
            const bBit = emojiMapping(b.code) === undefined ? 1 : 0;
            return aBit - bBit;
          })
          .map(({ _id, code, name }) => {
            const isActive = value?.some((item) => item === code) ?? false;
            return (
              <Button
                key={_id}
                color={isActive ? 'primary500' : 'invertedContrast'}
                emoji={emojiMapping(code)}
                onClick={() => toggleCategory(code)}
                size="small"
                text={name}
                variant={isActive ? 'contained' : 'outlined'}
              />
            );
          })}
      </SCategoriesContainer>
    </div>
  );
};

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`;

const SCategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;
  max-height: 12rem;
  overflow-y: auto;
`;

export default FilterCategories;
