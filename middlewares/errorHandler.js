exports.errorHandler = (err, req, res, next) => {
    console.log(err._message);
    console.log(err.name);
    console.log(err.message);
    console.log(err)

    //Voir si possible d'unifier les messages d'erreur pour une meilleure gestion d'erreur

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
    }
    */

    res.status(500).json(err);
};
