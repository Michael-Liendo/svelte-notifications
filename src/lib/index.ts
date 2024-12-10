export { default as NotificationList } from '$lib/components/NotificationList.svelte';
export type { TPosition as Position } from '$lib/components/NotificationList.svelte';

export {
  default as notifications,
  NotificationKind,
} from '$lib/stores/notifications.js';

export type {
  Notification,
  NotificationStoreMethods,
  NotificationStore,
} from '$lib/stores/notifications.js';
