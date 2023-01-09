const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

const cors = require("cors");
// const useragent = require("express-useragent");

app.use(cors.apply());
app.use(express.json());
// app.use(useragent.express());

const {
    createRequestId,
    logRequests,
    ipMiddleware,
    // getIPGeolocationDetails,
    getIPGeolocationDetailsV2,
    getUserAgentInformation,
} = require("./middlewares");

app.use(createRequestId);
app.use(logRequests);
app.use(ipMiddleware);
// app.use(getIPGeolocationDetails);
app.use(getIPGeolocationDetailsV2);
app.use(getUserAgentInformation);

/**
 * Routers
 */

const { offersRouter } = require("./Routers");

app.use("/app/", offersRouter);

const RequestHandler = require("./RequestHandler");

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));

/**
 * Other routes are recorded as 404
 */

app.get("*", (req, res) => {
    RequestHandler.sendErrorMessage(
        req.requestId,
        res,
        404,
        "The GET route you are trying to reach is not available"
    );
});

app.post("*", (req, res) => {
    RequestHandler.sendErrorMessage(
        req.requestId,
        res,
        404,
        "The POST route you are trying to reach is not available"
    );
});

app.put("*", (req, res) => {
    RequestHandler.sendErrorMessage(
        req.requestId,
        res,
        404,
        "The PUT route you are trying to reach is not available"
    );
});
app.patch("*", (req, res) => {
    RequestHandler.sendErrorMessage(
        req.requestId,
        res,
        404,
        "The PATCH route you are trying to reach is not available"
    );
});

app.delete("*", (req, res) => {
    RequestHandler.sendErrorMessage(
        req.requestId,
        res,
        404,
        "The DELETE route you are trying to reach is not available"
    );
});
