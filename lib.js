import {
  InboxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const navigation = [
  { name: "Board", href: "/", icon: InboxArrowDownIcon },
  {
    name: "Send",
    href: "/send",
    icon: ArrowUpOnSquareStackIcon,
  },
];
