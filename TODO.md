# June 2, 2022

- [x] Add range to `array any` and `object any` for number

```js
anyarray(size, min, max);
anyobject(size, min, max, key);
```

- [x] Add percentage to boolean for randomization chance

```js
[{
  type: DTest.TYPE_BOOLEAN,
  config: [DTest.PERCENTAGE_LOW, DTest.PERCENTAGE_HIGH]
}]
// > false
// > false
// > true
// > ...
```

- [x] Add predictable value

```js
[{
  type: DTest.TYPE_NUMBER,
  value: 10
}]
// > 10

[{
  type: DTest.TYPE_NUMBER
}]
// > ...
```

- [x] Ability to allow or disallow nullable value

```js
[{
  type: DTest.TYPE_NUMBER,
  nullable: true
}]
// > null
// > ...
```

- [x] Multiple type

```js
[{
  type: [DTest.TYPE_NUMBER, DTest.TYPE_BOOLEAN]
}]
// > 100
// > true
```

- [x] Remove duplicates


- [x] Ability to generate simple string
```js
[{
  type: DTest.TYPE_STRING
}]
// > AjO2n84J

[{
  type: DTest.TYPE_STRING,
  config: [DTest.FORMAT_STRING | DTest.FORMAT_NUMBER | DTest.FORMAT_BOOLEAN]
}]
// > Hogelir Watufe
// > 0193 8263 8264 6192
// > yes
```

- [x] Add version to `dtest.js`
```js
DTest.VERSION = ...;
```

- [x] Remove the documentation from `dtest.js`
- [x] Remove the TODO from `README.md`

- [x] Add configuration for `any`, `any array` and `any object`;
```js
anyobject(12, {
  randint: [10, 30],
  boolean: [DTest.PERCENTAGE_LOW, DTest.PERCENTAGE_NORMAL],
  string: [DTest.FORMAT_STRING]
});
```

- [x] Make the static variables unwritable
- [ ] Add arguments verification
- [ ] Transfer `version.txt`, `TODO.md`, `CONTRIBUTION.md` to `info/...`