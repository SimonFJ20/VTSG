
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   input.ts
*       Pathname:   vtsg/input.ts
*       Content:    Primary file for Keyboard and Mouse input
*
*       License:    MIT
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

    // contains las key pressed as KeyEvent.key if length is 1
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
            //console.log('Prevented default when key', e.key, 'was presses!');

            return;

        }



        // sets released key in array to released
        KeyInput.pressed[e.keyCode] = false;



        // checks if event has been cancelled, fx in case of dublicates 
        e.preventDefault();



    }



    public static keyAvailable = (): boolean => {
        if (KeyInput.key !== '') {
            return true;
        } else {
            return false;
        }
    }

    public static charAvailable = (): boolean => {
        if (KeyInput.char !== '') {
            return true;
        } else {
            return false;
        }
    }

    public static getKey = (): string => {
        if (KeyInput.keyAvailable()) {
            let key = KeyInput.key;
            KeyInput.key = '';
            return key;
        } else {
            return '';
        }
    }

    public static getChar = (): string => {
        if (KeyInput.charAvailable()) {
            let char = KeyInput.char;
            KeyInput.char = '';
            return char;
        } else {
            return '';
        }
    }

}

// can be used elsewhere to get string of multible key strokes
/*
if(KeyInput.keyAvailable()) {
    if(KeyInput.charAvailable()) {
        string += KeyInput.getChar();
    }else{
        if(KeyInput.getKey() === 'Enter') {
            console.log(string);
            string = '';
        }
    }

}
*/
