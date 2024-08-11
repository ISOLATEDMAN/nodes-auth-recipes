🍲 Isolated Recipes

Isolated Recipes is a web application that allows users to discover, share, and save their favorite recipes. Built with Node.js, Express.js, EJS, and MongoDB, this app is designed to provide an easy-to-use interface for managing a personal collection of recipes.

🌟 Features

User Authentication: Secure sign-up and login with password encryption.
Recipe Management: Add, edit, and delete recipes from your collection.
Recipe Search: Find recipes by name, ingredients, or cuisine.
Recipe Sharing: Share your recipes with friends and the community.
Responsive Design: Optimized for both desktop and mobile viewing.
Favorite Recipes: Save your favorite recipes for quick access.

🚀 Getting Started

Prerequisites
Node.js (v14 or higher)
MongoDB (Local or Atlas)
Git (for cloning the repository)

Installation - 
Clone the repository:
  git clone https://github.com/yourusername/nodes-auth-recipes.git
  cd nodes-auth-recipes
Install dependencies - 
  npm install
Set up environment variables:
Create a .env file in the root of the project and add the following:
  MONGODB_URL=<your-mongodb-connection-string>
  PORT=3000
Start the application:
  node app.js

📂 Project Structure
isolated-recipes/
├── models/           # Mongoose models
├── routes/           # Express routes
├── views/            # EJS templates
├── public/           # Static files (CSS, JS, images)
├── .env              # Environment variables
├── app.js            # Main application file
└── package.json      # Project metadata and dependencies

