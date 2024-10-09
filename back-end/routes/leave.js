const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.get('/getall', (req, res) => {
    pool.query('SELECT * FROM leaves', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});
router.get('/getPendingRequests', (req, res) => {
    pool.query(`
        SELECT 
            leaves.id AS request_id,  -- Leave request ID
            leaves.type, 
            leaves.date_debut, 
            leaves.date_fin, 
            leaves.statut, 
            users.solde_conges, 
            users.nom AS employe_nom,  -- Employee name
            users.id AS employe_id  -- Employee ID
        FROM leaves
        INNER JOIN users ON leaves.employe_id = users.id
        WHERE leaves.statut = $1
    `, ['Pending'], (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});


router.get('/history/:userId', (req, res) => {
        const userId = req.params.userId;
        pool.query(`
            SELECT *, (date_debut + interval '1 day') AS adjusted_date_debut, 
                      (date_fin + interval '1 day') AS adjusted_date_fin
            FROM leaves
            WHERE employe_id = $1 
            Order By date_debut DESC`, [userId], (err, result) => {
            if (!err) {
                res.send(result.rows);
            } else {
                res.status(500).send(err.message);
            }
        });
    });



router.post('/create', (req, res) => {
    const { employe_id, type, date_debut, date_fin, statut } = req.body;
    
    // Ensure that none of the required fields are null or undefined
    if (!employe_id || !type || !date_debut || !date_fin || !statut) {
        return res.status(400).send('All fields are required');
    }

    pool.query(
        'INSERT INTO leaves (employe_id, type, date_debut, date_fin, statut) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [employe_id, type, date_debut, date_fin, statut],
        (err, result) => {
            if (!err) {
                res.status(201).send(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});
router.put('/:id/accept', async (req, res) => {
    const leaveId = req.params.id;

    try {
        const leaveResult = await pool.query('SELECT * FROM leaves WHERE id = $1', [leaveId]);
        const leave = leaveResult.rows[0];

        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        const duration = calculateLeaveDuration(leave.date_debut, leave.date_fin);
        const userResult = await pool.query('SELECT solde_conges FROM users WHERE id = $1', [leave.employe_id]);
        const leaveBalance = userResult.rows[0]?.solde_conges;

        if (leaveBalance === undefined) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (leaveBalance < duration) {
            return res.status(400).json({ message: 'Not enough leave balance', duration, leaveBalance });
        }

        await pool.query('UPDATE leaves SET statut = $1 WHERE id = $2', ['Accepted', leaveId]);
        const newBalance = leaveBalance - duration;
        await pool.query('UPDATE users SET solde_conges = $1 WHERE id = $2', [newBalance, leave.employe_id]);

        res.json({ message: 'Leave request accepted and leave balance updated' });
    } catch (err) {
        console.error('Error accepting leave:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// Function to calculate leave duration
function calculateLeaveDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
}

// Route to refuse a leave request
router.put('/:id/refuse', async (req, res) => {
    const leaveId = req.params.id;

    try {
        // Update the leave request status to 'Refused'
        await pool.query('UPDATE leaves SET statut = $1 WHERE id = $2', ['Refused', leaveId]);

        res.json({ message: 'Leave request refused' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { employe_id, type, date_debut, date_fin, statut } = req.body;
    pool.query(
        'UPDATE leaves SET employe_id = $1, type = $2, date_debut = $3, date_fin = $4, statut = $5 WHERE id = $6 RETURNING *',
        [employe_id, type, date_debut, date_fin, statut, id],
        (err, result) => {
            if (!err) {
                res.send(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM leaves WHERE id = $1 RETURNING *', [id], (err, result) => {
        if (!err) {
            res.send(result.rows[0]);
        } else {
            res.status(500).send(err.message);
        }
    });
});






module.exports = router;