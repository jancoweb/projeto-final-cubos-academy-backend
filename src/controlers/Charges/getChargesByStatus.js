const knex = require("../../database/connection");

const getChargesByStatus = async (req, res) => {
    const { status } = req.params;

    if (status !== 'vencidas' && status !== 'previstas' && status !== 'pagas') return res.status(400).json({ message: 'O status das cobranças devem ser "pagas" ou "vencidas" ou "previstas"' })

    const currentDate = new Date();

    try {
        const charges = await knex(`charges`)
            .leftJoin('clients', 'charges.client_id', 'clients.id')
            .select(
                'charges.client_id',
                'clients.name',
                'charges.description',
                'clients.charge_status',
                'charges.id',
                'charges.value',
                'charges.duedate',
                'charges.status',
            );


        const overdueCharges = charges.filter(charge => {
            return currentDate > charge.duedate && !charge.status;
        });

        const expectedCharges = charges.filter(charge => {
            return currentDate < charge.duedate && !charge.status;
        });

        const paidCharges = charges.filter(charge => {
            return charge.status;
        });

        return res.status(200).json(
            status === 'vencidas' ? overdueCharges
                : status === 'previstas' ? expectedCharges
                    : paidCharges
        );

    } catch (error) {
        return res.status(400).json({ message: `${error.message}` })
    }
}

module.exports = { getChargesByStatus }