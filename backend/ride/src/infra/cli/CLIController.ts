import CreatePassenger from "../../application/usecase/CreatePassenger";
import InputOutput from "./InputOutput";

export default class CLIController {
  constructor(inputOutput: InputOutput, createPassenger: CreatePassenger) {
    inputOutput.on("create-passenger", async (params: string) => {
      try {
        const [name, email, document] = params.split(" ");
        const output = await createPassenger.execute({ name, email, document });
        inputOutput.write(JSON.stringify(output));
      } catch (error: any) {
        inputOutput.write(error.message);
      }
    });
  }
}
