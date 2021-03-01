
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
*       Last Edit:   17-02-2021
*/



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
