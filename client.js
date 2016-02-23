var sharedb = require("sharedb/lib/client");
var WebSocket = require("ws/lib/WebSocket");

var connection = new sharedb.Connection(new WebSocket("ws://localhost:8080"));

var doc = connection.get("collection", "document");

doc.subscribe(function(error){
  if (!doc.type) {
    doc.create({x: "hello"});
  }

  if (doc.type) {
    // `doc` ready, make ops
    setTimeout(function() { // timeout need for example (to delay after create)
      doc.submitOp([{p: ["x", 5], si: " world"}]);
      console.log("string insert is done.");
    }, 1000);
  }
});