import { ReactElement } from "react";
import Link from "next/link";

interface Anchor {
  passProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  href?: string;
  children?:
    | ReactElement
    | ReactElement
    | string
    | number
    | (ReactElement | ReactElement | string | number)[];
}

export default function Anchor(props: Anchor) {
  const { passProps = {}, href = "#", children = <></> } = props;
  return (
    <Link href={href}>
      <a {...passProps}>{children}</a>
    </Link>
  );
}
