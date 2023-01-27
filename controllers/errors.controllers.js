"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
function handleErrors(err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({ error: err });
    }
    else if (err.status === 400) {
        res.status(400).send({ error: err });
    }
    else if (err.status === 401) {
        res.status(401).send({ error: err });
    }
    console.log(err, "err in controller");
    next();
}
exports.handleErrors = handleErrors;
//# sourceMappingURL=errors.controllers.js.map