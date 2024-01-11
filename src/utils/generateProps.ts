import { Props, PropsObj } from "../static/types";

type GenerateProps<T> = {
  defaultProps: T;
  multipleProps?: PropsObj;
  examples?: Record<string, T>;
};

export function generateProps<T>({
  defaultProps,
  multipleProps,
  examples,
}: GenerateProps<T>): Props<T> {
  return {
    defaultProps,
    multipleProps: multipleProps || {},
    examples: examples || {},
  };
}
