import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() { 
    console.error('called..');
  }
public count=0;

increment() {
  this.count++;
  console.error(this.count);
}

getCount() {
  return this.count;
}

}
