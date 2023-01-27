export function handleErrors (err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({ error: err })
    }
    else if (err.status === 400) {
        res.status(400).send({ error: err })
    }
    console.log(err, "err in controller");
    next(); 
}