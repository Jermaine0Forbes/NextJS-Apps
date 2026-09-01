# issues

## Argument of type '() => Promise<void>' is not assignable to parameter of type 'EffectCallback'. Type 'Promise<void>' is not assignable to type 'void | Destructor'.
useEffect expects its callback to return either void (nothing) or a cleanup function (Destructor). Because async functions automatically return a Promise, TypeScript flags this as invalid.
### fix

```js
// ✅ VALID
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
  };

  loadData();
}, []);
```