import inject from "../di/Inject";
import Queue from "./Queue";

export default class QueueController {

	constructor (readonly queue: Queue) {
		queue.consume("createPassenger", async (input: any) => {
			// const output = await this.createPassenger?.execute(input);
			// console.log(output);
		});
	}
}