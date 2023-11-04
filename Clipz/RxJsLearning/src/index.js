import { interval } from "rxjs";
import {reduce,take,scan,tap} from 'rxjs'


// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = interval(500).pipe(
    tap(console.log),
    take(5),
    reduce((acc,value)=> acc+value, 0)
)



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