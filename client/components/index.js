/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as AllBurgers} from './BurgerList/all-burgers';
export {default as Header} from './header';
export {default as BurgerForm} from './burger-form';
