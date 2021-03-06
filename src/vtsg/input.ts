
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   input.ts
*       Pathname:   vtsg/input.ts
*       Content:    Primary file for Keyboard and Mouse input
*
*       License:    MIT License
*
*       Author:     Simon From Jakobsen
*       Email:      simonfromjakobsen@gmail.com
*       GitHub:     SimonFJ20
*
*       Created:    17-02-2021
*       Last Edit:  01-03-2021
*/

import { Position } from "./objects";
import { Render } from "./render";


/*
*   TODO:
*   *   JSDoc comment public elements 
*
*/

// keyboard input class
// class is mostly static, because most use cases doesn't/shouldn't need more than one instance
// uses keyCode wich is deprecated
// uses the window not the canvas for event listeners
export class KeyInput {



    // contains all keys as KeyEvent.keyCode (deprecated) and if they are pressed
    public static pressed: Array<boolean>;

    // contains last key pressed as KeyEvent.key
    public static key: string;

    // contains las key pressed if key length is 1
    // fx 'a', '1', '*', and not 'Space', 'RightArrow'
    public static char: string;



    // initialize the class
    // the static equivelent of a constructor
    public static init = (): void => {

        // 256 to fit all keys, probably too big
        KeyInput.pressed = new Array(256);

        // default is null as empty string
        KeyInput.key = '';
        KeyInput.char = '';



        // sets all keys to be NOT pressed
        for (let i = 0; i < KeyInput.pressed.length; i++) {
            KeyInput.pressed[i] = false;
        }



        // i think, 3rd argument makes the listener accept synthetic calls, fx from another script
        // maybe 3rd argument is not needed and can be removed
        window.addEventListener('keydown', KeyInput.keyDownEvent, true);
        window.addEventListener('keyup', KeyInput.keyUpEvent, true);


    }



    // handles KeyEvent event when a key is pressed
    public static keyDownEvent = (e: KeyboardEvent): void => {



        // return if default is prevented, fx in case of dublicates 
        if (e.defaultPrevented) {

            // this can be used for testing purposses
            //console.log('Prevented default when key', e.key, 'was presses!');

            return;

        }


        // sets the specific key to be pressed
        KeyInput.pressed[e.keyCode] = true;


        // checks if key is char
        if (e.key.length === 1) {

            // sets KeyInput.char to key if key is char (string with length of 1)
            // because TypeScript cant just have a char type, like C++ or Java
            // creating custom char type is such a hastle
            KeyInput.char = e.key;

        }

        // sets all key presses regardless if char or not
        KeyInput.key = e.key;



        // checks if event has been cancelled, fx in case of dublicates 
        e.preventDefault();


    }




    // handles KeyEvent event when a key is released
    public static keyUpEvent = (e: KeyboardEvent): void => {

        // return if default is prevented, fx in case of dublicates
        if (e.defaultPrevented) {

            // this can be used for testing purposses
            //console.log('Default Prevented when key', e.key, 'was released!');

            return;

        }



        // sets released key in array to released
        KeyInput.pressed[e.keyCode] = false;



        // checks if event has been cancelled, fx in case of dublicates 
        e.preventDefault();



    }


    // used to check if key has been hit
    // and if it is ready to read
    public static keyAvailable = (): boolean => {
        
        // if buffer is empty, no key has been pressed
        if (KeyInput.key !== '') {
            
            
            // a new key has been hit
            return true;
            
            
        // if KeyInput.key is empty
        } else {
            
            
            // no key has been hit
            return false;
            
            
        }
        
        
    }
    
    
    // check if a key that is a char has been hit
    // and if it is ready to read
    public static charAvailable = (): boolean => {
        
        // if buffer is empty no key that is a char was hit
        if (KeyInput.char !== '') {
            
            
            // a new key has been hit, and the key is a char
            return true;
            
            
        // if KeyInput.char is empty
        } else {
            
            
            // no new key that is a char has been hit
            return false;
            
            
        }
        
        
    }
    
    
    // checks if key is available
    // returns key as string if available
    // clears the key buffer
    public static getKey = (): string => {
        
        // returns true if new key has been pressed
        if (KeyInput.keyAvailable()) {
            
            
            // initializes new variable to store key
            const key: string = KeyInput.key;
            
            
            // clears key buffer
            KeyInput.key = '';
            
            
            // returns key as string
            return key;
            
        
        // if no char is available
        } else {
            
            
            // return empty string, if no new key has been pressed
            return '';
            
            
        }
        
        
    }

    // checks if key is available and char
    // returns key as string if available
    // clears the key char buffer
    public static getChar = (): string => {
        
        // returns true if new key that is char has been pressed
        if (KeyInput.charAvailable()) {
            
            
            // initializes new variable to store key
            let char = KeyInput.char;
            
            
            // clears char buffer
            KeyInput.char = '';
            
            
            // returns key as string with length of 1
            return char;
            
            
        // if no char is available
        } else {
            
            
            // return empty string, if no new key has been pressed
            return '';
            
            
        }
        
        
    }
    
    
    

}



// example to get string of multible key strokes
// string is a variable with type string
// this assumes the code is in a loop
/*

// checks if key is available
if(KeyInput.keyAvailable()) {
    
    
    // checks if available key is a char
    if(KeyInput.charAvailable()) {
        
        
        // push char to variable of type string
        string += KeyInput.getChar();
        
        
    // if available key is not a char
    }else{
        
        
        // checks if key pressed is the 'Enter' key
        if(KeyInput.getKey() === 'Enter') {
            
            
            // logs full string to console
            // this can be replace by your code to handle the string
            console.log(string);
            
            
            // resets the string, to be ready to read a new string again
            string = '';
            
            
        }
        
        
    }
    

}

*/



// abstraction for MouseEvent, to make it simpler to use
// converts mouse button number to objects
enum MouseButton {
    
    // left mouse button
    left = 0,
    
    // middle mouse button / mouse wheel button
    middle = 1,
    
    // right mouse button
    right = 2
    
}


// abstraction to make MouseEvent easier to use
// converts standart mouse wheel movement numbers to objects
enum MouseWheel {
    
    // scroll up on mouse wheel
    up = -3,
    
    // scroll down on mouse wheel
    down = 3
    
}



// keyboard input class
// uses the render class
// converts real position/dimension to the virtual position/dimensions
// class is mostly static, because most use cases doesn't/shouldn't need more than one instance
// uses the window not the canvas for the listeners
// disables the context menu
export class MouseInput {

    
    // render is used to get dimensions and position of the mouse cursor on the screen
    private static render: Render;

    
    
    // stores the position of the mouse cursor on the screen
    public static position: Position;

    
    
    // if left mouse button is pressed
    public static leftDown: boolean;
    
    // if mouse wheel button is pressed
    public static middleDown: boolean;
    
    // if right mouse button is pressed
    public static rightDown: boolean;

    
    
    // which mouse buttons can be pressed at given time, to avoid duplicates
    private static canPress: boolean[] = [];
    
    // last pressed mouse button
    private static pressedButton: MouseButton;
    
    // position when last pressed
    private static pressedPosition: Position;

    
    
    // if a mouse button is pressed
    private static clickActive: boolean;
    
    // if the same mouse button has been pressed and released
    private static hasClicked: boolean;
    
    // the last button that has been pressed and released
    private static clickedButton: MouseButton;
    
    // where the clicked button was pressed
    private static clickedPressPosition: Position;
    
    // where the clicked button was released
    private static clickedReleasePosition: Position;

    
    
    // if mouse wheel has been scrolled
    private static hasScrolled: boolean;
    
    // the direction the mouse wheel was scrolled
    private static scrollDirection: MouseWheel;

    
    
    // initialize the class
    // the static equivelent of a constructor
    public static init = (render: Render): void => {
        
        
        
        // uses render for positional purposses
        MouseInput.render = render;
        
        
        
        // stores position of the mouse cursor on the screen as Position object
        MouseInput.position = new Position(0, 0);

        
        
        // sets all mouse buttons to not pressed
        MouseInput.leftDown = false;
        MouseInput.middleDown = false;
        MouseInput.rightDown = false;

        
        
        // sets all mouse buttons to be able to be pressed
        MouseInput.canPress[MouseButton.left] = true;
        MouseInput.canPress[MouseButton.middle] = true;
        MouseInput.canPress[MouseButton.right] = true;
        
        // this is just to initialize
        MouseInput.pressedButton = 0;
        
        // stores pressed position as Position object
        MouseInput.pressedPosition = new Position(0, 0);
        
        
        
        // at start, no click is active
        MouseInput.clickActive = false;
        
        // at start no click has been clicked
        MouseInput.hasClicked = false;
        
        // just an initializer
        MouseInput.clickedButton = 0;
        
        // both click positions stored as new Position objects
        MouseInput.clickedPressPosition = new Position(0, 0);
        MouseInput.clickedReleasePosition = new Position(0, 0);

        
        
        // no scroll at start
        MouseInput.hasScrolled = false;
        
        // an initializer, that changes before use
        MouseInput.scrollDirection = MouseWheel.up;

        
        
        // 3rd boolen argument is not set here, i dont know if it is necesssary
        // handlers does not prevent default for now, since duplicates doesn't really matter
        // TODO prevent default and test the difference
        
        // events related to moving the mouse
        window.addEventListener('mousemove', MouseInput.moveEvent);
        
        // events for button presses and releases
        window.addEventListener('mousedown', MouseInput.pressEvent);
        window.addEventListener('mouseup', MouseInput.releaseEvent);
        
        // fires when right clicking, normally open the context menu at mouse location
        window.addEventListener('contextmenu', MouseInput.contextMenuEvent);
        
        // events related to the mouse wheel
        window.addEventListener('wheel', MouseInput.wheelEvent);
        
        
        
    }
    
    
    
    // handle mouse move events
    // translates real screen position to the virtual space
    private static moveEvent = (e: MouseEvent): void => {
        
        
        
        // translates real horizontal position to virtual horizontal position
        MouseInput.position.x = (e.x * MouseInput.render.dimensions.width) 
            / MouseInput.render.htmlDimensions.width;
            
        // translates real vertical position to virtual vertical position
        MouseInput.position.y = (e.y * MouseInput.render.dimensions.height) 
            / MouseInput.render.htmlDimensions.height;
            
            
            
    }

    
    
    // handle MouseEvent when mouse button is pressed
    // activates press and starts click
    private static pressEvent = (e: MouseEvent): void => {
        
        
        
        // run through wich mouse button is pressed
        // using switch for effeciency
        // TODO change numbers to MouseButton enums
        switch(e.button) {
            
            // if left mouse button has been pressed
            case 0:
                
                MouseInput.leftDown = true;
                
                break;
                
            // if mouse wheel button has been pressed
            case 1:
                
                MouseInput.middleDown = true;
                
                break;
                
            // if right mouse button has been pressed
            case 2:
                
                MouseInput.rightDown = true;
                
                break;
                
        }
        
        
        
        // immidiatly activate when button is pressed
        MouseInput.pressedButton = e.button;
        
        // store position 
        MouseInput.pressedPosition = MouseInput.position;

        
        
        // start new click when button is pressed
        MouseInput.clickActive = true;
        
        // store which button is pressed
        MouseInput.clickedButton = e.button;
        
        // store position where pressed when pressed
        // TODO copy Position class not Position variables if possible
        MouseInput.clickedPressPosition.x = MouseInput.position.x;
        MouseInput.clickedPressPosition.y = MouseInput.position.y;
        
        
        
    }
    
    
    
    // handle MouseEvent when mouse button is released
    // default is NOT prevented as it is not strictly necessary, but should be added
    private static releaseEvent = (e: MouseEvent): void => {
        
        
        
        // run through wich mouse button is released
        // using switch for effeciency
        switch(e.button) {
            
            // if left button has been released
            case MouseButton.left:
                
                MouseInput.leftDown = false;
                
                break;
                
            // if mouse wheel button has been released
            case MouseButton.middle:
                
                MouseInput.middleDown = false;
                
                break;
                
            // if left button has been released
            case MouseButton.right:
                
                MouseInput.rightDown = false;
                
                break;
                
        }
        
        
        // intended to make click more reliable
        // this is not used, and can/should probably be removed
        MouseInput.canPress[e.button] = true;
        
        
        // checks if the right button has been released when click is active
        if(e.button === MouseInput.clickedButton && MouseInput.clickActive) {
            
            
            // updates position of mouse when released
            MouseInput.clickedReleasePosition.x = MouseInput.position.x;
            MouseInput.clickedReleasePosition.y = MouseInput.position.y;
            
            // indicate that click has happened
            MouseInput.hasClicked = true;
            
            // reset click
            MouseInput.clickActive = false;
            
            
        }
        
        
        
    }

    
    
    // disables the opening of contextmenu when right mouse button is pressed
    private static contextMenuEvent = (e: MouseEvent): void => {
        
        // probably not necessary
        e.preventDefault();
        
    }

    
    
    // handles all mouse wheel events
    private static wheelEvent = (e: WheelEvent): void => {
        
        // indicate scrolled has happened and direction
        MouseInput.scrollDirection = e.deltaY;
        MouseInput.hasScrolled = true;
        
        
    }
    
    
    // checks if a specific mouse button is pressed
    public static isDown = (button: MouseButton) => {
        
        // runs through user input
        // returns boolean of the specified mouse button
        switch(button) {
            
            case MouseButton.left:
                
                return MouseInput.leftDown;
                
            
            case MouseButton.middle:
                
                return MouseInput.middleDown;
                
                
            case MouseButton.right:
                
                return MouseInput.rightDown;
                
        }
        
        
    }

    
    
    // used to find out if the mouse cursor is inside a specified rectangle area
    // takes the position, width and height of the rectangle area
    // TODO take rectangle as arg instead
    public static checkMouseOnRect = (position: Position, areaWidth: number, 
        areaHeight: number): boolean => {
            
        // returns if mouse is inside rectangle area
        if(MouseInput.position.x > position.x 
            && MouseInput.position.x < position.x + areaWidth 
            && MouseInput.position.y > position.y 
            && MouseInput.position.y < position.y + areaHeight) {
                
            return true;
            
        }else{
            
            return false;
            
        }
        
        
    }

    
    
    // used get information about a specific button press action 
    //  of the mouse on a specified area
    public static pressed = (button: MouseButton, position: Position, areaWidth: number, 
        areaHeight: number): boolean => {
            
        // checks if the specified mouse button is pressed and if it can be pressed
        if(MouseInput.isDown(button)
        && MouseInput.canPress[button]
        && button === MouseInput.pressedButton 
        
        // checks if the mouse cursor is inside the specified area
        && MouseInput.pressedPosition.x > position.x 
        && MouseInput.pressedPosition.x < position.x + areaWidth 
        && MouseInput.pressedPosition.y > position.y 
        && MouseInput.pressedPosition.y < position.y + areaHeight) {
            
            // sets state of button to be reset
            MouseInput.canPress[button] = false;
            
            // press has happened at the desired location
            return true;
            
        }else{
            
            return false;
            
        }
        
        
    }
    
    
    
    // used get information about a specific button click action 
    //  of the mouse on a specified area
    public static clicked = (button: MouseButton, position: Position, areaWidth: number, areaHeight: number): boolean => {
        
        
        // if the right butten has been clicked
        if(MouseInput.hasClicked
        && MouseInput.clickedButton === button
        
        // if press action was inside specified area
        && MouseInput.clickedPressPosition.x > position.x 
        && MouseInput.clickedPressPosition.x < position.x + areaWidth
        && MouseInput.clickedPressPosition.y > position.y 
        && MouseInput.clickedPressPosition.y < position.y + areaHeight
        
        // if release action was inside specified area
        && MouseInput.clickedReleasePosition.x > position.x 
        && MouseInput.clickedReleasePosition.x < position.x + areaWidth
        && MouseInput.clickedReleasePosition.y > position.y 
        && MouseInput.clickedReleasePosition.y < position.y + areaHeight) {
            
            // for debugging purposses optionally use
            //console.log(MouseInput.clickedPressPosition, MouseInput.clickedReleasePosition)
            
            // resets click action
            MouseInput.hasClicked = false;
            
            // click action happened in specified area
            return true;
            
        }else{
            
            return false;
            
        }
        
        
    }

    
    
    // used get information about mouse wheel action a specified direction
    public static scrolled = (direction: MouseWheel): boolean => {
        
        // checks if scrolled in the right direction
        if(MouseInput.hasScrolled && MouseInput.scrollDirection === direction) {
            
            // resets scroll
            MouseInput.hasScrolled = false;
            
            // mouse has scrolled the specified direction
            return true;
            
        }else{
            
            return false;
            
        }
        
        
    }
    

}


