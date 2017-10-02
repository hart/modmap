# modmap

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/@hart/modmap.svg?style=flat-square
[npm]: https://www.npmjs.com/package/@hart/modmap

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

# Install

```
npm install @hart/modmap
```

# Usage

## exported functions

```
import { set, get, all, byTag, getTags, unset, clear } from '@hart/modmap';

//default import is 'get'
import get from '@hart/modmap';
```

## set - Set value with a key

```
const value = { ... };

set('key', value);
```

## set - Set value with a key and tag(s)

```
const value = { ... };

set('key', value, 'tag1', 'tag2', 'tag3');
```

## get - Get value by key

```
set('key1', { ... });

const value = get('key'); // { ... }
const noValue = get('badKey'); // null
```

## all - Get all key/values

```
set('key1', { ... });
set('key2', { ... });

const allKeyValues = all(); // { key1: {}, key2: {} }
```

## byTag - Get key/values by tag

```
set('key1', { ... }, 'tag1');
set('key2', { ... }, 'tag1', 'tag2');

const tag1Values = byTag('tag1'); // { key1: {}, key2: {} }
const tag2Values = byTag('tag2'); // { key2: {} }
const tag3Values = byTag('tag3'); // { }
```

## getTags - Get all tags

```
set('key1', { ... }, 'tag1');
set('key2', { ... }, 'tag1', 'tag2');

const tags = getTags(); // [ "tag1", "tag2" ]
```

## unset - Remove a key/value

```
set('key1', { ... }, 'tag1');
set('key2', { ... }, 'tag1');

unset('key1');

const value = get('key1'); // null
const valuesByTag = byTag('tag1'); // { key2: {} }
```

## clear - Remove all key/values and clears all tags

```
set('key1', { ... }, 'tag1');
set('key2', { ... }, 'tag1', 'tag2');

clear();

const value = get('key1'); // null
const allKeyValues = all(); // { }
const allTags = getTags(); // [ ]
```

## Author

- [Mark Zepeda](https://github.com/markario)
