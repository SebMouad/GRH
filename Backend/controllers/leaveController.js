const connection = require('../db');

exports.requestLeave = (req, res) => {
  const { employee_id, start_date, end_date } = req.body;

  // Calculer le nombre de jours de congé demandés
  const days_requested = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;

  // Vérifier le solde de congé de l'employé
  connection.query('SELECT leave_balance FROM employees WHERE id = ?', [employee_id], (err, results) => {
    if (err) return res.status(500).send(err);
    
    const leave_balance = results[0].leave_balance;

    if (days_requested > leave_balance) {
      return res.status(400).send('Solde de congé insuffisant');
    }

    // Insérer la demande de congé
    connection.query('INSERT INTO leaves (employee_id, start_date, end_date, status) VALUES (?, ?, ?, ?)', [employee_id, start_date, end_date, 'pending'], (err, results) => {
      if (err) return res.status(500).send(err);

      // Mettre à jour le solde de congé de l'employé
      const new_leave_balance = leave_balance - days_requested;
      connection.query('UPDATE employees SET leave_balance = ? WHERE id = ?', [new_leave_balance, employee_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Demande de congé soumise avec succès');
      });
    });
  });
};

exports.updateLeaveStatus = (req, res) => {
  const { id, status } = req.body;
  connection.query('UPDATE leaves SET status = ? WHERE id = ?', [status, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Statut de la demande de congé mis à jour');
  });
};

exports.getAllLeaves = (req, res) => {
  connection.query('SELECT * FROM leaves', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
