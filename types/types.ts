import type { LucideIcon } from "lucide-react";

export type BankAccount = {
  id: string;
  bankName: string;
  accountName: string;
  lastFour: string;
  balance: number;
  color: "blue" | "green" | "purple" | "pink";
  initials: string;
};

export type BankCardAccount = BankAccount & {
  cardholder: string;
  spendingPercent: number;
};

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  status: "Processing" | "Success" | "Declined";
  date: string;
  category: string;
  initials: string;
  avatarColor: string;
};

export type HeaderProps = {
  title: string;
  subtitle?: string;
};

export type DropdownOption = {
  label: string;
  value: string;
  menuLabel?: string;
  detail?: string;
  initials?: string;
  avatarClassName?: string;
  balance?: string;
};

export type DropdownAction = {
  href: string;
  label: string;
  hint?: string;
};

export type DropdownProps = {
  ariaLabel: string;
  icon: LucideIcon;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  menuClassName?: string;
  action?: DropdownAction;
  size?: "default" | "medium";
};

export type BankCardProps = {
  account: BankAccount & {
    cardholder?: string;
    spendingPercent?: number;
  };
  compact?: boolean;
};

export type DashboardSectionProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export type AuthFormValues = {
  firstName?: string;
  lastName?: string;
  address?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  email: string;
  password: string;
};

export type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};       


export interface TotalBalanceBoxProps {
    account: BankAccount[];
    totalbalance: number;
    totalbank: number;
}