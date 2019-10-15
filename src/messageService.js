import { Subject, interval } from "rxjs";
import { take, map } from "rxjs/operators";

const subject = new Subject();

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable()
};

let i = 0;
interval(1000)
  .pipe(
    take(12),
    map(t => messageService.sendMessage(t)),
    map(() => i++)
  )
  .subscribe(s => console.log(s));
