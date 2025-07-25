import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1") || 1;

  return <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />;
}

// import Pagination from "./components/Pagination";

// export default function Home({
//   searchParams,
// }: {
//   searchParams: { page: string };
// }) {
//   return (
//     <Pagination
//       itemCount={100}
//       pageSize={10}
//       currentPage={parseInt(searchParams.page)}
//     />
//   );
// }
