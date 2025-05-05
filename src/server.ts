import config from "./config/config";
import app from "./app";

app.listen(config.port, () => {
    console.log(`server is running on port:${config.port}`);
});