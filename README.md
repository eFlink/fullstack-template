# FlinkStack

This template is designed to jumpstart your full-stack development process using Node.js, Supabase, and other modern development tools. It streamlines the setup for both the backend and frontend, allowing you to focus on building your application.

## Getting Started

### Prerequisites
- Node.js installed on your machine
- A Supabase account and project

## Installation
### 1. Clone the Repository

Start by cloning this repository to your local machine:

```
git clone https://github.com/eFlink/fullstack-template.git
cd fullstack-template
```

### 2. Install Dependencies
Inside the project directory, install the necessary Node.js dependencies:
```
Copy code
pnpm install
```
### 3. Set Up Supabase

Sign in to your Supabase account and create a new project if you haven't already.
Navigate to the Supabase project dashboard and take note of the anon public key and the URL.

### 4. Configure Environment Variables

Copy the .env.example file to a new file named .env:
```
cp .env.example .env
```
Fill in the .env file with your Supabase project details


### 5. Initialize the Database

Use the following command to push your database schema to Supabase:

```
pnpm db:push
```

### 6. Start the Development Server

Finally, run the development server with:

```
pnpm dev
```
Your application should now be running and accessible locally.
