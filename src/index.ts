
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   index.ts
*       Pathname:   ./index.ts
*       Content:    Main entry point for game
*
*       License:    MIT License
*
*       Author:     Simon From Jakobsen
*       Email:      simonfromjakobsen@gmail.com
*       GitHub:     SimonFJ20
*
*       Created:    17-02-2021
*       Last Edit:   17-02-2021
*/

import { main } from "./game";
import { Game } from "./vtsg/vtsg";


// <div> target for game
let targetDiv; HTMLDivElement;

// target <canvas> for game
let gameCanvas: HTMLCanvasElement;



// main entry point function for program
const index = (): void => {

    // check if <div> with id "VTSG" exist, if not inform user
    if(document.getElementById('VTSG') === null) {

        // high level error
        alert('VTSG could not initialize, no <div> found with id "VTSG"')

        // returns and stops the program
        throw 'VTSG could not initialize, no <div> found with id "VTSG"';

        // unreachable, because of throw
        //return;

    }

/* 
    // assigns pointer
    // casting to remove potential null type
    targetDiv = <HTMLDivElement>document.getElementById('VTSG');


    // assigns pointer to gameCanvas
    gameCanvas = document.createElement('canvas');

    
    // assigns id for future proofing
    gameCanvas.id = 'VTSGGameCanvas';


    // adds canvas to targetDiv
    targetDiv.appendChild(gameCanvas);
 */


    // initialize game
    let game = new Game('VTSG');

    main(game);

}



// fires when <script> loads
window.onload = index;




