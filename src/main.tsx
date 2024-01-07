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
} from "@tanstack/react-router";
import { capitalize } from "./utils/capitalize";
import { isObjectEmpty } from "./utils/isObjectEmpty";
import { generateCodeSnippet } from "./utils/generateCodeSnippet";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "./assets/code.css";
import Button from "./components/Button";
import { ClipboardIcon } from "@heroicons/react/24/outline";

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
  } else if (typeof propValue === "string") {
    return (
      <input
        type="text"
        value={propValue}
        onChange={(e) => onPropChange(propName, e.target.value)}
        className="border bg-black p-4"
      />
    );
  } else {
    // Add more cases for other prop types (e.g., number, radio, select, etc.)
    return null;
  }
}

type PropsFormProps<T> = {
  propValues: T;
  onPropChange: (propName: keyof T, value: InputTypes) => void;
};

export function PropsForm<T extends Record<string, InputTypes>>({
  propValues,
  onPropChange,
}: PropsFormProps<T>) {
  return (
    <form className="flex flex-col gap-4">
      {Object.entries(propValues).map(([propName, propValue]) => (
        <div key={propName} className="flex flex-col">
          <label>{propName}</label>
          {RenderInput(propName, propValue, onPropChange)}
        </div>
      ))}
    </form>
  );
}

const componentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$componentId",
  component: function Component() {
    const componentName = capitalize(componentRoute.useParams().componentId);
    const Component = lazy(() => import(`./components/${componentName}.tsx`));

    const [props, setProps] = useState<Record<string, InputTypes>>({});

    useEffect(() => {
      import(`./components/${componentName}.tsx`).then((module) => {
        setProps(module.props);
      });
    }, [componentName]);

    function handlePropChange(propName: string, value: InputTypes) {
      setProps((prevProps) => ({ ...prevProps, [propName]: value }));
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
          <PropsForm propValues={props} onPropChange={handlePropChange} />
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
