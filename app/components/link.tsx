import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof NextLink> {
  href: string;
  children: React.ReactNode;
}

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <RadixLink asChild>
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
    </RadixLink>
  );
};

export default Link;
