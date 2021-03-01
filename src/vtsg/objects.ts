
/*
*       VTSG: V_ TypeScript Game engine
*
*       Filename:   objects.ts
*       Pathname:   vtsg/objects.ts
*       Content:    Object properties
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


// TODO comment everything

export class Position {
    
    public x: number;
    public y: number;

    public velocity: Velocity;
    public hasVelocity: boolean;

    constructor(x: number = 0, y: number = 0, velocity: Velocity = new Velocity(0, 0)) {
        this.x = x;
        this.y = y;

        this.velocity = velocity;
        this.hasVelocity = false;
    }

    public addVelocity = (velocity: Velocity): void => {
        this.velocity = velocity;
        this.hasVelocity = true;
    }

    public removeVelocity = (): void => {
        this.velocity = new Velocity(0, 0);
        this.hasVelocity = false;
    }

    public update = (delta: number, velocity: Velocity = this.velocity): void => {
        this.x += velocity.velX * ( delta / 1000 );
        this.y += velocity.velY * ( delta / 1000 );
    }

}

export class Velocity {

    public velX: number;
    public velY: number;

    constructor(velX: number = 0, velY: number = 0) {
        this.velX = velX;
        this.velY = velY;
    }

    public stop = (): void => {
        this.velX = 0;
        this.velY = 0;
    }

    public reverse = (): void => {
        this.velX = -(this.velX);
        this.velY = -(this.velY);
    }

    public reverseX = (): void => {
        this.velX = -(this.velX);
    }

    public reverseY = (): void => {
        this.velY = -(this.velY);
    }
    

}

export class Dimensions {

    public width: number;
    public height: number;

    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
    }

}


export class Rectangle {

    public position: Position;
    public dimensions: Dimensions;

    constructor(position: Position, dimensions: Dimensions) {
        this.position = position;
        this.dimensions = dimensions;
    }

}


export class Sprite {

    public image: HTMLImageElement;
    public position: Position;
    public dimensions: Dimensions;

    constructor(image: HTMLImageElement, position: Position, dimensions: Dimensions) {
        this.image = image;
        this.position = position;
        this.dimensions = dimensions;
    }

}



export class Color {

    private red: number;
    private green: number;
    private blue: number;
    private alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number = 1) {
        this.red = this.checkColorValue(red);
        this.green = this.checkColorValue(green);
        this.blue = this.checkColorValue(blue);
        this.alpha = this.checkAlphaValue(alpha);
    }

    private checkColorValue = (colorValue: number): number => {
        if(colorValue < 0) {
            return 0;
        }else if(colorValue > 255) {
            return 255;
        }else{
            return colorValue;
        }
    }

    private checkAlphaValue = (alphaValue: number): number => {
        if(alphaValue < 0) {
            return 0;
        }else if(alphaValue > 1) {
            return 1;
        }else{
            return alphaValue;
        }
    }

    public getRed = (): number => {
        return this.red;
    }

    public getGreen = (): number => {
        return this.green;
    }

    public getBlue = (): number => {
        return this.blue;
    }

    public getAlpha = (): number => {
        return this.alpha;
    }

    public getGrey = (): Color => {
        return new Color((this.red + this.green + this.blue) / 3, (this.red + this.green + this.blue) / 3, (this.red + this.green + this.blue) / 3);
    }

    public getGreyAlpha = (): Color => {
        return new Color((this.red + this.green + this.blue) / 3, (this.red + this.green + this.blue) / 3, (this.red + this.green + this.blue) / 3, this.alpha);
    }

    public setRed = (red: number): void => {
        this.red = this.checkColorValue(red);
    }

    public setGreen = (green: number): void => {
        this.green = this.checkColorValue(green);
    }

    public setBlue = (blue: number): void => {
        this.blue = this.checkColorValue(blue);
    }

    public setAlpha = (alpha: number): void => {
        this.alpha = this.checkAlphaValue(alpha);
    }

}


export class Pixel {
    
    public color: Color;

    constructor(color: Color = new Color(0, 0, 0, 0)) {
        this.color = color;
    }

}



