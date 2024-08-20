import { Scene } from "./scene";
import PlatformPartyManager from "../platformPartyManager";
import { PlayerMetadata } from "../models";
import { Stage, StageMap } from "./stage";
import { Player } from "../entities/player";
import { SPRITE_LENGTH } from "../loadAssets";

export default class StageScene extends Scene {
    private readonly _stage: Stage;
    private _scale: number = 2;
    private _playerMetadata: PlayerMetadata[] = [];

    public constructor(
        manager: PlatformPartyManager,
        stageMap: StageMap,
        private _player: Player) {
        super(manager);
        this._stage = new Stage(manager.ctx, stageMap, manager.spriteSheet);
    }

    public override keyDown(event: KeyboardEvent) {
        this._player.keyPressed(event.key);
    }

    public override keyUp(event: KeyboardEvent) {
        this._player.keyReleased(event.key);
    }

    public override update() {
        this._player.update(this._stage);
        const encoder = new TextEncoder();
        const message = `playerUpdate\0${JSON.stringify(this._player.metadata)}`;
        this.manager.socket.send(encoder.encode(message));
    }

    public override draw() {
        const ctx = this.manager.ctx;
        ctx.save();
        ctx.fillStyle = "#1C1C1C";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let translateX = ctx.canvas.width / 2 - this._player.metadata.position.x * this._scale;
        let translateY = ctx.canvas.height / 2 - this._player.metadata.position.y * this._scale;
        translateX = Math.max(Math.min(translateX, 0), ctx.canvas.width - this._stage.width * this._scale);
        translateY = Math.max(Math.min(translateY, 0), ctx.canvas.height - this._stage.height * this._scale);
        ctx.setTransform(this._scale, 0, 0, this._scale, translateX, translateY);

        this._stage.draw();
        for (const player of this._playerMetadata) {
            if (player.name !== this._player.metadata.name) {
                this._drawPlayer(ctx, player);
            }
        }
        this._drawPlayer(ctx, this._player.metadata);
        ctx.restore();
    }

    public override message(event: MessageEvent): void {
        const updatedPlayer = JSON.parse(event.data) as PlayerMetadata;
        const playerIndex = this._playerMetadata.findIndex(p => p.name === updatedPlayer.name);
        if (playerIndex === -1) {
            this._playerMetadata.push(updatedPlayer);
        } else {
            this._playerMetadata[playerIndex] = updatedPlayer;
        }
    }

    private _drawPlayer(ctx: CanvasRenderingContext2D, entity: PlayerMetadata) {
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "8px \"Inconsolata\"";
        const textWidth = ctx.measureText(entity.name).width;
        ctx.fillText(
            entity.name,
            entity.position.x - (textWidth - SPRITE_LENGTH) / 2,
            entity.position.y
        );
        if (entity.isFlipped) {
            ctx.translate(2 * entity.position.x + SPRITE_LENGTH, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(
            this.manager.spriteSheet.sprites[entity.spriteIndex],
            entity.position.x,
            entity.position.y,
        );
        ctx.restore();
    }
}