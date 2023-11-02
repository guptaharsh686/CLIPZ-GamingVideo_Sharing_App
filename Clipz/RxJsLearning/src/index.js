import { fromEvent } from "rxjs";

const observable = fromEvent(document,'click')



const subscription = observable.subscribe(
    console.log
)


// setTimeout(()=>{
//     subscription.unsubscribe()
// },4000);