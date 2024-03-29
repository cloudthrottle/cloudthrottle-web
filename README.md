[![Test Suite CI](https://github.com/cloudthrottle/cloudthrottle-web/actions/workflows/testing.yml/badge.svg)](https://github.com/cloudthrottle/cloudthrottle-web/actions/workflows/testing.yml)

# Cloudthrottle: A Web App for Model Railway DCC Control

Cloudthrottle is a web app that lets you control your model railway layouts with Digital Command Control (DCC) from any device with a Chrome-based browser. You can connect your device to your DCC system via USB and access your layout and operate your trains with ease and realism.

DCC is a technology that allows you to send commands to individual locomotives, accessories, and functions on your layout via the rails. You can adjust the speed, direction, lights, sound, and other features of your trains without complex wiring or isolation. You can also program your locomotives with different settings and behaviors to suit your preferences.

Cloudthrottle connects to your DCC system via a simple interface and provides you with a user-friendly dashboard to control your layout. You can create custom throttles, switch points, set routes[^under-development], monitor feedback, and more.

Cloudthrottle works with a command station that is built on an Arduino using the DCC-EX software. [DCC-EX] is a project that aims to provide an easy and inexpensive way to create your own DCC command station using Arduino boards and shields.

If you are a model railway enthusiast who wants to enjoy the benefits of DCC with the convenience of a web app, Cloudthrottle is for you. Try it out today and discover a new way to control your layout.

[DCC-EX]: https://dcc-ex.com/



## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Redux Actions
```mermaid
stateDiagram-v2
COMMAND_RECEIVED
COMMAND_SEND
COMMAND_PARSED_SUCCESS
COMMAND_PARSED_FAILED
THROTTLE_COMMAND_PARSED
ROSTER_ITEM_COMMAND_PARSED
COMMAND_WRITE
SET_COMMUNICATIONS_WRITER
COMMUNICATIONS_CONNECTED
COMMUNICATIONS_DISCONNECTED
ROSTER_ITEM_UPDATED
NEW_LOCO_FORM_SUBMIT
ADD_OR_UPDATE_LOCO
USER_CHANGED_SPEED
USER_CHANGED_DIRECTION
USER_STOP_LOCO
USER_EMERGENCY_STOP_LOCO
USER_EMERGENCY_STOP
USER_CHANGED_BUTTON_VALUE
USER_UPDATE_THROTTLE_STATE
UPDATE_THROTTLE_STATE
CREATE_THROTTLE_COMMAND
CREATE_EMERGENCY_STOP_COMMAND

state is_success <<choice>>
COMMAND_RECEIVED --> is_success
is_success --> COMMAND_PARSED_SUCCESS : "parsed successfully"
is_success --> COMMAND_PARSED_FAILED : "failed to parse"

state command_type <<choice>>
COMMAND_PARSED_SUCCESS --> command_type
command_type --> THROTTLE_COMMAND_PARSED : "is throttle command"
command_type --> ROSTER_ITEM_COMMAND_PARSED : "is roster item command"
command_type --> POWER_COMMAND_PARSED : "is power command"
command_type --> DECODER_READ_ADDRESS_COMMAND_PARSED : "is address read command"
command_type --> TURNOUT_COMMAND_PARSED : "is turnout item command"
command_type --> TURNOUT_DCC_COMMAND_PARSED : "is DCC turnout item command"

COMMAND_SEND --> COMMAND_WRITE
state writer_available <<choice>>
SET_COMMUNICATIONS_WRITER --> writer_available
writer_available --> COMMUNICATIONS_CONNECTED : "writer available"
writer_available --> COMMUNICATIONS_DISCONNECTED : "writer not available"

ROSTER_ITEM_COMMAND_PARSED --> ROSTER_ITEM_UPDATED
ROSTER_ITEM_UPDATED --> ADD_OR_UPDATE_LOCO

NEW_LOCO_FORM_SUBMIT --> ADD_OR_UPDATE_LOCO
USER_CHANGED_SPEED --> USER_UPDATE_THROTTLE_STATE

USER_CHANGED_DIRECTION --> USER_UPDATE_THROTTLE_STATE
USER_STOP_LOCO --> USER_CHANGED_SPEED

USER_EMERGENCY_STOP_LOCO --> USER_CHANGED_SPEED
USER_UPDATE_THROTTLE_STATE --> UPDATE_THROTTLE_STATE
USER_UPDATE_THROTTLE_STATE --> CREATE_THROTTLE_COMMAND

CREATE_THROTTLE_COMMAND --> COMMAND_SEND
CREATE_EMERGENCY_STOP_COMMAND --> COMMAND_SEND

USER_EMERGENCY_STOP --> UPDATE_THROTTLE_STATE : multiple
USER_EMERGENCY_STOP --> CREATE_EMERGENCY_STOP_COMMAND


USER_CHANGED_BUTTON_VALUE --> USER_UPDATE_FUNCTION_BUTTON_STATE
USER_UPDATE_FUNCTION_BUTTON_STATE --> UPDATE_FUNCTION_BUTTON_STATE
USER_UPDATE_FUNCTION_BUTTON_STATE --> CREATE_CAB_COMMAND
CREATE_CAB_COMMAND --> COMMAND_SEND

USER_RESET_STATE
USER_CLEAR_LOCAL_STORAGE
USER_RESET_AND_CLEAR_DATA

USER_RESET_AND_CLEAR_DATA --> USER_RESET_STATE
USER_RESET_AND_CLEAR_DATA --> USER_CLEAR_LOCAL_STORAGE

USER_IMPORTS_SETTINGS
USER_IMPORTS_SETTINGS --> IMPORT_LOCOS
USER_IMPORTS_SETTINGS --> IMPORT_MAPS
IMPORT_LOCOS --> ADD_OR_UPDATE_LOCO : multiple
IMPORT_MAPS --> ADD_OR_UPDATE_MAP : multiple

POWER_COMMAND_PARSED --> UPDATE_POWER_STATE

USER_CHANGED_POWER --> UPDATE_POWER_STATE
USER_CHANGED_POWER --> CREATE_POWER_COMMAND
CREATE_POWER_COMMAND --> COMMAND_SEND

USER_DECODER_READ_ADDRESS --> CREATE_DECODER_READ_ADDRESS_COMMAND
CREATE_DECODER_READ_ADDRESS_COMMAND --> COMMAND_SEND

DECODER_READ_ADDRESS_COMMAND_PARSED --> UPDATE_LAST_READ_ADDRESS_STATE 

COMMAND_SEND --> ADD_COMMAND_TO_LOG
COMMAND_RECEIVED --> ADD_COMMAND_TO_LOG

NEW_TURNOUT_FORM_SUBMIT
ADD_OR_UPDATE_TURNOUT
USER_POPULATE_TURNOUTS
CREATE_DEFINE_TURNOUT_COMMAND

NEW_TURNOUT_FORM_SUBMIT --> ADD_OR_UPDATE_TURNOUT
NEW_TURNOUT_FORM_SUBMIT --> CREATE_DEFINE_TURNOUT_COMMAND
CREATE_DEFINE_TURNOUT_COMMAND --> COMMAND_SEND
USER_POPULATE_TURNOUTS --> COMMAND_SEND

TURNOUT_COMMAND_PARSED --> ADD_OR_UPDATE_TURNOUT
TURNOUT_DCC_COMMAND_PARSED --> ADD_OR_UPDATE_TURNOUT
```
