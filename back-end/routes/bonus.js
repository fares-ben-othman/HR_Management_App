const express = require('express');
const router = express.Router();
const pool = require('../connection');



router.get('/getAllBonuses', (req, res) => {
    pool.query('SELECT * FROM bonuses', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});


router.post('/add', (req, res) => {
    const { employe_id, type, montant, date_d_attribution } = req.body;
    pool.query(
        'INSERT INTO bonuses (employe_id, type, montant, date_d_attribution) VALUES ($1, $2, $3, $4) RETURNING *',
        [employe_id, type, montant, date_d_attribution],
        (err, result) => {
            if (!err) {
                res.status(201).send(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});
router.get('/getBonusesByEmployee/:employeId', (req, res) => {
    const { employeId } = req.params;
    pool.query(
      'SELECT * FROM bonuses WHERE employe_id = $1 Order by date_d_attribution DESC',
      [employeId],
      (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
  

router.put('/updateBonus/:id', (req, res) => {
    const id = req.params.id;
    const { type, montant, date_d_attribution } = req.body;
    pool.query(
        'UPDATE bonuses SET type = $1, montant = $2, date_d_attribution = $3 WHERE id = $4 RETURNING *',
        [type, montant, date_d_attribution, id],
        (err, result) => {
            if (!err) {
                res.send(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});


router.delete('/deleteBonus/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM bonuses WHERE id = $1 RETURNING *', [id], (err, result) => {
        if (!err) {
            res.send(result.rows[0]);
        } else {
            res.status(500).send(err.message);
        }
    });
});

module.exports = router;
