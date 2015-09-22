# babel-plugin-stylus

Replace import declarations of **Stylus** files to its parsed **CSS**:

```js
import style from './Component.styl'
```

to

```js
var style = '.Component {\n  font-family: \'Lucida Grande\';\n  color: #3d9970;\n  font-size: 24px;\n}\n';
```


## Install

```
npm i babel-plugin-stylus --save-dev
```

## Usage

```
babel --plugins babel-plugin-stylus src/ --out-dir lib
```

## Changelog

### 1.0.0

* First release :tada:

