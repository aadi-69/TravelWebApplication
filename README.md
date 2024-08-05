# TravelAgent Web Application

Welcome to TravelAgent, a web application designed to make your travel planning and sharing experience seamless and enjoyable. Whether you want to post your travel plans, find exciting journeys, or connect with fellow travelers, TravelAgent has got you covered. This README file will guide you through the project setup and provide an overview of the technologies and features integrated into this platform.

## Table of Contents

- [Introduction](#travelagent-web-application)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Contribution](#contribution)

## Features

TravelAgent offers a range of exciting features to enhance your travel experience:

1. **User Authentication:**
   - Create an account using your email, username, and password.
   - Securely store user information in a MongoDB database.

2. **Dashboard:**
   - Access a personalized dashboard upon logging in.
   - Easily navigate between posting and finding travel plans.

3. **Post a Travel Plan:**
   - Share details of your upcoming journey, including the destination, date, and any additional information.
   - Let other travelers find your plans and connect with you.

4. **Find Travel Plans:**
   - Search for travel plans posted by other users.
   - Filter and sort results to discover exciting adventures.

5. **Send/View Requests:**
   - Send connection requests to fellow travelers.
   - View and manage incoming connection requests on the 'Show Requests' page.
   - Approve or decline connection requests from other users.

6. **ThreeJs Integration:**
   - Enjoy an immersive 3D experience with ThreeJs for a unique and interactive user interface.

## Technologies Used

TravelAgent is built using the following technologies:

- **Frontend:**
  - HTML, CSS, JavaScript
  - ThreeJs for 3D graphics

- **Backend:**
  - Node.js for server-side scripting
  - Express.js for API development
  - MongoDB for data storage
  - Mongoose for MongoDB object modeling

- **User Authentication:**
  - Passport.js for authentication strategies

## Getting Started

To get started with TravelAgent on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Omkaarr1/TravelWebApplication.git
   cd TravelWebApplication
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   npm install
   ```

3. Set up a MongoDB database:

   - Create a MongoDB database.
   - Update the database connection URL in the `backend/.env` file.

4. Start the server:

   ```bash
   node server.js
   ```

6. Access the application at `http://localhost:3000` in your web browser.

## Project Structure

The project structure is organized as follows:

- `public/` - Static assets.
- `server.js` - Main application file.

## How to Use

1. **Register/Login:**
   - Start by creating an account or logging in with your credentials.

2. **Dashboard:**
   - Upon successful login, you'll be directed to your dashboard.

3. **Post a Travel Plan:**
   - Click on "Post Travel" to share your travel plans with other users.

4. **Find Travel Plans:**
   - Use the "Find Travel" feature to search for exciting journeys posted by other travelers.

5. **Send/View Requests:**
   - Navigate to the "Show Requests" page to send and manage connection requests.

6. **Enjoy the ThreeJs Experience:**
   - Immerse yourself in an interactive 3D environment while using TravelAgent.

## Contribution
   - Backend, ThreeJs : [Omkar](https://github.com/Omkaarr1)
   - Frontend : [Aaditya Raj](https://github.com/aadi-69)

We welcome and appreciate contributions to enhance TravelAgent. Feel free to fork the project, create pull requests, and report issues. Please review our [Contributing Guidelines](CONTRIBUTING.md) for more details.

We hope you enjoy using TravelAgent for your travel planning and connecting with fellow adventurers. Safe travels and happy coding!

For questions or support, please contact [omkar.2021@vitstudent.ac.in].
