import { fromEvent } from "rxjs";
import {map} from 'rxjs'
import {ajax} from 'rxjs/ajax'


var button = document.querySelector('#btn');
// const observable = of(1,2,3,4,5) // gives numbers as output
const observable = fromEvent(
    button,'click'
).pipe(
    map(() => {
        return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1')
    })
)


const subscription = observable.subscribe({
    next: (value) => {
        value.subscribe(console.log)
    },
    complete: () => {
        console.log('complete')
    }
})


// setTimeout(()=>{
//     subscription.unsubscribe()
// },4000);