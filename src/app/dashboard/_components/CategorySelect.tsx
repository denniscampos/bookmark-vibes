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
import { CategoryDialog } from './CategoryDialog';
import { CategoryPayloadType } from '@/lib/types';

interface CategorySelectProps {
  categories: CategoryPayloadType['data'];
  form: FieldValues;
}

export const CategorySelect = ({ categories, form }: CategorySelectProps) => {
  const [addCategory, setAddCategory] = useState(false);

  return (
    <>
      {!addCategory ? (
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
                      key={category.name}
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
      ) : (
        <CategoryDialog
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}
    </>
  );
};
