# Health Care for FIU

## Project Overview

Health Care for FIU is a web-based directory designed to help Florida International University (FIU) students and faculty find healthcare resources in one centralized location. The application makes healthcare information easier to discover by bringing together resources that may otherwise be spread across different websites.

## Objectives

- Centralize healthcare resource information for the FIU community.
- Allow users to search for healthcare resources.
- Filter resources by category and intended audience.
- Provide access to official healthcare resource websites.
- Make healthcare information easier to navigate and access.

## Features

- Browse a directory of healthcare resources.
- Search resources by relevant terms.
- Filter resources by category.
- Filter resources by audience, including students and faculty.
- View resource information and follow official links.

## Technologies Used

- **HTML:** Web page structure.
- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web server framework.
- **MongoDB:** Database for healthcare resource information.
- **dotenv:** Loads configuration values from environment variables.

## Getting Started

### Prerequisites

Install Node.js and npm. You will also need access to a MongoDB database configured for the application.

### Installation

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install the project dependencies:

   `npm install`

4. Create a `.env` file in the project directory and configure the required environment variables:

   `MONGODB_URI=your_mongodb_connection_string`

   `PORT=3000`

5. Start the application:

   `npm start`

6. Open `http://localhost:3000` in your browser.

## Configuration and Security

Keep database connection strings and other secrets in the `.env` file. Do not commit `.env` or share database credentials publicly. The `.gitignore` file excludes `.env` and `node_modules/` from version control.

## Project Scope

The application currently focuses on helping users discover healthcare resources. Features described in project planning documents that are not implemented should be considered future enhancements rather than existing functionality.

## Team

CEN5011 Group 03
