import {
  InboxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const navigation = [
  { name: "Inicio", href: "/", icon: InboxArrowDownIcon },
  {
    name: "Enviar",
    href: "/send",
    icon: ArrowUpOnSquareStackIcon,
  },
];
