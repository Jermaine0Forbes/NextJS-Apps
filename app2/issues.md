# issues

## [can you make a fetch request in a client component in next.js](https://www.google.com/search?q=can+you+make+a+fetch+request+in+a+client+component+in+next.js&sca_esv=46f3d15cfb9e1921&sxsrf=APpeQnteM4dZnM-rH7NoV_Oj8sKYRK6fug%3A1788274799809&ei=b-iWatb3MLe8p84P3Yf0yAM&biw=1382&bih=891&oq=can+you+make+a+fetch+request+in+a+client+com&gs_lp=Egxnd3Mtd2l6LXNlcnAiLGNhbiB5b3UgbWFrZSBhIGZldGNoIHJlcXVlc3QgaW4gYSBjbGllbnQgY29tKgIIADIFECEYoAEyBRAhGKABMgUQIRirAjIFECEYqwIyBRAhGKsCSMBrUABYzFpwBngAkAEAmAHGAaAB3SWqAQUyMi4yNrgBAcgBAPgBAZgCNqACyyjCAgQQIxgnwgILEAAYgAQYigUYkQLCAg0QABiABBiKBRhDGLEDwgIKEAAYgAQYigUYQ8ICFhAuGIAEGIoFGEMYsQMYgwEYxwEY0QPCAhAQABiABBiKBRhDGLEDGIMBwgIREC4YgAQYsQMYgwEYxwEY0QPCAgUQABiABMICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAiAQLhiABBixAxiDARjHARjRAxiXBRjcBBjeBBjgBNgBAcICCxAAGIAEGIoFGLEDwgIGEAAYFhgewgILEAAYgAQYigUYhgPCAgUQABjvBcICCBAAGIAEGKIEwgIFECEYnwWYAwC6BgYIARABGBSSBwcyMy4zMC4xoAfLjwOyBwcxNy4zMC4xuAegKMIHCTAuMTUuMzQuNcgH_gGACAE&sclient=gws-wiz-serp)

 While Server Components are preferred for data fetching to protect API keys and improve loading speeds, client-side fetching is necessary for real-time updates, user-driven interactions (like an autocomplete search bar), or content that refreshes frequently.

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