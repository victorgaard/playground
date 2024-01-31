import { errors } from "@/static/errors";
import { ComponentFound, PropsObj } from "@/static/types";
import { redirect } from "@tanstack/react-router";
import { generateProps } from "./generateProps";

function extractComponentNameFromPath(path: string) {
  const pathParts = path.split("/");
  const fileName = pathParts[pathParts.length - 1];
  return fileName.split(".playground.tsx")[0];
}

function returnFallbackProps(componentName: string) {
  return {
    component: componentName,
    ...generateProps<PropsObj>({
      Component: () => (
        <>This component is missing the correct playground configuration</>
      ),
      defaultProps: {},
    }),
  };
}

export function extractPropsFromComponent(
  modules: Record<string, unknown>,
  componentName: string,
) {
  const componentFound: ComponentFound[] = Object.entries(modules).filter(
    (module): module is ComponentFound =>
      extractComponentNameFromPath(module[0]) == componentName,
  );

  if (!componentFound || componentFound.length === 0) {
    throw redirect({
      to: "/error",
      search: {
        error: errors.componentRouteNotFound,
      },
    });
  }

  const { props } = componentFound[0][1];

  if (!props) return returnFallbackProps(componentName);

  return props;
}
