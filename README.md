# DTest
Test and call function with random predicted arguments.
`DTest` generates random arguments and call the function with the arguments.
Generating argument is easy and simple, you can customize it anytime.

```js
var users = [];
function NewUser(uid, password) {
  users.push({ uid, password });
}

var test = DTest(NewUser, [{
  type: DTest.TYPE_NUMBER,
  config: [0, 99999]
}, {
  type: DTest.TYPE_STRING
}], (func, args, res) => {
  console.log("Calling");
  res(func.apply({}, args));
  console.log("Done");
});
console.log(test);
```


<!--
# Development

If you want to test your function quickly, view [DTest Development](https://dlvdls18.github.io/DTest/dev.html).
-->



# Getting Started

## Installation

Download the file [dtest.js](https://cdn.jsdelivr.net/gh/dlvdls18/DTest@main/src/dtest.js)
then add the following code:

```html
<script src="path/to/dtest.js"></script>
```

Or use JSDelivr CDN:
```html
<script src="https://cdn.jsdelivr.net/gh/dlvdls18/DTest@main/src/dtest.js"></script>
```

## Building Your Project

1. Enter these commands in your terminal

```bash
mkdir MyProject
cd MyProject
touch index.html
touch index.js
```

2. Open your favorite IDE and open the file `/MyProject/index.html`
3. Copy this html template and paste it to `index.html`



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>MyProject</title>
  </head>
  <body>
    <p>Hello, World!</p>
  </body>
  <!-- <script src="path/to/dtest.js"></script> -->
  <script src="https://cdn.jsdelivr.net/gh/dlvdls18/DTest@main/dtest.js"></script>
  <script>
    var users = [];
    function NewUser(uid, password) {
      users.push({ uid, password });
    }
    var test = DTest(NewUser, [{
      type: DTest.TYPE_NUMBER,
      config: [0, 99999]
    }, {
      type: DTest.TYPE_STRING
    }], (func, args, res) => {
      console.log("Calling");
      res(func.apply({}, args));
      console.log("Done");
    });
    console.log(test);
  </script>
</html>
```

4. Start Coding :tada:



# Documentations

## Basics

These are the arguments of `DTest` function:

|  Name   |     Type     |       Description      | Required |
|---------|--------------|------------------------|----------|
| func    | Function     | Function to test       |   Yes    |
| rules   | Array Object | How arguments generate |   Yes    |
| handler | Function     | How function called    |   No     |
| config  | Object       | Each arguments config  |   No     |


## Writing Rules

### Features

`Rules` are important for generating random arguments.
`Rules` can:
- Customize the argument type
  - String
  - Number
    - Can customize the range (0-10 by default)
  - Boolean
  - Any (String, Number, Boolean)
  - Array String
    - Customized array size (required)
  - Array Number
    - Customized array size (required)
    - Can customize the range (0-10 by default)
  - Array Boolean
    - Customized array size (required)
  - Any Array (String, Number, Boolean)
    - Customized array size (required)
  - Object (Value of String)
    - Customized object size (required)
    - Keys can be String or Number
  - Object (Value of Number)
    - Customized object size (required)
    - Keys can be String or Number
    - Can customize the range (0-10 by default)
  - Object (Value of Boolean)
    - Customized object size (required)
    - Keys can be String or Number
  - Object (Any Value)
    - Customized object size (required)
    - Keys can be String or Number
- Add predicted value
  - Set the argument value to given predicted value instead of randomized value

More features coming soon!

### Format

```js
[{
  type: number,
  config: array
}, ...]
```

#### Types

- String `DTest.TYPE_STRING`
- Number `DTest.TYPE_NUMBER`
- Boolean `DTest.TYPE_BOOLEAN`
- Any `DTest.TYPE_ANY`
- Array String `DTest.TYPE_ARRAY_STRING`
- Array Number `DTest.TYPE_ARRAY_NUMBER`
- Array Boolean `DTest.TYPE_ARRAY_BOOLEAN`
- Array Any `DTest.TYPE_ARRAY_ANY`
- Object String `DTest.TYPE_OBJECT_STRING`
- Object Number `DTest.TYPE_OBJECT_NUMBER`
- Object Boolean`DTest.TYPE_OBJECT_BOOLEAN`
- Object Any `DTest.TYPE_OBJECT_ANY`

#### Configuration

Each types are number from 0 to 11.
For selecting the type, I use 
```js
var rule = rules[i];
var type_functions = [string, randint, boolean, ...]
var type_number = rule.type;
type_functions[type_number].apply({}, rule.config || []);
```

for quick development instead of
```js
var rule = rules[i];
if(rule == 0) ...
else if(rule == 1) ...
else if(rule == 2) ...
...
```

or

```js
var rule = rules[i];
switch(rule.type) {
  case 0: ...
  break;
  case 1: ...
  break;
  case 3: ...
  break;
  case ...: ...
  break;
  default: ...
  break;
}
```


So `config` is an array for arguments.
These are the arguments for `type functions`:


|           Type              |      Arguments       |                                             Description                                                   |
|-----------------------------|----------------------|-----------------------------------------------------------------------------------------------------------|
|          String             |       Format         | String Format                                                                                             |
|          Number             |      Min, Max        | Randomization Range (default 0-10)                                                                        |
|          Boolean            | T Percent, F Percent | True and False Percentage                                                                                 |
| Array String, Boolean, Any  |        Size          | Length of the array (required)                                                                            |
|       Array Number          |   Size, Min, Max     | Length of the array (required), Randomization Range (default 0-10)                                        |
| Object String, Boolean, Any |      Size, Key       | Length of the object (required), Key Type (number) (String or Number)                                     |
|      Object Number          | Size, Min, Max, Key  | Length of the object (required), Randomization Range (default 0-10), Key Type (number) (String or Number) |


## Argument Length

Since the format of `rules` is array object.
You can use many argument input as you want.

### Example

#### Code


```js
function add() {
  var num = arguments[0];
  for(var i = 1; i < (arguments.length + 1); i++) {
    num += arguments[i];
  }
  return num;
}
```

```js
DTest(add, [{
  type: DTest.TYPE_NUMBER,
  config: [1, 100]
}, {
  type: DTest.TYPE_NUMBER,
  config: [1, 100]
}, {
  type: DTest.TYPE_NUMBER,
  config: [1, 100]
}, ...]);
```


#### Expected Output
```
Example Random Number Value:
arg1 = 10
arg2 = 3
arg3 = 8
arg4 = 5
```

```
Output:
> 26
```


## Customizing How Function Called

You can customize how function is called with the argument `handler`.
`handler` argument accept a function with arguments

- func
- args
- res



### Func

Function to Test

### Args

Generated Arguments

### Res

A function to end the promise and return the result.

```js
res( /*  Return Value Of "func"  */ );

// Recommend Use
res( func.apply({}, args) );
```

Since `args` is array type. It is recommended to use `func.apply` function to call the function.


## Return Value

### With and Without Handler

### Without Handler

```js
{
  call_args: array,
  func: function,
  result: any,
  recall: function,
  recall_promise: function
}
```


### With Handler

With `handler`, return value is a `Promise`.

```js
DTest(...).then(function(result) {
  console.log("Test Ended");
  console.log(result);
});
```

You don't need to add `.catch` function since there will be no errors unless:

- Some required arguments/values are missing
- Incorrect argument/value type
- Function to test throws an error


The `promise` cannot be ended until the function `res` is called.

After the `promise` ended, it will call `resolve` (which is `.then`) with 1 argument:

```js
{
  call_args: array,
  func: function,
  result: any,
  recall: function,
  recall_promise: function
}
```


### Recall and Recall Promise


#### Recall

If you want to call the function again with promise and the same arguments,
You can use `.recall` function


#### Recall Promise

If you want to call the function again with the same arguments,
You can use `.recall_promise` function.

This function requires 1 argument, `handler`.
`handler` feature is the same for `test with handler`.


#### Return Value

```js
{
  call_args: array,
  func: function,
  result: any
}
```

## String Format

Feature added at **1.1**


If you want simple string, you can use:

- `DTest.FORMAT_STRING`
- `DTest.FORMAT_NUMBER`

For argument of `string`

```js
string(...);
```


### String

#### Before

```
aOnT05jS6A
```

#### After

```
Helamety Pode
```


### Number

#### Before

```
j9bwm7F
```

#### After

```
9217 7271 1072 8157
```


### How It Made

#### String

Function `generateword` generates a consonant and a vowel

```
Example:
Ha
Le
Ko
We
Bu
```

Function `generatefullword` call `generateword` in random times and capitalize each words

```
Example:
Hakoremu Pomelari
Lore No
Duqolema Pire Gomiso
```


#### Number

Just like `String`, It generates random number (1000-9999) for random times

```
Example:
8352 3815 7243 7268 1638
8363 5273 9485 
9372 8989 3632 8263
```

## DTest Configuration

Feature added at **1.1**

```js
{
  // remove argument duplicates
  remove_duplicates: boolean (false by default)
}
```

More configuration will added soon

## Any... Configuration

Feature added at **1.1**

Function `any` `anyarray` `anyobject` doesn't have any arguments to customize each types.
To keep predictable, I added an argument called `config` which is very useful for type arguments.

Since `config` in `rules` are for arguments, `config` for these functions are object.
These are available keys for the `config`:
- string
- randint (number)
- bool (boolean)


```js
{
  string: [DTest.FORMAT_STRING],
  randint: [1, 1000],
  bool: [DTest.PERCENTAGE_LOW, DTest.PERCENTAGE_NORMAL]
}
```


## Boolean Percentage

Feature added at **1.1**

You can control how random boolean generates


### Arguments

- True Percentage
- False Percentage




### Percentages

- `DTest.PERCENTAGE_LOW`
- `DTest.PERCENTAGE_NORMAL`
- `DTest.PERCENTAGE_HIGH`


### Example

```js
DTest(..., [{
  type: DTest.TYPE_BOOLEAN,
  config: [DTest.PERCENTAGE_LOW, DTest.PERCENTAGE_HIGH]
}]);
```
