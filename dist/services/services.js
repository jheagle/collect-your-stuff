"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;
var _parseTree = require("./parseTree");
var _parseTreeNext = require("./parseTreeNext");
/**
 * some useful resources when working with collections.
 */

/**
 * List helpful functions when dealing with collections.
 */
const services = exports.services = {
  parseTree: _parseTree.parseTree,
  parseTreeNext: _parseTreeNext.parseTreeNext
};