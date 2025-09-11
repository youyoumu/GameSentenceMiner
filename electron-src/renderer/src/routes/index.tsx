import { createFileRoute } from "@tanstack/solid-router";

// import RootPage from "./-components/RootPage";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  return <div>Root Page</div>;
}
