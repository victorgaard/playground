import { getRouteApi, useNavigate } from "@tanstack/react-router";
import Navbar from "./Navbar";
import CodeViewer from "./CodeViewer";
import PropsWrapper from "./PropsWrapper";
import { PropsForm } from "./PropsForm";
import { useWidth } from "@/hooks/useWidth";
import ComponentViewerPageMobile from "./ComponentViewerPageMobile";

const route = getRouteApi("/$component");

export function Component() {
  const navigate = useNavigate();
  const propsFromParams = route.useSearch();
  const isResponsiveLayout = useWidth() <= 1024;
  const { component, Component, config } = route.useLoaderData();
  const props = { ...config.defaultProps, ...propsFromParams };

  function handlePropChange(
    propName: string,
    value: string | boolean | number,
  ) {
    navigate({
      to: "/$component",
      params: { component },
      search: (prev) => ({ ...prev, [propName]: value }),
    });
  }

  if (isResponsiveLayout)
    return (
      <ComponentViewerPageMobile
        component={component}
        Component={Component}
        config={config}
        props={props}
        onPropChange={handlePropChange}
      />
    );

  return (
    <div className="flex h-full flex-1">
      <div className="flex flex-1 flex-col">
        <div className="flex h-full flex-col justify-between">
          <Navbar component={component} config={config} />
          <div className="flex h-full items-center justify-center px-8">
            <Component {...props} />
          </div>
          <CodeViewer component={component} props={props} />
        </div>
      </div>
      <PropsWrapper>
        <PropsForm
          component={component}
          propValues={props}
          variantProps={config.variantProps}
          onPropChange={handlePropChange}
        />
      </PropsWrapper>
    </div>
  );
}
