import { createFileRoute } from '@tanstack/solid-router';
import { OverlayPage } from './-components/OverlayPage';

export const Route = createFileRoute('/overlay/')({
  component: OverlayPage,
});
