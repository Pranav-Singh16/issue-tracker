import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBatch from "../components/IssueStatusBatch";
import IssueActions from "./IssueActions";
import delay from "delay";

const IssuesPage = async () => {
  await delay(5000);

  const issues = await prisma.issue.findMany();
  // console.log(issues);
  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBatch status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBatch status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};
export default IssuesPage;
