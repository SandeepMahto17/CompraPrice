
# CompraPrice







This web application allows users to search for different products (like mobile phones and laptops) across multiple e-commerce websites (Amazon, Flipkart) and sort them according to price. The application also includes a registration page with 3D hover effects.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 
- npm (Node Package Manager)
- Git (for cloning the repository)
## Installation

```bash
  cd CompraPrice
  npx create-react-app client
  npm install react-router-dom
  mkdir server
```

Install Server Dependencies
```bash
  cd server
  npm init -y
  npm install express axios cheerio cors
```
Install Client Dependencies
```bash
  cd ../client
  npm install
  npm install axios
```

Start the Node.js server
```bash
  cd server
  node index.js
```
Start the React development server
```bash
  cd client
  npm start
```
Note:Both the terminal should be Running together 

