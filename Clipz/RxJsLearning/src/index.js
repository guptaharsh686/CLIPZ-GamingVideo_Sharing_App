import { Observable, } from "rxjs";

const observable = new Observable((sub)=> {
    const id = setInterval( () => {
        sub.next('test');
        console.log('leak');
    },1000);

    // sub.complete();

    return () => {
    clearInterval(id);
    }
});



const subscription = observable.subscribe({
    next: (value) => {
       console.log(value)
    },

    complete: () => {
        console.log("Complete");
    },

    error: (err) => {
        console.error(err);
    }
})


setTimeout(()=>{
    subscription.unsubscribe()
},4000);