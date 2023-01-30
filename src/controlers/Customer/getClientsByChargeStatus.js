const knex = require("../../database/connection");

const getClientsByChargeStatus = async (req, res) => {

    const { status } = req.params;

    if (status !== 'inadimplente' && status !== 'adimplente') return res.status(400).json({ message: 'O status deve ser "adimplente" ou "inadimplente".' });

    try {
        const clientsByChargeStatus = await knex('clients')
            .rightJoin('charges', 'clients.id', 'charges.client_id')
            .distinctOn('clients.id')
            .select(
                'clients.id',
                'clients.cpf',
                'clients.email',
                'clients.phone',
                'clients.charge_status',
                'charges.id as charge_id',
                'clients.name',
                'charges.duedate',
                'charges.value',
            )
            .where({ 'clients.charge_status': `${status === 'adimplente' ? true : false}` });

        return res.status(200).json(clientsByChargeStatus);

    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }
};

module.exports = { getClientsByChargeStatus }