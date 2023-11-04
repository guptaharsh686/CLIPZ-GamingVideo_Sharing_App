import { fromEvent,interval } from "rxjs";
import {map,mergeMap,take,tap} from 'rxjs'
import {ajax} from 'rxjs/ajax'


var button = document.querySelector('#btn');
// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = fromEvent(
    button,'click'
).pipe(
    mergeMap(() => {
        return interval(1000).pipe(
            tap(console.log),
            take(5) //take plays a vital role in completion of observables
        )
    }),
)


const subscription = observable.subscribe({
    next: (value) => {
       console.log(value)
    },
    complete: () => {
        console.log('complete')
    }
})


// setTimeout(()=>{
//     subscription.unsubscribe()
// },4000);