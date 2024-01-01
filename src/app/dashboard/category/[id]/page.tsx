import { getBookmarksByCategoryId } from '@/lib/db/categories/queries';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { data } = await getBookmarksByCategoryId({ categoryId: params.id });

  return (
    <div className="w-full p-8">
      <p>Category</p>
      {data?.map((bookmark) => (
        <div key={bookmark.id}>
          <p>{bookmark.title}</p>
          <p>{bookmark.url}</p>
        </div>
      ))}
    </div>
  );
}
