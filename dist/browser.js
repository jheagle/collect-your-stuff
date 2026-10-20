"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _main = require("./main");
Object.keys(_main).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _main[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _main[key];
    }
  });
});