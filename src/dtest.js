/**
 * DTest
 * License: MIT
 * (c) 2022 - dlvdls2
 * 
 * 
 * Example:
 * I have a function that sign in a person,
 * it has 2 arguments; username and password.
 * 
 * function sign_in(username, password) {
 *   localStorage.setItem("username", username);
 *   localStorage.setItem("password", btoa(password));
 *   //...
 * }
 * 
 * I would like to test this function if it will work.
 * I want it randomized.
 * 
 * You're gonna use DTest for that.
 * 
 * DTest(function, rules, handler)
 * 
 * - function:
 * the function you want to test
 * [ function(...) ]
 * 
 * - rules:
 * the argument type you want to use to call the function
 * [ array > object ]
 * 
 * - handler:
 * function to customize the arguments and function to test (optional)
 * [ function(function to test (function), arguments (array > any), result (function) ]
 * without handler, how function to test called is .apply({}, [args]);
 * 
 * 
 * example for function:
 * 
 * function greet(name) {
 *   return "Hello " + name + "!";
 * }
 * 
 * DTest(greet, ...)
 * 
 * 
 * example for rules:
 * 
 * [{
 *   type: number,
 *   config: array
 * }]
 * 
 * to set the number, you can use DTest.TYPE_...
 * DTest.TYPE_STRING, (0)
 * DTest.TYPE_NUMBER, (1)
 * DTest.TYPE_BOOLEAN, (2)
 * DTest.TYPE_ANY, (3)
 * DTest.TYPE_ARRAY_STRING, (4)
 * DTest.TYPE_ARRAY_NUMBER, (5)
 * DTest.TYPE_ARRAY_BOOLEAN, (6)
 * DTest.TYPE_ARRAY_ANY, (7)
 * DTest.TYPE_OBJECT_STRING, (8)
 * DTest.TYPE_OBJECT_NUMBER, (9)
 * DTest.TYPE_OBJECT_BOOLEAN, (10)
 * DTest.TYPE_OBJECT_ANY (11)
 * out of range number does not throw any error
 * 
 * 
 * example for handler:
 * 
 * function(func, args, res) {
 *   console.log("Before Call")
 *   // call the "res" to end the promise and return some extra values
 *   // use the apply to call the function with array arguments
 *   res(func.apply({}, args));
 *   console.log("After Call")
 * }
 * 
 * 
 * 
 * 
 * Example:
 * 
 * function greet(name) {
 *   return "Hello " + name + "!";
 * }
 * 
 * var testpromise = DTest(greet, [{
 *   type: DTest.TYPE_STRING
 * }, function(func, args, res) {
 *   // empty object for "this"
 *   res(func.apply({}, args));
 * }].then(function(result) {
 *   // object
 *   console.log(result);
 * }).catch(function() {
 *   // unnecessary, never gonna called
 * });
 * 
 * 
 * result = {
 *   call_args: arguments (array),
 *   func: function to test (function),
 *   result: return value of the function after called (can be undefined),
 *   recall: function,
 *   recall_promise: function
 * }
 * 
 * If you want to call the function again, use recall function
 * It will call and return the result without recall and recall_promise
 * 
 * If you want to call the function again but with promise, use recall_promise function
 * It will call with handler and return the result without recall and recall_promise
 * 
 * Feedback: dlvdls18@gmail.com
 */

function DTest(func, rules, handler) {
  // important note:
  // every type function values must be exactly
  // string, randint, bool, any, stringarray, numarray, boolarray, anyarray, stringobject, numobject, boolobject, anyobject
  // for static variable type
  var inc_num = -1;
  // increment the number and return it
  // usage for object number key
  function inc() {
    inc_num++;
    return inc_num;
  }
  // return random number with range
  function randint(min, max) {
    min = min || 0;
    max = max || 10;
    return Math.floor(Math.random() * (max + min + 1)) + min;
  }
  // return random string
  function string() {
    var chars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
    var random = "";
    for(var i = 0; i < randint(3, 20); i++) random += chars[randint(0, chars.length - 1)];
    return random;
  }
  // return random boolean
  function bool() {
    return randint(0, 1) == 1;
  }
  // return random any type
  function any(args) {
    var tf = [string, randint, bool]
    return tf[randint(0, 2)].apply(args || []);
  }
  // return random number array
  function numarray(size, min, max) {
    var arr = [];
    for(var i = 0; i < size; i++) arr.push(randint(min, max));
    return arr;
  }
  // return random string array
  function stringarray(size) {
    var arr = [];
    for(var i = 0; i < size; i++) arr.push(string());
    return arr;
  }
  // return random boolean array
  function boolarray(size) {
    var arr = [];
    for(var i = 0; i < size; i++) arr.push(bool());
    return arr;
  }
  // return an array with random type
  function anyarray(size) {
    var arr = [];
    for(var i = 0; i < size; i++) {
      var t = randint(0, 2);
      var f = [string, randint, bool];
      arr.push(f[t]());
    }
    return arr;
  }
  // return a string object
  function stringobject(size, key) {
    key = key || 0;
    inc_num = -1;
    var kf = [string, inc];
    var obj = {};
    for(var i = 0; i < size; i++) {
      var kt = arraysearch(kf, key);
      obj[kt()] = string();
    }
    return obj;
  }
  // return a number object
  function numobject(size, min, max, key) {
    key = key || 0;
    inc_num = -1;
    var kf = [string, inc];
    var obj = {};
    for(var i = 0; i < size; i++) {
      var kt = arraysearch(kf, key);
      obj[kt()] = randint(min, max);
    }
    return obj;
  }
  // return a boolean object
  function boolobject(size, key) {
    key = key || 0;
    inc_num = -1;
    var kf = [string, inc];
    var obj = {};
    for(var i = 0; i < size; i++) {
      var kt = arraysearch(kf, key);
      obj[kt()] = bool();
    }
    return obj;
  }
  // return an object with random type
  function anyobject(size, key) {
    key = key || 0;
    inc_num = -1;
    var kf = [string, inc];
    var obj = {};
    for(var i = 0; i < size; i++) {
      var kt = arraysearch(kf, key);
      var t = randint(0, 2);
      var f = [string, randint, bool];
      obj[kt()] = f[t]();
    }
    return obj;
  }
  // return the array item using absolute out of range position value
  // usage for object key type
  function arraysearch(array, position) {
    var pos = 0;
    for(var i = 0; i < Math.abs(position); i++) {
      if(pos >= (array.length - 1)) pos = -1;
      pos++;
    }
    return array[pos];
  }
  // loop each rules
  var call_args = [];
  for(var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    var rf = [string, randint, bool, any, stringarray, numarray, boolarray, anyarray, stringobject, numobject, boolobject, anyobject];
    var rt = rule.type;
    call_args.push(arraysearch(rf, rt).apply({}, rule.config || []));
  }
  // call the function directly
  if(handler == null) return {
    call_args, func,
    result: func.apply({}, call_args),
    recall: function() {
      return {
        call_args: this.call_args,
        func: this.func,
        result: this.func.apply({}, this.call_args),
        self: this
      }
    },
    recall_promise: function(handler) {
      return new Promise(function(resolve, reject) {
        var that = this;
        handler.call({}, this.func, this.call_args, function(result) {
          resolve({ result, call_args: that.call_args, handler});
        });
      });
    }
  }
  // call the function with customized argument passing
  else return new Promise(function(resolve, reject) {
    handler.call({}, func, call_args, function(result) {
      resolve({ result, call_args, func, handler});
    });
  });
}

DTest.TYPE_STRING = 0;
DTest.TYPE_NUMBER = 1;
DTest.TYPE_BOOLEAN = 2;
DTest.TYPE_ANY = 3;
DTest.TYPE_ARRAY_STRING = 4;
DTest.TYPE_ARRAY_NUMBER = 5;
DTest.TYPE_ARRAY_BOOLEAN = 6;
DTest.TYPE_ARRAY_ANY = 7;
DTest.TYPE_OBJECT_STRING = 8;
DTest.TYPE_OBJECT_NUMBER = 9;
DTest.TYPE_OBJECT_BOOLEAN = 10;
DTest.TYPE_OBJECT_ANY = 11;
