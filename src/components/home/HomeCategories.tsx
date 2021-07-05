import { CategoriesSkeleton, Categories } from '@/components/category';
import { CategoryService } from '@/services';
import { Category } from '@/types';
import React, { useEffect, useState } from 'react';

const HomeCategories = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const results = await CategoryService.getCategories();
        setCategories(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {loadingCategories ? (
        <CategoriesSkeleton />
      ) : (
        <Categories categories={categories} />
      )}
    </>
  );
};

export default HomeCategories;
