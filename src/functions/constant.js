import { SUM_FUNC } from "./base/SUM"
import { AVG_FUNC } from "./base/AVG";
export const ALGO_FUNCTIONS = holder => {
  return {
    "SUM": SUM_FUNC(holder),
    "AVG": AVG_FUNC(holder)
  }
}