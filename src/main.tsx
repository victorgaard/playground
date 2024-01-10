import {
  PropsWithChildren,
  ReactNode,
  StrictMode,
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
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
import { isObjectEmpty } from "./utils/isObjectEmpty";
import { generateCodeSnippet } from "./utils/generateCodeSnippet";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "./assets/code.css";
import Button from "./components/Button";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import Switch from "./components/Switch";
import { cn } from "./utils/cn";
import Input from "./components/Input";

export const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const rootRoute = new RootRoute({
  component: function Layout() {
    return (
      <main className="flex h-screen text-sm">
        <div className="flex min-w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8 ">
          <Link
            to="/"
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
          >
            Home
          </Link>
          <Link
            to="/$component"
            params={{ component: "Button" }}
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
            activeOptions={{
              includeSearch: false,
            }}
          >
            Button
          </Link>
          <Link
            to="/$component"
            params={{ component: "Input" }}
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
            activeOptions={{
              includeSearch: false,
            }}
          >
            Input
          </Link>
        </div>
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </main>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="flex h-full flex-1 p-8">
        <h1>Welcome Home!</h1>
      </div>
    );
  },
});

export function CodeBlock({ children }: PropsWithChildren) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <pre className="line-numbers ml-6 text-[13px]">
      <code className="language-jsx">{children}</code>
    </pre>
  );
}

type InputTypes = string | boolean | ReactNode;

function RenderInput<T>(
  propName: keyof T,
  propValue: InputTypes,
  propValues: T,
  onPropChange: (propName: keyof T, value: InputTypes) => void,
) {
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
  // Add more cases for other prop types (e.g., number, radio, select, etc.)
  return null;
}

type PropsFormProps<T, U> = {
  component: string;
  propValues: T;
  multipleProps: U;
  onPropChange: (propName: keyof T, value: InputTypes) => void;
};

export function PropsForm<
  T extends Record<string, InputTypes>,
  U extends Record<string, string[]>,
>({
  component,
  propValues,
  multipleProps,
  onPropChange,
}: PropsFormProps<T, U>) {
  const navigate = useNavigate();
  const mergedProps = { ...propValues, ...multipleProps };
  return (
    <>
      <div className="flex items-center justify-between">
        Props
        <Button
          size="sm"
          onClick={() => {
            navigate({
              to: "/$component",
              params: { component: component },
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
            {RenderInput(propName, propValue, propValues, onPropChange)}
          </label>
        ))}
      </div>
    </>
  );
}

const componentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$component",
  onError: () => {
    throw redirect({ to: "/" });
  },
  loader: async ({ params }) => {
    const { component } = params;
    const Component = lazy(() => import(`./components/${component}.tsx`));
    const config = await import(`./components/${component}.tsx`).then(
      (module) => module.props,
    );
    return { component, Component, config };
  },
  shouldReload: true,
  component: function Component() {
    const { component, Component, config } = componentRoute.useLoaderData();
    const propsFromParams = componentRoute.useSearch();
    const navigate = useNavigate();

    const [props, setProps] = useState<Record<string, InputTypes>>(
      config.defaultProps,
    );

    useEffect(() => {
      function parseProps(prevProps: Record<string, InputTypes>) {
        return Object.entries(propsFromParams).length === 0
          ? config.defaultProps
          : { ...prevProps, ...propsFromParams };
      }

      setProps((prevProps) => parseProps(prevProps));
    }, [config, propsFromParams]);

    function handlePropChange(propName: string, value: InputTypes) {
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
            <div className="border-b border-gray-800 p-8">{component}</div>
            <div className="flex h-full items-center justify-center p-8">
              <Suspense>
                <Component {...props} />
              </Suspense>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between gap-8">
                {!isObjectEmpty(props) && (
                  <CodeBlock>
                    {generateCodeSnippet({ component, props })}
                  </CodeBlock>
                )}
                <Button size="sm">
                  <ClipboardIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-96 flex-col gap-8 overflow-auto border-l border-gray-800 p-8 text-sm">
          <PropsForm
            component={component}
            propValues={props}
            multipleProps={config.multipleProps}
            onPropChange={handlePropChange}
          />
        </div>
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
