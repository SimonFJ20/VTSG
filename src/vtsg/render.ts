
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   render.ts
*       Pathname:   vtsg/render.ts
*       Content:    Functions for drawing to the screen
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

import { Canvas } from "./canvas";
import { Color, Dimensions, Pixel, Position, Rectangle, Sprite } from "./objects";



export class Render {

    private canvas: Canvas;

    public htmlDimensions: Dimensions;
    public dimensions: Dimensions;

    private screenBuffer: Pixel[][];

    public fillEnable: boolean;
    public fillColor: Color;

    public strokeEnable: boolean;
    public strokeColor: Color;
    public strokeWeight: number;

    public backgroundColor: Color;

    public constructor(canvas: Canvas, virtualDimensions: Dimensions = new Dimensions(2000, 1000)) {
        this.canvas = canvas;

        this.htmlDimensions = new Dimensions();
        this.loadSize();

        this.dimensions = virtualDimensions;

        this.fillEnable = true;
        this.fillColor = new Color(60, 60, 60);

        this.strokeEnable = true;
        this.strokeColor = new Color(255, 255, 255);
        this.strokeWeight = 1;

        this.backgroundColor = new Color(200, 200, 200);

        this.screenBuffer = [];

        for(let x = 0; x < this.dimensions.width; x++) {
            this.screenBuffer[x] = [];
            for(let y = 0; y < this.dimensions.height; y++) {
                this.screenBuffer[x][y] = new Pixel(this.backgroundColor);
            }
        }
    }

    private convertX = (x: number): number => {
        return ((x / this.dimensions.width) * this.htmlDimensions.width);
    }

    private convertY = (y: number): number => {
        return ((y / this.dimensions.height) * this.htmlDimensions.height);
    }

    private convertPosition = (position: Position): Position => {
        return new Position(this.convertX(position.x), this.convertY(position.y));
    }

    private convertDimensions = (dimensions: Dimensions): Dimensions => {
        return new Dimensions(this.convertX(dimensions.width), this.convertY(dimensions.height));
    }

    private convertRectangle = (rectangle: Rectangle): Rectangle => {
        return new Rectangle(this.convertPosition(rectangle.position), this.convertDimensions(rectangle.dimensions))
    }

    public loadSize = (): void => {
        this.htmlDimensions = this.canvas.dimensions;;
    }

    private setGraphicColor = (color: Color): void => {
        this.canvas.setFillStyle(color);
    }

    public fill = (color: Color, enable: boolean = true): void => {
        this.fillEnable = enable;
        this.fillColor = color;
        this.setGraphicColor(color);
    }

    public stroke = (color: Color, enable: boolean = true): void => {
        this.strokeEnable = enable;
        this.strokeColor = color;
        this.setGraphicColor(color);
    }

    public noFill = (): void => {
        this.fillEnable = false;
    }
    
    public noStroke = (): void => {
        this.strokeEnable = false;
    }

    /*
    public oldrect = (rectangle: Rectangle, fillColor: Color = this.fillColor, strokeColor: Color = this.strokeColor, fillEnable: boolean = this.fillEnable, strokeEnable: boolean = this.strokeEnable, strokeWeight: number = this.strokeWeight): void => {
        if(strokeEnable) {
            this.setGraphicColor(strokeColor);
            this.graphics.fillRect(this.convertX(rectangle.position.x), this.convertY(rectangle.position.y), this.convertX(rectangle.dimensions.width), this.convertY(rectangle.dimensions.height));
            if(fillEnable) {
                this.setGraphicColor(fillColor);
                this.graphics.fillRect(this.convertX(rectangle.position.x + strokeWeight), this.convertY(rectangle.position.y + strokeWeight), this.convertX(rectangle.dimensions.width - strokeWeight * 2), this.convertY(rectangle.dimensions.height - strokeWeight * 2));
            }
        }else if(fillEnable) {
            this.setGraphicColor(fillColor);
            this.graphics.fillRect(this.convertX(rectangle.position.x), this.convertY(rectangle.position.y), this.convertX(rectangle.dimensions.width), this.convertY(rectangle.dimensions.height));
        }
    }
    */

    // TODO: Stroke should only be line, NOT rectangle
    public rect = (rectangle: Rectangle, fillColor: Color = this.fillColor, strokeColor: Color = this.strokeColor, fillEnable: boolean = this.fillEnable, strokeEnable: boolean = this.strokeEnable, strokeWeight: number = this.strokeWeight): void => {
        if(strokeEnable) {
            this.canvas.drawRect(this.convertRectangle(rectangle), strokeColor);
            if(fillEnable) {
                this.canvas.drawRect(this.convertRectangle(new Rectangle(new Position(rectangle.position.x + strokeWeight, rectangle.position.y + strokeWeight), new Dimensions(rectangle.dimensions.width - strokeWeight * 2, rectangle.dimensions.height - strokeWeight * 2))), fillColor);
            }
        }else if(fillEnable) {
            this.canvas.drawRect(this.convertRectangle(rectangle), fillColor);
        }
    }

    public background = (color: Color = this.backgroundColor): void => {
        this.canvas.drawRect(new Rectangle(new Position(0, 0), this.convertDimensions(this.dimensions)), color);
    }

    public image = (image: HTMLImageElement, rectangle: Rectangle): void => {
        this.canvas.drawImage(image, this.convertRectangle(rectangle));
    }

    public sprite = (sprite: Sprite) => {
        this.canvas.drawImage2(sprite.image, sprite.position, sprite.dimensions);
    }

    public draw = (): void => {};

    /*
    public draw = (): void => {
        console.log('p1')
        for(let x = 0; x < this.dimensions.width; x++) {
            for(let y = 0; y < this.dimensions.height; y++) {
                this.canvas.drawPixel(new Position(x, y), this.screenBuffer[x][y])
                this.screenBuffer[x][y] = new Pixel(this.backgroundColor);
            }
        }
        console.log('p2')
    }
    */

}






