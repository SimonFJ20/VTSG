import { ID } from "../ID";
import { KeyInput } from "../vtsg/input";
import { Color, Dimensions, Position, Rectangle, Velocity } from "../vtsg/objects";
import { Render } from "../vtsg/render";
import { GameObject } from "../vtsg/vtsg";


export class Player extends GameObject {

    public position: Position;
    
    //private image: HTMLImageElement;

    constructor(position: Position, id: ID) {
        super(id);
        this.position =  position;
        this.position.addVelocity(new Velocity())

        //this.image = new Image();
        //this.image.src = 'assets/testimage.png';

    }

    public update = (delta: number): void => {

        this.position.velocity.stop();
        
        if(KeyInput.pressed[38] && !KeyInput.pressed[40]) {
            this.position.velocity.velY = -1000;
        }else if(KeyInput.pressed[40] && !KeyInput.pressed[38]) {
            this.position.velocity.velY = 1000;
        }if(KeyInput.pressed[37]  && !KeyInput.pressed[39]) {
            this.position.velocity.velX = -1000;
        }else if(KeyInput.pressed[39] && !KeyInput.pressed[37]) {
            this.position.velocity.velX = 1000;
        }

        this.position.update(delta);
    }


    public draw = (render: Render): void => {
        render.background(new Color(80, 80, 80))
        
        render.strokeEnable = false;
        render.fill(new Color(200, 200, 200));
        render.rect(new Rectangle(this.position, new Dimensions(64, 64)));
        
        //render.image(this.image, new Rectangle(this.position, new Dimensions(64, 64)));
    }

}
