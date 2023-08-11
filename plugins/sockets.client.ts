import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: any;
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: config.public.pusher_key,
    cluster: config.public.pusher_cluster,
    wsHost: 'api.wiki.itl.systems',
    wsPort: 443,
    forceTLS: true,
  });
});
