import { timer } from "rxjs";

const observable = timer(1000,1000)



const subscription = observable.subscribe(
    console.log
)


// setTimeout(()=>{
//     subscription.unsubscribe()
// },4000);