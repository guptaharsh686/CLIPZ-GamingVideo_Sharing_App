import { of,from } from "rxjs";

// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = from(fetch('https://jsonplaceholder.typicode.com/todos/1')) //gives single array as output



const subscription = observable.subscribe({
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('complete')
    }
})


// setTimeout(()=>{
//     subscription.unsubscribe()
// },4000);