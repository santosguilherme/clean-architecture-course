import Segment from "../../ride/Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class SundayFareCalculatorHandler extends FareCalculatorHandler {
  FARE = 2.9;

  handle(segment: Segment): number { 
    if (!segment.isOvernight() && segment.isSunday()) {
      return this.caculate(segment);
    }
    if(!this.next) {
      throw new Error("End of chain");
    }
    return this.next.handle(segment);
  }
}