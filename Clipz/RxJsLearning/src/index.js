import { map, of } from "rxjs";

// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = of(1,2,3,4,5)

var withSymbol = observable.pipe(
    map((value) => `$${value}`)
).subscribe({
    next: () => {
        console.log('symbol');
    }
})



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