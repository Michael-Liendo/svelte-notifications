<script lang="ts" module>
  export const Position = {
    TopRight: 'top_right',
    TopLeft: 'top_left',
    BottomRight: 'bottom_right',
    BottomLeft: 'bottom_left',
  } as const;

  export type TPosition = (typeof Position)[keyof typeof Position];

  export function getPositionClasses(position: TPosition = Position.TopRight) {
    switch (position) {
      case Position.TopRight:
        return 'position-top-right';
      case Position.TopLeft:
        return 'position-top-left';
      case Position.BottomRight:
        return 'position-bottom-right';
      case Position.BottomLeft:
        return 'position-bottom-left';
      default:
        return 'position-top-right';
    }
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte';

  import notification from '$lib/stores/notifications.js';

  import type { Notification as INotification } from '$lib/stores/notifications.js';

  import type { Snippet } from 'svelte';

  let notificationsList: INotification[] = $state([]);

  interface Props {
    class?: string;
    style?: string;
    position?: TPosition;
    children?: Snippet<[any]>;
  }

  let {
    class: className = '',
    style = '',
    position = Position.TopRight,
    children,
  }: Props = $props();

  // Use auto-subscriptions to avoid leaking memory on re-renders
  // Refer: https://svelte.dev/tutorial/auto-subscriptions
  const unsubscribe = notification.subscribe(() => {
    notificationsList = notification.sorted();
  });

  onDestroy(unsubscribe);
</script>

<ul
  class={className}
  class:position-top-right={position === Position.TopRight}
  class:position-top-left={position === Position.TopLeft}
  class:position-bottom-right={position === Position.BottomRight}
  class:position-bottom-left={position === Position.BottomLeft}
  class:z-index={notificationsList?.length}
  {style}
>
  {#each notificationsList as notification}
    {@render children?.({ notification })}
  {/each}
</ul>

<style>
  .notification-list {
    position: fixed;
    padding: 6px;
    overflow-y: auto;
    max-height: calc(100vh - 54px);
  }

  .z-index {
    z-index: 50;
  }

  .position-top-right {
    position: absolute;
    top: 6px;
    right: 6px;
  }

  .position-top-left {
    position: absolute;
    top: 6px;
    left: 6px;
  }

  .position-bottom-right {
    position: absolute;
    bottom: 6px;
    right: 6px;
  }

  .position-bottom-left {
    position: absolute;
    bottom: 6px;
    left: 6px;
  }
</style>
