import { Card } from '@/components/ui/card';
import { CategoryOverviewPayload } from '@/lib/types';

type CategoryOverviewProps = {
  categories: CategoryOverviewPayload[] | undefined;
  categoryCount: Record<string, number> | undefined;
};

export function CategoryOverview({
  categories,
  categoryCount,
}: CategoryOverviewProps) {
  // const count = Object.values(categoryCount!);

  // TODO: WIP... need bookmark counts from each category and not how I currently have it

  return (
    <Card className="p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base">
          Category Overview
        </h2>
      </div>
      <div className="my-5 flex flex-col w-full gap-4">
        {categories && categories.length >= 1 ? (
          categories.map((category, index) => (
            <div key={`category-${index}`}>
              <p>{category.name}</p>
              {/* <span>{count}</span> */}
            </div>
          ))
        ) : (
          <p>No categories yet</p>
        )}
      </div>
    </Card>
  );
}
