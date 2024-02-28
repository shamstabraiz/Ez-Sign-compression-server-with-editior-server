const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const compressionRoutes = require("./routes/compressRoutes");
const bearerRoutes = require("./routes/rbfaRoutes");
const canvasEditior = require("./routes/canvasEditiorRoutes");

const logger = require("./config/logger");
const httpStatus = require("http-status");

const { errorConverter, errorHandler } = require("./middleware/errorHandler");
const ApiError = require("./utils/ApiError");
const morgan = require("./config/morgan");
const config = require("./config/config");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "100mb"}));

app.use("/v1/compression", compressionRoutes);
app.use("/v1/rbfa", bearerRoutes);
app.use("/v1/canvas", canvasEditior);


app.use(express.static("public"));


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

//proxy

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
});
module.exports = app;
