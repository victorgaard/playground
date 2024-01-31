import { routes } from "@/static/routes";
import { Navigate } from "@tanstack/react-router";

function IndexPage() {
  if (routes.length > 0)
    return <Navigate to="/$component" params={{ component: routes[0].href }} />;

  return <>Start adding your playground components</>;
}

export default IndexPage;
