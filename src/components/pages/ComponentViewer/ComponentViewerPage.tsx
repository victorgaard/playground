import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { PropsForm } from "./PropsForm";
import Navbar from "./Navbar";
import PropsWrapper from "./PropsWrapper";
import CodeViewer from "./CodeViewer";

const route = getRouteApi('/$component');

export function Component() {
  const navigate = useNavigate();
  const propsFromParams = route.useSearch();
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
