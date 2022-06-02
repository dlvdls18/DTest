- [x] Add range to array any and object any if there are numbers

```js
anyarray(size, min, max);
anyobject(size, min, max, key);
```

- [ ] Add percentage to boolean for randomization chance

```js
[{
  type: DTest.TYPE_BOOLEAN,
  true_percentage: 3, // 30% - 100%
  false_percentage: 7 // 70% - 100%
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

- [ ] Ability to allow or disallow nullable value

```js
[{
  type: DTest.TYPE_NUMBER,
  nullable: true
}]
// > null
// > ...
```

- [ ] Multiple type

```js
[{
  type: [DTest.TYPE_NUMBER, DTest.TYPE_BOOLEAN]
}]
// > 100
// > true
```

- [ ] Remove duplicates
```js
[{
  type: DTest.TYPE_NUMBER,
  remove_duplicates: true
}]
```

- [ ] Ability to generate simple string
```js
[{
  type: DTest.TYPE_STRING
}]
// > AjO2n84J

[{
  type: DTest.TYPE_STRING,
  simplified: true
}]
// > Hogelir Watufe
// > 0193 8263 8264 6193 8163
```

- [ ] Add version to `dtest.js`
```js
DTest.VERSION = ...;
```

- [x] Remove the documentation from `dtest.js`
- [x] Remove the TODO from `README.md`

- [x] Add configuration for `any array and `any object`