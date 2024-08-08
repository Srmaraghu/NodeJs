const fs=require("fs")

//Synchronous call.. Blocking Request
// fs.writeFileSync('./test.txt',"Hey there");

//asynchronous call.. Non Blocking request
// fs.writeFile('./test.txt',"Hey There Async",(err)=>{});


// const result =fs.readFileSync("./contacts.txt","utf-8") 
// console.log(result);

// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err)
//         {
//             console.log("Error:",err);
//         }
//         else{
//             console.log(result) 

//         }
// }) 

// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());


// fs.appendFileSync("./test.txt","K xa \n");

//For Log Purpose:
fs.appendFileSync("./test.txt" , `${ Date.now()} Hey there\n`);

fs.cpSync('./test.txt','./copy.txt')

// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync('./test.txt'))

