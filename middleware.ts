export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/new-issue", "/issues/:id+/edit"],
};
