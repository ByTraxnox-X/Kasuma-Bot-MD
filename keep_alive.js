from flask import Flask,render_template
from threading import Thread
app = Flask(__name__)
@app.route('/')
def index():
    return "Alive"
def run():
  app.run(host='0.0.0.0',port=8080)
def keep_alive():  
    t = Thread(target=run)
    t.start()


var http = require('http');
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);