import Echo from 'laravel-echo';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // window.Pusher = require('pusher-js');
  // window.Echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: process.env.PUSHER_APP_KEY,
  //   cluster: process.env.PUSHER_APP_CLUSTER,
  //   forceTLS: true,
  // });
});
