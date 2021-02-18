
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
*       Last Edit:  17-02-2021
*/


/*
*   TODO:
*   *   JSDoc comment public elements 
*
*/

// keyboard input class
// class is mostly static, because most use cases doesn't/shouldn't need more than one instance
// uses keyCode wich is deprecated
// uses the window not the canvas
export class KeyInput {



    // contains all keys as KeyEvent.keyCode (deprecated) and if they are pressed
    public static pressed: Array<boolean>;

    // contains last key pressed as KeyEvent.key
    public static key: string;

    // contains las key pressed if key length is 1
    // fx 'a', '1', '*', and not 'Space', 'RightArrow'
    public static char: string;



    // initialize the class
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



        // accepts synthetic calls, fx from another script
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


