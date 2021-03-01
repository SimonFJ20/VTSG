
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   canvas.ts
*       Pathname:   vtsg/canvas.ts
*       Content:    Interface between VTSG and HTML <canvas>
*
*       License:    MIT License
*
*       Author:     Simon From Jakobsen
*       Email:      simonfromjakobsen@gmail.com
*       GitHub:     SimonFJ20
*
*       Created:    01-03-2021
*       Last Edit:  01-03-2021
*/

import { Color, Dimensions, Pixel, Position, Rectangle } from "./objects";



export class Canvas {

    public htmlDiv: any;
    public htmlDivId: string;
    public htmlCanvas: HTMLCanvasElement;
    public canvasGraphics: CanvasRenderingContext2D;

    public dimensions: Dimensions;

    public constructor(htmlDivId: string) {
        this.htmlDivId = htmlDivId;
        this.htmlDiv = document.getElementById(htmlDivId);
        this.htmlDiv.innerHTML = "";

        this.dimensions = new Dimensions();
        this.reloadSize();

        let newHtmlCanvas = document.createElement("canvas");
        newHtmlCanvas.width = this.dimensions.width;
        newHtmlCanvas.height = this.dimensions.height;
        newHtmlCanvas.id = 'game';
        newHtmlCanvas.style.margin = '0px';
        this.htmlDiv.append(newHtmlCanvas);

        this.htmlCanvas = <HTMLCanvasElement> document.getElementById('game');
        this.canvasGraphics = <CanvasRenderingContext2D> this.htmlCanvas.getContext('2d');

        this.canvasGraphics.imageSmoothingEnabled = false;

        this.reloadCanvasSize();
    }

    public checkIfResized = (): boolean => {
        if(this.getDimensions() !== this.dimensions) {
            this.reloadCanvasSize();
            return true;
        }
        return false;
    }

    private reloadSize = (): void => {
        this.dimensions = this.getDimensions();
    }

    private reloadCanvasSize = (): void => {
        this.dimensions = this.getDimensions();
        this.htmlCanvas.width = this.dimensions.width;
        this.htmlCanvas.height = this.dimensions.height;
    }

    private getDimensions = (): Dimensions => {
        return new Dimensions(window.innerWidth, window.innerHeight);
    }

    public setFillStyle = (color: Color): void => {
        this.canvasGraphics.fillStyle = `rgb(${color.getRed()},${color.getGreen()},${color.getBlue()},${color.getAlpha()})`;
    }

    public drawPixel = (position: Position, pixel: Pixel): void => {
        this.setFillStyle(pixel.color);
        this.canvasGraphics.fillRect(position.x, position.y, 1, 1);
    }

    public drawRect = (rectangle: Rectangle, color: Color): void => {
        this.setFillStyle(color);
        this.canvasGraphics.fillRect(rectangle.position.x, rectangle.position.y, rectangle.dimensions.width, rectangle.dimensions.height);
    }

    public drawImage = (image: HTMLImageElement, rectangle: Rectangle): void => {
        this.canvasGraphics.drawImage(image, rectangle.position.x, rectangle.position.y, rectangle.dimensions.width, rectangle.dimensions.height);
    }

    public drawImage2 = (image: HTMLImageElement, position: Position, dimensions: Dimensions): void => {
        this.canvasGraphics.drawImage(image, position.x, position.y, dimensions.width, dimensions.height);
    }

}

