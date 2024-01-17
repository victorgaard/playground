import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Link,
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { isObjectEmpty } from "@/utils/isObjectEmpty";
import { generateCodeSnippet } from "@/utils/generateCodeSnippet";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "@/assets/code.css";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  ClipboardIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Switch from "@/components/Switch";
import { cn } from "@/utils/cn";
import Input from "@/components/Input";
import { capitalize } from "@/utils/capitalize";
import { ImportedProps, InputType, PropsObj } from "@/static/types";
import { routes } from "@/static/routes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { generateProps } from "@/utils/generateProps";
import Button from "@/components/Button";
import { errors } from "@/static/errors";
import { z } from "zod";
import reactElementToJSXString from "react-element-to-jsx-string";

const rootRoute = new RootRoute({
  component: function Layout() {
    return (
      <main className="flex h-screen text-sm">
        <div className="flex min-w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8 ">
          {/* <Link
            to="/"
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
          >
            Home
          </Link> */}
          {routes.map((route) => (
            <Link
              key={route.href}
              to="/$component"
              params={{ component: route.href }}
              className="rounded px-4 py-2 hover:bg-gray-900"
              activeProps={{ className: "bg-gray-900" }}
              activeOptions={{
                includeSearch: false,
              }}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <Outlet />
      </main>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: async () => {
    throw redirect({ to: "/$component", params: { component: "Avatar" } });
  },
  validateSearch: (search) => {
    const searchParamsSchema = z.object({
      error: z.string().optional().catch(""),
    });
    return searchParamsSchema.parse(search);
  },
  component: function Index() {
    const { error } = indexRoute.useSearch();
    return (
      <div className="flex h-full flex-1 flex-col gap-4 p-8">
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-900 bg-red-950 p-3 text-red-200">
            <ExclamationCircleIcon className="h-5 w-5" /> Error: {error}
          </div>
        )}
        <h1>Welcome Home!</h1>
      </div>
    );
  },
});

export function CodeBlock({
  children,
  className,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLPreElement>) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <pre className="text-xs">
      <code className={cn("language-jsx", className)}>{children}</code>
    </pre>
  );
}

type RenderInputProps<T> = {
  propName: keyof T;
  propValue: InputType;
  propValues: T;
  onPropChange: (propName: keyof T, value: string | boolean) => void;
};

function RenderInput<T>({
  propName,
  propValue,
  propValues,
  onPropChange,
}: RenderInputProps<T>) {
  if (typeof propValue === "boolean") {
    return (
      <Switch
        id={String(propName)}
        checked={propValue}
        onChecked={(e) => onPropChange(propName, e.target.checked)}
      />
    );
  }

  if (typeof propValue === "string") {
    return (
      <Input
        id={String(propName)}
        type="text"
        value={propValue}
        placeholder={`${String(propName)}...`}
        onChange={(e) => onPropChange(propName, e.target.value)}
      />
    );
  }

  if (Array.isArray(propValue)) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {propValue.map((prop) => {
          const isActive = propValues[propName] === prop;
          return (
            <Button
              key={prop}
              value={prop}
              onClick={() => onPropChange(propName, prop)}
            >
              {prop} {isActive && <CheckIcon className="h-5 w-5" />}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <CodeBlock className="whitespace-pre-wrap">
      {reactElementToJSXString(propValue, {
        showDefaultProps: false,
        useBooleanShorthandSyntax: false,
      })}
    </CodeBlock>
  );
}

type PropsFormProps<T, U> = {
  component: string;
  propValues: T;
  variantProps: U;
  onPropChange: (propName: keyof T, value: string | boolean) => void;
};

export function PropsForm<T extends PropsObj, U extends PropsObj>({
  component,
  propValues,
  variantProps,
  onPropChange,
}: PropsFormProps<T, U>) {
  const navigate = useNavigate();
  const mergedProps = { ...propValues, ...variantProps };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        Props
        <Button
          size="sm"
          onClick={() => {
            navigate({
              to: "/$component",
              params: { component },
            });
          }}
        >
          <ArrowUturnLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {Object.entries(mergedProps).map(([propName, propValue]) => (
          <label
            htmlFor={propName}
            key={propName}
            className={cn("flex flex-col gap-2", {
              "cursor-pointer select-none flex-row items-center justify-between":
                typeof propValue === "boolean",
            })}
          >
            <span>{propName}</span>
            <RenderInput
              propName={propName}
              propValue={propValue}
              propValues={propValues}
              onPropChange={onPropChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

const componentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$component",
  onError: () => {
    throw redirect({
      to: "/",
      search: {
        error: errors.componentFileNotFound,
      },
    });
  },
  loader: async ({ params }) => {
    const componentFound = routes.find(
      (route) => route.label === params.component,
    );

    if (!componentFound) {
      throw redirect({
        to: "/",
        search: {
          error: errors.componentRouteNotFound,
        },
      });
    }

    const { props }: ImportedProps<PropsObj> = await import(
      `./components/${componentFound.path}.playground.tsx`
    );

    if (!props)
      return {
        component: params.component,
        ...generateProps<PropsObj>({
          Component: () => (
            <>This component is missing the correct playground configuration</>
          ),
          defaultProps: {},
        }),
      };

    return {
      component: params.component,
      ...props,
    };
  },
  staleTime: Infinity,
  component: function Component() {
    const navigate = useNavigate();
    const propsFromParams = componentRoute.useSearch();
    const { component, Component, config } = componentRoute.useLoaderData();
    const props = { ...config.defaultProps, ...propsFromParams };

    function handlePropChange(propName: string, value: string | boolean) {
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
            <div className="flex items-center border-b border-gray-800 pl-5 text-xs text-gray-400">
              <Link
                to="/$component"
                params={{ component }}
                className="px-3 pb-5 pt-8 transition-transform active:scale-90"
                activeProps={{
                  className:
                    "underline text-white underline-offset-[23px] decoration-2 decoration-gray-600",
                }}
                activeOptions={{
                  exact: true,
                }}
              >
                Default
              </Link>
              {Object.keys(config.examples).map((example) => (
                <Link
                  key={example}
                  to="/$component"
                  params={{ component }}
                  search={config.examples[example]}
                  className="px-3 pb-5 pt-8 transition-transform active:scale-90"
                  activeProps={{
                    className:
                      "underline text-white underline-offset-[23px] decoration-2 decoration-gray-600",
                  }}
                  activeOptions={{
                    exact: true,
                  }}
                >
                  {capitalize(example)}
                </Link>
              ))}
            </div>
            <div className="flex h-full items-center justify-center">
              <Component {...props} />
            </div>
            {!isObjectEmpty(props) && (
              <ScrollArea.Root className="group relative shrink-0 overflow-hidden border-t border-gray-800">
                <Button
                  size="sm"
                  className="animate-fade-in absolute bottom-[18px] right-3 z-10 hidden group-hover:block"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      generateCodeSnippet({
                        component,
                        props,
                      }),
                    )
                  }
                >
                  <ClipboardIcon className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-0 right-0 top-0 z-0 w-12 bg-gradient-to-l from-gray-950" />
                <div className="absolute bottom-0 left-0 top-0 z-0 w-8 bg-gradient-to-r from-gray-950" />
                <ScrollArea.Viewport className="flex items-center p-6">
                  <CodeBlock className="whitespace-nowrap">
                    {generateCodeSnippet({
                      component,
                      props,
                    })}
                  </CodeBlock>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="duration-[160ms] flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            )}
          </div>
        </div>
        <ScrollArea.Root className="w-96 overflow-hidden border-l border-gray-800 text-sm">
          <ScrollArea.Viewport className="h-full w-full p-8">
            <PropsForm
              component={component}
              propValues={props}
              variantProps={config.variantProps}
              onPropChange={handlePropChange}
            />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="duration-[160ms] flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, componentRoute]);

const router = new Router({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
