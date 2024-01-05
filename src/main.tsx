import { StrictMode, Suspense, lazy, useEffect, useState } from "react";
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

export const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const rootRoute = new RootRoute({
  component: function Layout() {
    return (
      <main className="flex h-screen">
        <div className="p-8 min-w-64 bg-black flex flex-col gap-1 overflow-auto border-r border-gray-800 ">
          <Link
            to="/"
            className="hover:bg-gray-900 py-2 px-4 text-sm rounded"
            activeProps={{ className: "bg-gray-900" }}
          >
            Home
          </Link>
          <Link
            to="/$componentId"
            params={{ componentId: "button" }}
            className="hover:bg-gray-900 py-2 px-4 text-sm rounded"
            activeProps={{ className: "bg-gray-900" }}
          >
            Component
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
      <div className="p-8 flex-1 h-full flex">
        <h1>Welcome Home!</h1>
      </div>
    );
  },
});

const componentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$componentId",
  component: function Component() {
    const { componentId } = componentRoute.useParams();
    const [props, setProps] = useState({});
    const component = capitalize(componentId);

    useEffect(() => {
      import(`./components/${component}`).then((module) => {
        setProps(module.props);
      });
    }, [component]);

    const Component = lazy(() => import(`./components/${component}`));

    return (
      <div className="flex-1 flex-col h-full flex">
        <div className="p-8 border-b border-gray-800">{component}</div>
        <div className="p-8 flex items-center justify-center h-full">
          <Suspense>
            <Component {...props} />
          </Suspense>
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
    </StrictMode>
  );
}
