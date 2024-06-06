-- Schema for the employee management system

-- Create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department VARCHAR(100) NOT NULL,
  role ENUM('admin', 'employee', 'department_head') NOT NULL,
  password VARCHAR(255) NOT NULL,
  leave_balance INT DEFAULT 0
);

-- Create leaves table
CREATE TABLE leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Insert demo data into employees table
INSERT INTO employees (name, email, department, role, password, leave_balance) VALUES
('John Doe', 'john.doe@example.com', 'IT', 'employee', 'password123', 10),
('Jane Smith', 'jane.smith@example.com', 'HR', 'department_head', 'password456', 15),
('Alice Johnson', 'alice.johnson@example.com', 'Finance', 'employee', 'password789', 20),
('Bob Brown', 'bob.brown@example.com', 'IT', 'admin', 'adminpassword', 30);

-- Insert demo data into leaves table
INSERT INTO leaves (employee_id, start_date, end_date, status) VALUES
(1, '2024-06-10', '2024-06-15', 'approved'),
(2, '2024-07-01', '2024-07-10', 'pending'),
(3, '2024-08-05', '2024-08-10', 'rejected'),
(1, '2024-09-15', '2024-09-20', 'approved');
