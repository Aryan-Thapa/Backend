const fs = require("fs");
// fs.writeFile("hey.txt", "Hello World", function (err) {
//   if (err) console.error(err);
//   else console.log("File Created");
// });

// fs.appendFile("hey.txt", " Hello!!!!", function (err) {
//     if (err) console.error(err);
//     else console.log("File updated");
// });

// fs.rename("hey.txt","hello.txt",function(err){
//     if(err) console.error(err);
//     else console.log("File renamed")
// })

// fs.copyFile("hello.txt","./copy/copy.txt",function(err){
//     if(err) console.error(err);
//     else console.log("File copied")
// })

// fs.unlink("hello.txt",function(err){
//     if(err) console.error(err);
//     else console.log("File removed")
// })

fs.rmdir("./copy",function(err){
    if(err) console.error(err.message);
    else console.log("Directory removed")
})

fs.rm("./index.html",function(err){
    if(err) console.error(err.message);
    else console.log("file removed")
}) 