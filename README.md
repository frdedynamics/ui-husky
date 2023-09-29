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

#### Installing rosbridge_suite

Follow guide on [GitHub](https://github.com/RobotWebTools/rosbridge_suite)

### Installation

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

4. **Start rosbridge_suite**

Start `rosbridge_suite` on the robot or on a PC connected to the ROS instance. You can do this by opening a new terminal window and entering the following command:

```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```
This will launch `rosbridge_suite` and allow the application to communicate with the ROS instance.
robot or PC's IP address to the `.env` file. Set the `REACT_APP_IP_ROS` varieble to the IP running of the PC/Robot running the `rosbridge_server` node.

5. **Start a local server**

```bash
npm start
```
The application should now be running in your browser at `http://localhost:3000`.

For others on the same local network to connect to the server, they can use your IP address followed by the port number: `http://<Your-IP-Address>:3000`.

## Environment variable

`.env`: This is where you store environment variables in the application. This file contains the IP address of the PC/Robot running the WebSocket. The default port of the websocket is `9090`. See the `.env`:
 ```
  REACT_APP_IP_ROS = 'IP of rosbride robot/PC'

  REACT_APP_PORT_ROS = '9090'
  REACT_APP_REFRESH_TIMER = 1000
  REACT_APP_GPS_POSITION_TOPIC = '/emlid/fix'
  REACT_APP_GPS_POSITION_TYPE = 'sensor_msgs/NavSatFix'

  REACT_APP_TELE_POSITION_TOPIC = '/cmd_vel'
  REACT_APP_TELE_POSITION_TYPE = 'geometry_msgs/Twist'
  ```

## Running the UI as a server on the Husky platform 

The idea with this section is to explain how I installed this husky_ui on the Husky using a docker image. The end result is the UI always running when the Husky is on and being available on the browser (if you are in the same network of course) at this IP address: **http://192.168.131.1:3000**

Those are the steps I followed: 
1. In the .env file I changed REACT_APP_IP_ROS to '192.168.131.1'
2. Then I created a dockerfile with the needed procedure to make build this ui
   ```
   ccc
   ``` 
4. Then I made an image of this repo with the following commands
   ```
   ccc
   ```
5. Once the image is made, I have to "download" it
   ```
   ccc
   ``` 
6. I then copied this image onto the Husky and loaded the image 
   ```
   ccc
   ```
7. I then created a docker compose file as follows:
   ```
   ccc
   ``` 
8. And finally I ran the docker container
   ```
   ccc
   ``` 


## Roadmap
- [x] Create new repo
- [x] Add README to it
- [x] Making a button for choosing the nav type: waypoint or surface coverage
- [x] Making a button to save the points
- [x] Making a button to start the robot
- [x] Making some solution to manage waypoints: save them, upload them, etc
- [ ] Fixing the initial center on the map problem: it is currently hard coded to hvl, should be the Husky's first gps coordinates
- [x] Uploading the UI on the Husky as a server
- [ ] Fixing the back-end -> communication with husky's navigation stack



