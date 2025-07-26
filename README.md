<div align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/e047f3b5-8968-466d-8848-18e0018dd27b" alt="VSI Banner" width="600"/>
  <h1 align="center">VSI - Vision Student Interface</h1>
  <p align="center">
    A modern, fast, and secure interface for fetching real-time student attendance from the IARE Samvidha portal.
  </p>
  
  <p align="center">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </p>
</div>

---

## ✨ Key Features

-   **🖥️ Modern UI/UX:** A clean, responsive, and intuitive interface built with React and Tailwind CSS.
-   **⚡ Real-time Data:** Fetches live attendance directly from the Samvidha portal upon login. No stale data.
-   **🧠 Smart Caching:** Successful fetches are cached for 15 minutes, providing near-instant subsequent loads.
-   **🔐 Secure & Private:** Your credentials are used only for the single login session and are never stored. The entire process happens ephemerally on the server.
-   **📊 Detailed Analytics:** Automatically calculates and visualizes subject-wise and overall attendance percentages.
-   **🤖 Optimized Scraping:** The Puppeteer backend is highly optimized to be fast and efficient, skipping unnecessary assets like images and CSS.
-   **📦 All-in-One Server:** A single Node.js server runs both the backend API and serves the React frontend, simplifying deployment.

## 🛠️ Technology Stack

| Technology      | Description                                      |
| --------------- | ------------------------------------------------ |
| **Frontend**    | `React`, `TypeScript`, `Tailwind CSS`, `Framer Motion` |
| **Backend**     | `Node.js`, `Express`                               |
| **Scraping**    | `Puppeteer`                                      |
| **Deployment**  | `Render`, `Vercel`, `Railway` (or any Node.js host)  |

## 🚀 Getting Started

Follow these instructions to run the VSI application on your local machine for development and testing.

### Prerequisites

You must have **Node.js** installed on your system. It's recommended to use the latest LTS (Long-Term Support) version.
- [Download Node.js](https://nodejs.org/)

### 1. Set Up the Project

Clone or download the project files into a folder on your computer.

### 2. Configure Environment Variables

Create a new file named `.env` in the root of your project folder and add the following content. This step is optional but recommended.

```bash
# The port the server will run on
PORT=3000

# Set to 'production' for headless mode and performance, 'development' to see the browser
NODE_ENV=development

# (Optional) Timeout for Puppeteer operations in milliseconds
# PUPPETEER_TIMEOUT=30000

# (For some deployment platforms) Path to pre-installed Chrome
# PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
```

### 3. Install Dependencies

Open your terminal, navigate to the project directory, and run:

```bash
npm install
```

This will download all the necessary packages for both the backend and frontend.

### 4. Run the Application

Start the server with this command:

```bash
npm start
```

You should see output confirming the server is running: `🚀 VSI server running on port 3000`.

### 5. Access the App

Open your web browser and navigate to:

**`http://localhost:3000`**

The VSI application is now running locally!

## ☁️ Deployment

This full-stack application is designed for easy deployment on modern hosting platforms.

### Deploying on Render

Render is an excellent choice for hosting Node.js applications with web scraping capabilities.

1.  **Fork this repository** to your GitHub account.
2.  Go to the [Render Dashboard](https://dashboard.render.com/) and create a new **Web Service**.
3.  Connect your forked GitHub repository.
4.  Configure the settings:
    -   **Environment:** `Node`
    -   **Build Command:** `npm install`
    -   **Start Command:** `npm start`
5.  Add your environment variables from the `.env` file under the "Environment" tab. For production, set `NODE_ENV` to `production`.
6.  Click **Create Web Service**. Render will build and deploy your application.

> **Note on Puppeteer on Render:** You may need to add a `PUPPETEER_EXECUTABLE_PATH` environment variable pointing to the pre-installed Chrome on Render's instances. Refer to Render's documentation for the correct path.

### Deploying on Vercel/Netlify

These platforms are primarily for static frontends and serverless functions. Deploying a stateful server with Puppeteer can be complex. For this project, a persistent server environment like **Render** or **Railway** is recommended.

## 🤔 Troubleshooting

-   **Slow initial load:** The first data fetch for a user involves a live login and scrape, which can take 5-15 seconds depending on the Samvidha portal's speed. Subsequent loads within 15 minutes will be instant due to caching.
-   **`Invalid credentials` error:** Double-check your user ID and password. The app is accurately reporting a login failure from the Samvidha portal.
-   **`Request Timeout` error:** The Samvidha portal may be under heavy load or temporarily down. Please try again after a few minutes.
-   **Installation issues on Apple M1/M2/M3 chips:** If `npm install` fails on Puppeteer, it might be a Chromium download issue. Ensure you have Rosetta 2 installed or check Puppeteer's documentation for M-series chip support.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-repo/vsi/issues).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

*This project is a personal tool created for educational purposes and is not affiliated with Samvidha or IARE.*