import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren } from "react";

export function Typography() {
  throw new Error(
    `<Typography> is not a component, use child components instead: <Typography.Paragraph>...</Typography.Paragraph>`,
  );
}

function H1({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-5xl", className)} {...rest}>
      {children}
    </h1>
  );
}

function H2({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-4xl", className)} {...rest}>
      {children}
    </h2>
  );
}

function H3({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-3xl", className)} {...rest}>
      {children}
    </h3>
  );
}

function H4({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn("text-2xl", className)} {...rest}>
      {children}
    </h4>
  );
}

function H5({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("text-xl", className)} {...rest}>
      {children}
    </h5>
  );
}

function H6({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6 className={cn("text-lg", className)} {...rest}>
      {children}
    </h6>
  );
}

type ParagraphProps = PropsWithChildren &
  HTMLAttributes<HTMLParagraphElement> & {
    extraContrast?: boolean;
  };

function Paragraph({
  children,
  className,
  extraContrast = false,
  ...rest
}: ParagraphProps) {
  return (
    <p
      className={cn(
        "text-sm text-zinc-400",
        { "text-white font-medium": extraContrast },
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

function Small({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn(
        "flex items-center gap-2 text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...rest}
    >
      {children}
    </small>
  );
}

Typography.H1 = H1;
Typography.H2 = H2;
Typography.H3 = H3;
Typography.H4 = H4;
Typography.H5 = H5;
Typography.H6 = H6;
Typography.Paragraph = Paragraph;
Typography.Small = Small;
