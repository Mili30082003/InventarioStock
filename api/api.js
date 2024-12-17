fetch('https://inventariobackend-1.onrender.com/getdata')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
