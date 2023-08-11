import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: config.public.pusher_key,
    cluster: config.public.pusher_cluster,
    forceTLS: true,
    disableStats: true,
    encrypted: true,
  });
});
