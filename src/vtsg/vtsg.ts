
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   vtsg.ts
*       Pathname:   vtsg/vtsg.ts
*       Content:    Primary file for VTSG
*
*       License:    MIT License
*
*       Author:     Simon From Jakobsen
*       Email:      simonfromjakobsen@gmail.com
*       GitHub:     SimonFJ20
*
*       Created:    17-02-2021
*       Last Edit:   01-03-2021
*/

import { ID } from "../ID";
import { Canvas } from "./canvas";
import { KeyInput, MouseInput } from "./input";
import { Render } from "./render";



export class Game {

    public handler: Handler;
    private canvas: Canvas;
    private render: Render;

    private lastRender: number;
    private runState: boolean;

    private timeBefore: number;
    private framesInSecond: number;
    public FPS: number;
    public countFPS: boolean;
    public logFPS: boolean;

    public constructor(htmlDivId: string) {
        this.handler = new Handler();
        this.canvas = new Canvas(htmlDivId);
        this.render = new Render(this.canvas);

        KeyInput.init();
        MouseInput.init(this.render);
        
        this.runState = false;
        this.lastRender = 0;

        this.timeBefore = 0;
        this.framesInSecond = 0;
        this.FPS = 0;
        this.countFPS = true;
        this.logFPS = true;
    }

    private loop = (timestamp: number): void => {
        let delta = timestamp - this.lastRender;

        if(this.canvas.checkIfResized()) {
            this.render.loadSize();
        }

        this.handler.update(delta);

        this.handler.draw(this.render);
        this.render.draw();

        if(this.countFPS) {
            if(Date.now() - this.timeBefore >= 1000) {
                this.timeBefore = Date.now();
                this.FPS = this.framesInSecond;
                this.framesInSecond = 0;
                if(this.logFPS) {
                    console.log('FPS', this.FPS);
                }
            }
            this.framesInSecond++;
        }

        this.lastRender = timestamp;
        if(this.runState) {
            window.requestAnimationFrame(this.loop);
        }
    }

    public start = (): void => {
        this.framesInSecond = 0;
        this.timeBefore = Date.now();
        this.runState = true;
        window.requestAnimationFrame(this.loop);
    }

    public stop = (): void => {
        this.runState = false;
    }

}



export abstract class GameObject {
    
    public handler: Handler;
    public id: ID;
    public handlerId: number;

    constructor(id: ID) {
        this.id = id;
        
        this.handler = new Handler();
        this.handlerId = 0;
    }

    abstract update(delta: number): void;
    abstract draw(render: Render): void;

}


export class Handler {

    private gameObjects: GameObject[] = [];
    private nextId: number;

    constructor() {
        this.nextId = -1;
    }

    public update = (delta: number): void => {
        for(let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(delta);
        }
    }

    public draw = (render: Render): void => {
        for(let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(render);
        }
    }

    public addObject = (gameObject: GameObject): number => {
        this.nextId++;
        gameObject.handlerId = this.nextId;
        gameObject.handler = this;
        this.gameObjects.push(gameObject);
        return this.nextId;
    }

    public removeObject = (id: number): void => {
        delete this.gameObjects[id];
    }

}




