import { fromEvent,interval } from "rxjs";
import {map,switchMap,take,tap} from 'rxjs'
import {ajax} from 'rxjs/ajax'


var button = document.querySelector('#btn');
// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = fromEvent(
    button,'click'
).pipe(
    switchMap(() => {
        return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
            take(5), //take plays a vital role in completion of observables
            tap({ //tap can accept object with OBSERVER LIKE functions
                complete() {
                    console.log('inner observer is completed')
                }
            }),
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