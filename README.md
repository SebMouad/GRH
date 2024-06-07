
# Gestion des Ressources Humaines (GRH)

Cette API permet de gérer les employés et les demandes de congé pour une entreprise.

## Prérequis

Assurez-vous que le serveur est en cours d'exécution.

## Variables d'Environnement

Ajoutez les variables d'environnement suivantes à un fichier `.env` :

Backend :

DB_HOST=mysql-1022bd89-gestion-rh.g.aivencloud.com
DB_PORT=21379
DB_USER=avnadmin
DB_PASSWORD=AVNS_e6LuKtqbRUj82Gv1JNn
DB_DATABASE=defaultdb

Frontend :

REACT_APP_API_BASE_URL=https://grh-api.vercel.app/api

## Installation

Clonez le dépôt et installez les dépendances :

git clone https://github.com/sebmouad/GRH.git 
cd GRH/Backend 
npm install 

## Tester l'API avec `curl`

### Ajouter un Employé

- **URL:** `https://grh-api.vercel.app/api/employees/add`
- **Méthode:** POST
- **Commande `curl`:**

curl -X POST https://grh-api.vercel.app/api/employees/add \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "department": "IT",
  "role": "employee",
  "password": "password123",
  "leave_balance": 20
}'

### Modifier un Employé

- **URL:** `https://grh-api.vercel.app/api/employees/update`
- **Méthode:** PUT
- **Commande `curl`:**

curl -X PUT https://grh-api.vercel.app/api/employees/update \
-H "Content-Type: application/json" \
-d '{
  "id": 1,
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "department": "HR",
  "role": "employee",
  "password": "newpassword123",
  "leave_balance": 25
}'

### Supprimer un Employé

- **URL:** `https://grh-api.vercel.app/api/employees/delete/1`
- **Méthode:** DELETE
- **Commande `curl`:**

curl -X DELETE https://grh-api.vercel.app/api/employees/delete/1

### Obtenir les Informations d'un Employé

- **URL:** `https://grh-api.vercel.app/api/employees/1`
- **Méthode:** GET
- **Commande `curl`:**

curl https://grh-api.vercel.app/api/employees/1

### Obtenir Tous les Employés

- **URL:** `https://grh-api.vercel.app/api/employees`
- **Méthode:** GET
- **Commande `curl`:**

curl https://grh-api.vercel.app/api/employees

### Demander un Congé

- **URL:** `https://grh-api.vercel.app/api/leaves/request`
- **Méthode:** POST
- **Commande `curl`:**

curl -X POST https://grh-api.vercel.app/api/leaves/request \
-H "Content-Type: application/json" \
-d '{
  "employee_id": 1,
  "start_date": "2024-06-10",
  "end_date": "2024-06-15"
}'

### Mettre à Jour le Statut d'une Demande de Congé

- **URL:** `https://grh-api.vercel.app/api/leaves/update-status`
- **Méthode:** PUT
- **Commande `curl`:**

curl -X PUT https://grh-api.vercel.app/api/leaves/update-status \
-H "Content-Type: application/json" \
-d '{
  "id": 1,
  "status": "approved"
}'

### Obtenir Toutes les Demandes de Congé

- **URL:** `https://grh-api.vercel.app/api/leaves`
- **Méthode:** GET
- **Commande `curl`:**

curl https://grh-api.vercel.app/api/leaves
