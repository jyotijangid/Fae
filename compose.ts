import pipe from "./pipe.ts"
import { Func } from "./utils/types.ts"
import reverse from "./reverse.ts"

/**
 * Performs a right-to-left function composition.
 * The last function may have any number of arguments;
 * the remaining must have single argument.
 * **Note:** The returned function is automatically curried
 * 
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = Fae.compose((x: string) => x.toUpperCase(), classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      Fae.compose(Math.abs, Fae.add(1), Fae.multiply(2))(-4) //=> 7
 */
export default function compose(this: any, ...functions: Func[]) {
  return pipe.apply(this, reverse(functions) as Parameters<typeof pipe>)
}