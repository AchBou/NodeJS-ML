
function launch() {

  /* méthode 1 :
  var formData = new FormData(document.getElementById('contact'));

  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/test");
  req.send(formData); */

  ////////////////////////////////////////

  /* méthode 2 */
  var formData = new FormData(document.getElementById('contact'));

  const options = {
    method: 'POST',
    body: formData
  };

fetch('http://localhost:3000/predict', options)
.then(response=>response.json())
.then(result=>{document.getElementById('result').innerHTML=result.toFixed(2)+" $";})


}
