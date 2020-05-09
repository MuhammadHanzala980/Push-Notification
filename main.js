Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
});



async function subscribe() {
  let sw = await navigator.serviceWorker.ready
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BLOrh-N6qjdfJRi0CMylhUJ6EyONR93_hhsxE_BNIBQG9-BoG9IQwFanXGpDfT02UapL_SURFykf5j95qHSWbSg'
  })
  console.log(JSON.stringify(push))
}





function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {
            action: 'explore', title: 'Explore this new world',
            icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
          },
          {
            action: 'close', title: 'Close notification',
            icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
          },
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function (reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function (sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  })
    .catch(function (err) {
      console.log('Service Worker registration failed: ', err);
    });
}
function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function (sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function (e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}
