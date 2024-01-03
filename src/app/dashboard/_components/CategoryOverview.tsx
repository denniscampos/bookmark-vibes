import { Badge } from '@/components/ui/badge';
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
  return (
    <Card className="p-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base">
          Category Overview
        </h2>
      </div>

      <div className="my-5 flex flex-col w-full gap-2">
        {categories && Object.keys(categoryCount!).length > 0 ? (
          Object.entries(categoryCount!).map(([name, count], index) => (
            <div key={`category-${index}`} className="flex justify-between">
              <span className="text-muted-foreground text-sm">{name}</span>
              <span>
                <Badge>{count}</Badge>
              </span>
            </div>
          ))
        ) : (
          <p>No categories yet</p>
        )}
      </div>
    </Card>
  );
}
