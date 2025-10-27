import { PORT } from "./config/env.js";
import createApp from "./createApp.js";

const app = createApp();

const port = PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
});
