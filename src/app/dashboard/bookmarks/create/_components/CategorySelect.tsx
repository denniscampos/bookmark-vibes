'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { CategoryDialog } from '@/components/CategoryDialog';
import { CategoryPayloadType } from '@/lib/types';
import { Input } from '@/components/ui/input';

interface CategorySelectProps {
  categories: CategoryPayloadType['data'];
  form: FieldValues;
}

export const CategorySelect = ({ categories, form }: CategorySelectProps) => {
  const [addCategory, setAddCategory] = useState(false);

  return (
    <>
      {!addCategory ? (
        <>
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value === 'Add Category') {
                      setAddCategory(true);
                    } else {
                      field.onChange(value);
                      // This ensures we attach the category name to the form
                      // There might be better ways but this works for now.
                      const selectedCateogry = categories?.find(
                        (category) => category.id === value
                      );
                      form.setValue('category_name', selectedCateogry?.name);
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select a Category--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Add Category">Add Category</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id as string}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden aria-hidden="true">
                  Category Name
                </FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} aria-hidden="true" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      ) : (
        <CategoryDialog
          addCategory={addCategory}
          setAddCategory={setAddCategory}
          dialogDescription="Add a category for this bookmark"
        />
      )}
    </>
  );
};
