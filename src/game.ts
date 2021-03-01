import { ID } from "./ID";
import { Player } from "./objects/player";
import { Position } from "./vtsg/objects";
import { Game } from "./vtsg/vtsg";


export const main = (game: Game) => {

    

    let player1 = new Player(new Position(0, 0), ID.player);
    let player2 = new Player(new Position(200, 0), ID.player);
    let player3 = new Player(new Position(200, 200), ID.player);

    game.handler.addObject(player1);
    game.handler.addObject(player2);
    game.handler.addObject(player3);

    game.start();

}



