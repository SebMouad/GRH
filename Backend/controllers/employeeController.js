const connection = require('../db');

exports.addEmployee = (req, res) => {
  const { name, email, department, role, password, leave_balance } = req.body;
  connection.query('INSERT INTO employees (name, email, department, role, password, leave_balance) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, email, department, role, password, leave_balance], 
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Employee added successfully');
    }
  );
};

exports.updateEmployee = (req, res) => {
  const { id, name, email, department, role, password, leave_balance } = req.body;
  connection.query('UPDATE employees SET name = ?, email = ?, department = ?, role = ?, password = ?, leave_balance = ? WHERE id = ?', 
    [name, email, department, role, password, leave_balance, id], 
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Employee updated successfully');
    }
  );
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Employee deleted successfully');
  });
};

exports.getEmployee = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
};

exports.getAllEmployees = (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};
