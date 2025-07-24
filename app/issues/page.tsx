import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order: "asc" | "desc";
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  // Define sortable columns
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

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  // Validate orderBy parameter
  const validOrderByValues = columns.map((col) => col.value);
  const orderBy = validOrderByValues.includes(params.orderBy)
    ? params.orderBy
    : undefined;

  // Validate order parameter
  const order = params.order === "desc" ? "desc" : "asc";

  // Create clean query params for URL generation
  const currentParams = {
    ...(params.status && { status: params.status }),
  };

  // Function to get next sort state for a column
  const getNextSortState = (columnValue: keyof Issue) => {
    if (params.orderBy !== columnValue) {
      // If not currently sorted by this column, start with asc
      return { orderBy: columnValue, order: "asc" as const };
    } else if (params.order === "asc") {
      // If currently asc, switch to desc
      return { orderBy: columnValue, order: "desc" as const };
    } else {
      // If currently desc, remove sorting (return to default)
      return {};
    }
  };

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy ? { [orderBy]: order } : { createdAt: "desc" },
  });

  return (
    <div>
      <IssueActions />
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
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

// single asec

// import { prisma } from "@/prisma/client";
// import { Table } from "@radix-ui/themes";
// import { IssueStatusBadge, Link } from "@/app/components";
// import IssueActions from "./IssueActions";
// import { Issue, Status } from "@prisma/client";
// import NextLink from "next/link";
// import { ArrowUpIcon } from "@radix-ui/react-icons";

// interface Props {
//   searchParams: {
//     status: Status;
//     orderBy: keyof Issue;
//   };
// }

// const IssuesPage = async ({ searchParams }: Props) => {
//   const params = await searchParams;

//   // Define sortable columns
//   const columns: {
//     label: string;
//     value: keyof Issue;
//     className?: string;
//   }[] = [
//     { label: "Issue", value: "title" },
//     {
//       label: "Status",
//       value: "status",
//       className: "hidden md:table-cell",
//     },
//     {
//       label: "Created",
//       value: "createdAt",
//       className: "hidden md:table-cell",
//     },
//   ];

//   const statuses = Object.values(Status);
//   const status = statuses.includes(params.status) ? params.status : undefined;

//   // Validate orderBy parameter
//   const validOrderByValues = columns.map((col) => col.value);
//   const orderBy = validOrderByValues.includes(params.orderBy)
//     ? params.orderBy
//     : undefined;

//   // Create clean query params for URL generation
//   const currentParams = {
//     ...(params.status && { status: params.status }),
//   };

//   const issues = await prisma.issue.findMany({
//     where: { status },
//     orderBy: orderBy ? { [orderBy]: "asc" } : { createdAt: "desc" },
//   });

//   return (
//     <div>
//       <IssueActions />
//       <Table.Root variant="surface">
//         <Table.Header>
//           <Table.Row>
//             {columns.map((column) => (
//               <Table.ColumnHeaderCell
//                 key={column.value}
//                 className={column.className}
//               >
//                 <NextLink
//                   href={{
//                     query: { ...currentParams, orderBy: column.value },
//                   }}
//                   className="flex items-center gap-1 hover:text-blue-600 transition-colors"
//                 >
//                   {column.label}
//                   {column.value === params.orderBy && (
//                     <ArrowUpIcon className="inline w-4 h-4" />
//                   )}
//                 </NextLink>
//               </Table.ColumnHeaderCell>
//             ))}
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {issues.map((issue) => (
//             <Table.Row key={issue.id}>
//               <Table.Cell>
//                 <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
//                 <div className="block md:hidden">
//                   <IssueStatusBadge status={issue.status} />
//                 </div>
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell">
//                 <IssueStatusBadge status={issue.status} />
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell">
//                 {issue.createdAt.toDateString()}
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </div>
//   );
// };

// export const dynamic = "force-dynamic";
// export default IssuesPage;
