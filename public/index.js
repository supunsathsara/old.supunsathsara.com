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

//About section
var birthday = '2002/08/26';
var ageDate = new Date(Date.now() - new Date(birthday).getTime());
var age = Math.abs(ageDate.getUTCFullYear() - 1970);
document.getElementById('about-age').innerHTML = age + ' years old';
