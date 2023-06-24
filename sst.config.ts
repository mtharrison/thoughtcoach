import { SSTConfig } from "sst";
import { DefaultStack } from "./stacks/DefaultStack";

export default {
  config(_input) {
    return {
      name: "thought-coach",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(DefaultStack);
    
  }
} satisfies SSTConfig;
