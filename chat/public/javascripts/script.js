const ws = new WebSocket("ws://localhost:3000");


ws.onmessage = (msg) => {
  console.log("On message");
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const author = document.getElementById("author");
  const message = document.getElementById("message");
  const ts = Date.now();
  const obj = {
    message: message.value,
    author:author.value,
    ts: ts,
  };
  console.log(obj);

  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('POST' , 'http://localhost:3000/chat/api/messages');
    req.onload = function () {
      if(req.status == 200)
      {
        ws.send(JSON.stringify(obj));
        message.value = "";
        author.value = "";
      }
      else
        document.getElementById("error").innerHTML = '<p style="color:red;">Debe llenar todos los campos</p>';
    }
    req.send(obj);
  }); 
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

