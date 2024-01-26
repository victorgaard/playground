import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import {
  Route,
  Router,
  RouterProvider,
  redirect,
  rootRouteWithContext,
} from "@tanstack/react-router";
import { errors } from "@/static/errors";
import { extractPropsFromComponent } from "@/utils/extractPropsFromComponent";
import Layout from "@/components/ui/Layout";
import Index from "@/components/pages/IndexPage";
import { Component } from "@/components/pages/ComponentViewer/ComponentViewerPage";

const rootRoute = rootRouteWithContext<{
  playgroundComponents: Record<string, unknown>;
}>()({
  component: Layout,
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

export const componentViewerRoute = new Route({
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
  loader: async ({ params, context }) => {
    const component = params.component;
    const props = extractPropsFromComponent(
      context.playgroundComponents,
      component,
    );
    return {
      component,
      ...props,
    };
  },
  staleTime: Infinity,
  component: Component,
});

const routeTree = rootRoute.addChildren([indexRoute, componentViewerRoute]);

const router = new Router({
  routeTree,
  context: {
    playgroundComponents: import.meta.glob("./**/*.playground.tsx", {
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
