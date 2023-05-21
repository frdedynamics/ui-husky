# ui-husky

This project provides a user interface developed specifically for the Husky mobile robot. It comes with an interactive map on one page, where the robot's work area can be defined by the user. The map dynamically displays the position and movements of the robot

Another feature of this application is a dedicated control page. Here, the user can manipulate the robot's movements using a virtual joystick. This design allows for intuitive, real-time control over the robot, making it a user-friendly tool for managing the Husky mobile robot

## Getting Started

### Prerequisites

Here are the essential prerequisites you need to install this software:

- Node.js
- npm
- Robot or PC running `rosbridge_suite`

#### Installing Node.js and npm

You can download Node.js and npm directly from the [official Node.js website](https://nodejs.org).

#### INstalling rosbridge_suite

Follow guide on [GitHub](https://github.com/RobotWebTools/rosbridge_suite)

### Instalation

1. **Clone the repo**

```bash
git clone https://github.com/Axo-xD/ui-husky.git
```
2. **Navigate to the project**

```bash
cd ui-husky
```
3. **Install NPM packages**

```bash
npm install
```
4. **Start a local server**

```bash
npm start
```
The application should now be running in your browser at `http://localhost:3000`.

For others on the same local network to connect to the server, they can use your IP address followed by the port number: `http://<Your-IP-Address>:3000`.

## Important Files

Here's a list of important files and their purposes:

- `.env`: This is where you store environment variables that are intended to be used in the application. This file contains the IP address of the PC/Robot running the WebSocket


