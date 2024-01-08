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
  ScrollRestoration,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { capitalize } from "./utils/capitalize";
import { isObjectEmpty } from "./utils/isObjectEmpty";
import { generateCodeSnippet } from "./utils/generateCodeSnippet";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "./assets/code.css";
import Button from "./components/Button";
import { ArrowUturnLeftIcon, ClipboardIcon } from "@heroicons/react/24/outline";

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
            to="/$componentId"
            params={{ componentId: "button" }}
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
          >
            Button
          </Link>
        </div>
        <Outlet />
        <ScrollRestoration />
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
  onPropChange: (propName: keyof T, value: InputTypes) => void,
) {
  if (typeof propValue === "boolean") {
    return (
      <input
        type="checkbox"
        checked={propValue}
        onChange={(e) => onPropChange(propName, e.target.checked)}
        className="border bg-black p-4"
      />
    );
  }

  if (typeof propValue === "string") {
    return (
      <input
        type="text"
        value={propValue}
        onChange={(e) => onPropChange(propName, e.target.value)}
        className="border bg-black p-4"
      />
    );
  }

  if (Array.isArray(propValue)) {
    return propValue.map((prop) => {
      return (
        <Button
          key={prop}
          value={prop}
          onClick={() => onPropChange(propName, prop)}
          className="mt-2"
        >
          {prop}
        </Button>
      );
    });
  }
  // Add more cases for other prop types (e.g., number, radio, select, etc.)
  return null;
}

type PropsFormProps<T, U> = {
  propValues: T;
  multipleProps: U;
  onPropChange: (propName: keyof T, value: InputTypes) => void;
};

export function PropsForm<
  T extends Record<string, InputTypes>,
  U extends Record<string, string[]>,
>({ propValues, multipleProps, onPropChange }: PropsFormProps<T, U>) {
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
              to: "/$componentId",
              params: { componentId: "button" },
            });
          }}
        >
          <ArrowUturnLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(mergedProps).map(([propName, propValue]) => (
          <div key={propName} className="flex flex-col">
            <label>{propName}</label>
            {RenderInput(propName, propValue, onPropChange)}
          </div>
        ))}
      </div>
    </>
  );
}

const componentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$componentId",
  onError: () => {
    throw redirect({ to: "/" });
  },
  loader: async ({ params }) => {
    const componentName = capitalize(params.componentId);
    const Component = lazy(() => import(`./components/${componentName}.tsx`));
    const baseProps = await import(`./components/${componentName}.tsx`).then(
      (module) => module.props,
    );
    return { componentName, Component, baseProps };
  },
  staleTime: Infinity,
  component: function Component() {
    const { componentName, Component, baseProps } =
      componentRoute.useLoaderData();
    const propsFromParams = componentRoute.useSearch();
    const navigate = useNavigate();

    const [props, setProps] = useState<Record<string, InputTypes>>(
      baseProps.defaultProps,
    );

    useEffect(() => {
      setProps((prevProps) =>
        Object.entries(propsFromParams).length === 0
          ? baseProps.defaultProps
          : { ...prevProps, ...propsFromParams },
      );
    }, [baseProps, propsFromParams]);

    function handlePropChange(propName: string, value: InputTypes) {
      navigate({
        to: "/$componentId",
        params: true,
        search: (prev) => ({ ...prev, [propName]: value }),
      });
    }

    return (
      <div className="flex h-full flex-1">
        <div className="flex flex-1 flex-col">
          <div className="border-b border-gray-800 p-8">{componentName}</div>
          <div className="flex h-full items-center justify-center p-8">
            <Suspense>
              <Component {...props} />
            </Suspense>
          </div>
        </div>
        <div className="flex w-96 flex-col gap-8 border-l border-gray-800 p-8 text-sm">
          <PropsForm
            propValues={props}
            multipleProps={baseProps.multipleProps}
            onPropChange={handlePropChange}
          />
          <div className="flex items-center justify-between">
            Code
            <Button size="sm">
              <ClipboardIcon className="h-4 w-4" />
            </Button>
          </div>
          {!isObjectEmpty(props) && (
            <CodeBlock>
              {generateCodeSnippet({ componentName, props })}
            </CodeBlock>
          )}
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
