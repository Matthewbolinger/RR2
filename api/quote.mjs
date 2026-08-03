import { createQuoteHandler } from "../src/lead-intake.mjs";

const handler = createQuoteHandler();

export default {
  fetch(request) {
    return handler(request);
  }
};
