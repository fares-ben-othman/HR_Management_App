const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Register route
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { nom, poste, departement, email, date_d_embauche, mot_de_passe } = req.body;
    const profileImage = req.file ? req.file.filename : null; // Get the uploaded image filename

    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const result = await pool.query(
            'INSERT INTO users (nom, poste, departement, email, date_d_embauche, mot_de_passe, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nom, poste, departement, email, date_d_embauche, hashedPassword, profileImage]
        );

        res.status(201).send(result.rows[0]);
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
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

// Get all users route
router.get('/getall', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            const users = result.rows.map(user => ({
                ...user,
                profile_image_url: user.profile_image ? `${req.protocol}://${req.get('host')}/images/${user.profile_image}` : null
            }));
            res.send(users);
        } else {
            res.status(500).send(err.message);
        }
    });
});

// Get user by ID route
router.get('/getById/:id', (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (!err) {
            if (result.rows.length > 0) {
                const user = result.rows[0];
                user.profile_image_url = user.profile_image ? `${req.protocol}://${req.get('host')}/images/${user.profile_image}` : null;
                res.send(user);
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

// Update user route
router.put('/update/:id', upload.single('profileImage'), async (req, res) => {
    const id = req.params.id;
    const { nom, poste, departement, email } = req.body;
    const profileImage = req.file ? req.file.filename : req.body.profile_image;

    try {
        const result = await pool.query(
            'UPDATE users SET nom = $1, poste = $2, departement = $3, email = $4,profile_image = $5 WHERE id = $6 RETURNING *',
            [nom, poste, departement, email, profileImage, id]
        );
        res.send(result.rows[0]);
    } catch (err) {
        console.error('Error updating employee:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// Delete user route
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




module.exports = router;
