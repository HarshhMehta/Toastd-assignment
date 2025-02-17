# Assignment: scrolling-app ReactJs

## Project Overview

A modern, responsive application that provides an Instagram Reels-like scrolling experience for video content. The app features smooth snap scrolling between full-screen video reels, automatic playback based on visibility, and an intuitive user interface for both mobile and desktop users..

## To achieve this, I combined several techniques:

- CSS Snap Scrolling: Utilized scroll-snap-type: y mandatory to create the base snap behavior
- Custom Scroll Handler: Implemented a JavaScript scroll handler that prevents default scroll behavior and enforces full-reel scrolling
- Cooldown Mechanism: Added a timeout between scroll actions (500ms) to prevent rapid scrolling that would break the experience
- Touch Support: Added specific touch event handlers for mobile devices with swipe detection

### facing issues
- Smooth scrolling transitions bw reels


## Getting Started

### 1. Clone the Repository

```sh
git https://github.com/HarshhMehta/Toastd-assignment.git
cd Toastd-assignment
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Development Server

```sh
npm run dev
```
 This will start the Vite development server. Open http://localhost:5173 in your browser to view the application.

### 4. Folder Structure

```sh
├── src
│   ├── components    # Reusable UI components
│   ├── App.jsx       # Root component
│   ├── main.jsx      # Entry point
│   ├── App.css       # Global styles
│   ├── index.css     # Additional styles
├── public            # Static assets
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency lock file
├── README.md         # Documentation
├── vite.config.js    # Vite configuration

```
 
#### GitHub Repo: https://github.com/HarshhMehta/Toastd-assignment.git
#### Live Demo: https://scrolling-web-app.vercel.app/
