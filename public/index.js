if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((registration) => {
      //console.log("SW Registerd");
      //console.log(registration);
    })
    .catch((error) => {
      console.log('SW registration Failed!');
      console.log(error);
    });
}
