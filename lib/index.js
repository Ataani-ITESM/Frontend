import {
  InboxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const navigation = [
  { name: "Inicio/Chúunul", href: "/", icon: InboxArrowDownIcon },
  {
    name: "Enviar/Tuxt a meyaj",
    href: "/send",
    icon: ArrowUpOnSquareStackIcon,
  },
];
