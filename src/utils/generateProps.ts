import { Props, PropsObj } from "@/static/types";

type GenerateProps<T> = {
  Component: React.FC<T>;
  defaultProps: T;
  variantProps?: PropsObj;
  examples?: Record<string, T>;
};

export function generateProps<T>({
  Component,
  defaultProps,
  variantProps,
  examples,
}: GenerateProps<T>): Props<T> {
  return {
    Component,
    config: {
      defaultProps,
      variantProps: variantProps || {},
      examples: examples || {},
    },
  };
}
