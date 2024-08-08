const fs=require("fs");

// // Blocking operations 
// here 1, would be printed first and then the file content and 2,3 as readFileSync will block  execution of codes below it unless its completed
console.log("\Blocking operation")

console.log('1')

const result= fs.readFileSync('contacts.txt',"utf-8")
console.log(result);

console.log('2')
console.log('3')

//Note Default Thread Pool Sie=4
//Max?-  if you have 8 core cpu, max threads you can have is 8



//Non Blocking operations
// here 1,2,3 would be printed first as readFile wont block execution of codes below it
console.log("\nNon blocking operation")
console.log('1')

fs.readFile('contacts.txt',"utf-8",(err,result)=>{
    if(err){
        console.log("Errpr:",{e})
    }
    else{
        console.log(result);
    }
})

console.log('2')
console.log('3')
