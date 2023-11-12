/**
 * @file sample classes which follow a pattern (have certain members or methods).
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import ArrayIterator from './ArrayIterator';
import Runnable from './Runnable';
/**
 * List of class declarations that can be used to specify attributes for a style of object / class.
 */
declare const recipes: {
    ArrayIterator: typeof ArrayIterator;
    Runnable: typeof Runnable;
};
export default recipes;
