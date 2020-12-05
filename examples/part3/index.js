const app = require("./app");
const config = require("./utils/config");

const PORT = config.PORT;
app.listen(PORT, () => `server running on ${PORT}`);
