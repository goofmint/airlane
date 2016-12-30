# Test with Airlane

Airlace includes unit test framework named [Mocha](https://mochajs.org). When you generated project code, you can start test soon.

```
airlane test
 3   -_-__,------,
 0   -_-__|  /\_/\ 
 0   -_-_~|_( ^ .^) 
     -_-_ ""  "" 

  3 passing (390ms)
```

**Currentry Airlane doesn't support modules (version 0.1.4).**

Test code localed to *hello/routes/test/controller_test.js*. And Airlane supports express, jsdom, supertest for global variouses.

|Library|Various|
|-------|-------|
|express|app|
|jsdom|jsdom|
|supertest|request|

If you want to write test code, please check [Mocha](https://mochajs.org) documents.


