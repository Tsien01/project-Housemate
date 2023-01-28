export function handleErrors (err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({ error: err })
    }
    else if (err.status === 400) {
        res.status(400).send({ error: err })
    }
    else if (err.status === 401) {
        res.status(401).send({ error: err })
    } else if (err._message === 'household validation failed'){
        res.status(400).send({error: {message: "400 Bad Request"}})
    } else {
        console.log(err, "err in controller");
    }
    next(); 
}