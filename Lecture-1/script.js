const arr = [1, 2, 3, 4, 5, 2];
//forEach method is used to iterate over the array and perform a function on each element
// it does not return anything, it just performs the function on each element
let ans = [];
arr.forEach((item) => {
  item = item * 2;
  console.log(item);
  ans.push(item);
});
console.log(ans);

//map method is used to iterate over the array and perform a function on each element
// it return a new array with the result of the function
// it does not modify the original array
let ans2 = arr.map((item) => {
  item = item * 2;
  return item;
});
console.log("ans2", ans2);

//reduce method is used to iterate over the array and perform a function on each element
// it returns a single value as the result of the function
let ans7 = arr.reduce((acc, item) => {
  acc = acc + item;
  return acc;
});
console.log("reduce:", ans7);

//filter method is used to iterate over the array and perform a function on each element
//it returns a new array with the elements that pass the test implemented by the provided function
//it does not modify the original array
let ans3 = arr.filter((item) => {
  return item > 2;
});

console.log(ans3);

//find method is used to iterate over the array and perform a function on each element
//it returns the value of the first element in the array that satisfies the provided testing function
//otherwise undefined is returned
let ans4 = arr.find((item) => {
  return item > 2;
});

console.log(ans4);

//indexOf method is used to return the first index at which a given element can be found in the array or -1 if it is not present
let ans5 = arr.indexOf(2);
console.log(ans5);
//lastIndexOf method is used to return the last index at which a given element can be found in the array or -1 if it is not present
let ans6 = arr.lastIndexOf(2);
console.log(ans6);

//Objects are a collection of key-value pairs
//Objects are mutable, meaning they can be changed after they are created
//Objects are reference types, meaning they are stored in memory as a reference to the object
let obj = {
  kuchbhi: "kuchbhi",
};

console.log(obj.kuchbhi);
console.log(obj["kuchbhi"]);

Object.freeze(obj);
//Object.freeze method is used to freeze an object, meaning it cannot be changed

//functions in javascript are first-class objects, meaning they can be treated like any other value

function abcd() {
  return "abcd";
}

// abcd();
console.log(abcd());

//code that executes line by line is called synchrnonous code
//code that is of async nature that is sent to the side stack and executes the following code and when the entire sync code has executed then check if the async code has executed or not if completed bring that to the main stack and execute

async function abcd2(){
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();
    console.log(data);
}
abcd2()