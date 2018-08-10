const fastify = require('fastify')({
    logger: true
});
const helmet = require('fastify-helmet');

// Ajout de ce parser pour prendre en compte la réponse de type x-www-form-urlencoded
fastify.register(require('fastify-formbody'));

// Ajout de header de sécurité
fastify.register(
    helmet,
    {hidePoweredBy: {}}
);

// Test de la mise en place de l'api
fastify.post('/', async (request, reply) => {
    const {body} = request;

    console.log(body);
    reply.send(body);
});

// Démarrage du serveur.
const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        await fastify.listen(port, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
