import { SUM_FUNC } from "./base/SUM"
import { AVG_FUNC } from "./base/AVG";
import { COUNTIF_FUNC } from "./base/COUNTIF";
// export const ALGO_FUNCTIONS = () => {
//   return {
//     "SUM": SUM_FUNC(),
//     "AVG": AVG_FUNC()
//   }
// }
export const ALGO_FUNCTIONS = {
  "SUM": SUM_FUNC(),
  "AVG": AVG_FUNC(),
  "COUNTIF": COUNTIF_FUNC(),
}