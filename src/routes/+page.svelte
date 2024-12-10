<script lang="ts">
  import { NotificationList, notifications } from '$lib';

  const success = () => {
    notifications.notifySuccess(`Hello World!${new Date()}`);
  };
</script>

<button onclick={success}> Append Success </button>

<NotificationList>
  {#snippet children({ notification })}
    <li>
      <strong>{notification.title}</strong>
      <p>{notification.message}</p>
    </li>
  {/snippet}
</NotificationList>
