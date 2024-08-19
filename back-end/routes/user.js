const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { nom, poste, departement, email, date_d_embauche, mot_de_passe } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        
        const result = await pool.query(
            'INSERT INTO users (nom, poste, departement, email, date_d_embauche, mot_de_passe) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nom, poste, departement, email, date_d_embauche, hashedPassword]
        );

        res.status(201).send(result.rows[0]);
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            
            const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

            if (match) {
                res.json({
                    id: user.id,
                    nom: user.nom,
                    email: user.email,
                    role: user.poste,
                    departement: user.departement,
                    date_d_embauche: user.date_d_embauche
                });
            } else {
                res.status(401).send('Invalid email or password');
            }
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getall', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});

router.get('/getById/:id', (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (!err) {
            if (result.rows.length > 0) {
                res.send(result.rows[0]); 
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});




router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { nom, poste, departement, email, date_d_embauche, solde_conges } = req.body;
    pool.query(
      'UPDATE users SET nom = $1, poste = $2, departement = $3, email = $4, date_d_embauche = $5, solde_conges = $6 WHERE id = $7 RETURNING *',
      [nom, poste, departement, email, date_d_embauche, solde_conges, id],
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
    pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (err, result) => {
        if (!err) {
            res.send(result.rows[0]);
        } else {
            res.status(500).send(err.message);
        }
    });
});





module.exports=router;