import { of } from "rxjs";
import {reduce} from 'rxjs'


// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = of(1,2,3,4,5).pipe(
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