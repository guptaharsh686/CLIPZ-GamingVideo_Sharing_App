import { of, fromEvent } from "rxjs";
import {map,pluck} from 'rxjs'


// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = fromEvent(document,'keydown').pipe(
    pluck('code')
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