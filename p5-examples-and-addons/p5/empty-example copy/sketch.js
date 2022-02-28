var serial; // initializes the serialport object instance
var portName = '/dev/tty.usbmodem14301' //initializes variable "portName" to be the name of the port connected to my arduino
var xPos;               //initializes variable "xPos" to record the xpos of the joystick
var yPos;               //initializes variable "yPos" to record the xpos of the joystick
var dataarray = [];         //initializes the array "dataarray" that will keep track of data coming over from serial.
var green = 255;          //initializes variable "green" to start at 255
var red = 255;          //initializes variable "red" to start at  255
var blue = 255;          //initializes variable "blue" to start at 255


//** below code is borrowed and altered from class lecture.
function setup() {
    serial = new p5.SerialPort();       // creates a new instance of the serialport
    serial.on('list', printList);       // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing
    
    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
    createCanvas(1200, 800);            // creates a canvas element with dimensions 1200 x 800
    background(0x08, 0x16, 0x40);       // sets background color to the color associated with 0x08, 0x16, 0x40.
}


function printList(portList) {      //printst the list of serial ports
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {     //for the number of ports available
        // Display the list the console:
        print(i + " " + portList[i]);               // print the index of the port and the name of the port.
    }
}

function serverConnected() {            // connects to server
    print('connected to server.');      // prints "connected to server"
}

function portOpen() {                   //opens port
    print('the serial port opened.')    // prints "the serial port opened"
}

function serialError(err) {             // checks for errors
    print('Something went wrong with the serial port. ' + err); // prints "something went wrong with the serial port" and the error code
}
    
function portClose() {                  // closes port
    print('The serial port closed.');   // prints "the serial port closed"
}

function serialEvent() {                // checks if data is available in the serial port
    if (serial.available()) {           // if there is data availale in the serial port
        var datastring = serial.readLine(); // assign the serial line to the variable "datastring"
        var newarray;       //initialize variable newarray
        try {           //try to:
            newarray = JSON.parse(datastring); //parse datastring using JSON and put it into new array
        } catch(err) {      //catch if try fails
        }
        if (typeof(newarray) == 'object') {     //if newarray is an 'object' type
            dataarray = newarray;   //assign dataarray to the object newarray
        }
        //console.log("got back " + datastring + " " + dataarray[0]);
        xPos = dataarray[0];    //assign xPos to the value of the first element of dataarray
        yPos = dataarray[1];    //assign yPos to the value of the first element of dataarray
        //console.log("got back " + datastring + " " + xPos + yPos); Debugging, prints to console the value from the joystick.
    }
}

//** end borrowed from lecture code.

//var xPos;




//function setup() {
//    createCanvas(710, 400);
//    strokeWeight(10);
 //   stroke(147, 0, 183);
//}

function draw() {       //draws based on items in function
    fill(red, green, blue);     //fill of circle is set according to variables red, green, blue
    background(0);              // resets background everytime it is run.
                                // FUN: turn this off to draw!
    ellipse(xPos, yPos, 33, 33);        //draw ellipse based on xPos, ypos, width of 33, height of 33.
}

function keyPressed() {     //checks if key is pressed

    if (keyCode === 82){ // if r is pressed //red
        red = 255;          //assign red to 255.
        green = 45;         //assign green to 45
        blue = 0;           //assign blue to 0
        serial.write('r');
    } else if (keyCode === 79) { // if o is pressed  //orange
        red = 255;          //assign red to 255.
        green = 150;         //assign green to 150
        blue = 0;           //assign blue to 0
        serial.write('o');
    } else if (keyCode === 89) { // if y is pressed   //yellow
        red = 255;          //assign red to 255.
        green = 238;         //assign green to 238
        blue = 0;           //assign blue to 0
        serial.write('y');
    } else if (keyCode === 71) { // if g is pressed   // green
        red = 122;          //assign red to 122.
        green = 177;         //assign green to 177
        blue = 19;           //assign blue to 19
        serial.write('g');
    } else if (keyCode === 66) { // if b is pressed   //blue
        red = 29;          //assign red to 29.
        green = 137;         //assign green to 137
        blue = 220;           //assign blue to 220
        serial.write('b');
    } else if (keyCode === 80) { // if p is pressed   //purple
        red = 117;          //assign red to 117.
        green = 85;         //assign green to 85
        blue = 208;           //assign blue to 208
        serial.write('p');
    }
}





