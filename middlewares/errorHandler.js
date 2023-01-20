exports.errorHandler = (err, req, res, next) => {
    // console.log(err._message);
    // console.log(err.name);
    // console.log(err.message);
    // console.log(err);

    /* Erreur mongoose
    {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Path `name` is required.",
                "properties": {
                    "message": "Path `name` is required.",
                    "type": "required",
                    "path": "name"
                },
                "kind": "required",
                "path": "name"
            }
        },
        "_message": "Game validation failed",
        "name": "ValidationError",
        "message": "Game validation failed: name: Path `name` is required."
    }
    */

    /* Error dans l'api pour l'instant
    {
        "name": "Error",
        "message": "Jeu introuvable"
        "statusCode": 400
    }
    */

    // Si _message n'est pas présent, on est sur une de nos erreurs
    // Si _message est présent, on est sur une erreur de validation de mongoose
    if (!err._message) {
        return res.status(err.statusCode || 500).json(err.message);
    }

    res.status(500).json(err);
};
