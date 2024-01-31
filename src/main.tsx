import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import {
  RouterProvider,
  createRoute,
  createRouter,
  redirect,
  rootRouteWithContext,
} from "@tanstack/react-router";
import { errors } from "@/static/errors";
import { extractPropsFromComponent } from "@/utils/extractPropsFromComponent";
import { Component } from "@/components/pages/ComponentViewer/ComponentViewerPage";
import RootLayout from "@/components/ui/RootLayout";
import ErrorPage from "./components/pages/ErrorPage";
import IndexPage from "./components/pages/IndexPage";

const rootRoute = rootRouteWithContext<{
  playgroundFiles: Record<string, unknown>;
}>()({
  component: RootLayout,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

export const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/error",
  component: ErrorPage,
});

export const componentViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$component",
  onError: () => {
    throw redirect({
      to: "/error",
      search: {
        error: errors.componentFileNotFound,
      },
    });
  },
  loader: async ({ params, context }) => {
    const component = params.component;
    const props = extractPropsFromComponent(context.playgroundFiles, component);
    return {
      component,
      ...props,
    };
  },
  staleTime: Infinity,
  shouldReload: false,
  component: Component,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  errorRoute,
  componentViewerRoute,
]);

const router = createRouter({
  routeTree,
  context: {
    playgroundFiles: import.meta.glob("./**/*.playground.tsx", {
      eager: true,
    }),
  },
  defaultPreload: "intent",
});

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
