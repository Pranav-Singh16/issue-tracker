import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
    page?: string;
  }>;
  issues: Issue[];
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;

  const getNextSortState = (columnValue: keyof Issue) => {
    if (params.orderBy !== columnValue) {
      // If not currently sorted by this column, start with asc and preserve page
      return { orderBy: columnValue, order: "asc" as const, page: params.page };
    } else if (params.order === "asc") {
      // If currently asc, switch to desc and preserve page
      return {
        orderBy: columnValue,
        order: "desc" as const,
        page: params.page,
      };
    } else {
      // If currently desc, remove sorting and preserve page
      return { page: params.page };
    }
  };

  // Create clean query params for URL generation
  const currentParams = {
    ...(params.status && { status: params.status }),
    ...(params.page && { page: params.page }),
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
            const nextSortState = getNextSortState(column.value);
            const isCurrentColumn = column.value === params.orderBy;

            return (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...currentParams, ...nextSortState },
                  }}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  {column.label}
                  {isCurrentColumn && (
                    <>
                      {params.order === "asc" ? (
                        <ArrowUpIcon className="inline w-4 h-4" />
                      ) : (
                        <ArrowDownIcon className="inline w-4 h-4" />
                      )}
                    </>
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columnNames = columns.map((column) => column.value);
export { columns };
export default IssueTable;

// import { Table } from "@radix-ui/themes";
// import { IssueStatusBadge, Link } from "@/app/components";
// import { Issue, Status } from "@prisma/client";
// import NextLink from "next/link";
// import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

// interface Props {
//   searchParams: Promise<{
//     status?: Status;
//     orderBy?: keyof Issue;
//     order?: "asc" | "desc";
//     page?: string;
//   }>;
//   issues: Issue[];
// }

// const columns: {
//   label: string;
//   value: keyof Issue;
//   className?: string;
// }[] = [
//   { label: "Issue", value: "title" },
//   {
//     label: "Status",
//     value: "status",
//     className: "hidden md:table-cell",
//   },
//   {
//     label: "Created",
//     value: "createdAt",
//     className: "hidden md:table-cell",
//   },
// ];

// const IssueTable = async ({ searchParams, issues }: Props) => {
//   const params = await searchParams;

//   const getNextSortState = (columnValue: keyof Issue) => {
//     if (params.orderBy !== columnValue) {
//       // If not currently sorted by this column, start with asc
//       return { orderBy: columnValue, order: "asc" as const };
//     } else if (params.order === "asc") {
//       // If currently asc, switch to desc
//       return { orderBy: columnValue, order: "desc" as const };
//     } else {
//       // If currently desc, remove sorting (return to default)
//       return {};
//     }
//   };

//   // Create clean query params for URL generation
//   const currentParams = {
//     ...(params.status && { status: params.status }),
//   };

//   return (
//     <Table.Root variant="surface">
//       <Table.Header>
//         <Table.Row>
//           {columns.map((column) => {
//             const nextSortState = getNextSortState(column.value);
//             const isCurrentColumn = column.value === params.orderBy;

//             return (
//               <Table.ColumnHeaderCell
//                 key={column.value}
//                 className={column.className}
//               >
//                 <NextLink
//                   href={{
//                     query: { ...currentParams, ...nextSortState },
//                   }}
//                   className="flex items-center gap-1 hover:text-blue-600 transition-colors"
//                 >
//                   {column.label}
//                   {isCurrentColumn && (
//                     <>
//                       {params.order === "asc" ? (
//                         <ArrowUpIcon className="inline w-4 h-4" />
//                       ) : (
//                         <ArrowDownIcon className="inline w-4 h-4" />
//                       )}
//                     </>
//                   )}
//                 </NextLink>
//               </Table.ColumnHeaderCell>
//             );
//           })}
//         </Table.Row>
//       </Table.Header>
//       <Table.Body>
//         {issues.map((issue) => (
//           <Table.Row key={issue.id}>
//             <Table.Cell>
//               <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
//               <div className="block md:hidden">
//                 <IssueStatusBadge status={issue.status} />
//               </div>
//             </Table.Cell>
//             <Table.Cell className="hidden md:table-cell">
//               <IssueStatusBadge status={issue.status} />
//             </Table.Cell>
//             <Table.Cell className="hidden md:table-cell">
//               {issue.createdAt.toDateString()}
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table.Root>
//   );
// };

// export const columnNames = columns.map((column) => column.value);
// export { columns };
// export default IssueTable;
