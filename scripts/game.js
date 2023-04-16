import {progressController} from "./controllers/progressController.js";
import {blockageController} from "./controllers/blockageController.js";
import {bonusController} from "./controllers/bonusController.js";
import {player} from "./objects/player.js";
import {renderer} from "./objects/renderer.js";

export const game = {
    playerIsAlive: true,

    init() {
        alert("1) Нажми F12, чтобы открыть панель управления\n2) Закрой данное окно\n3) В появившейся панели выбери вкладку \"Console\"\n4) Если управление не работает, то надо кликнуть по белому фону\n\nИспользуй Numpad для передвижения, пробел - для выстрела, ты должен уходить  от летящих на тебя кораблей. Каждое столкновение будет отнимать жизнь и очки. Будь осторожен, турбулентность будет тебе мешать!");
        renderer.render();
    },

    run() {
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        player.move();
        player.shoot();
        player.useBomb();
        player.useSuperAbility();
    },

    quit() {
        let quitBtn = "Escape";

        document.addEventListener("keydown", function (event) {
            if (event.code === quitBtn) game.over();
        });
    },

    over(win = false) {
        let result = "";

        if (win) {
            result = `Игра пройдена! Поздравляю!\nТвой результат: кораблей уничтожено всего: ${progressController.shipDestroyer},\nНабранное количество очков всего: ${progressController.score}`
        } else {
            result = `Игра окончена! Достигнут уровень: ${progressController.level}\nКораблей уничтожено: ${progressController.shipDestroyer}, Набранное количество очков: ${progressController.score}`;
        }
        this.playerIsAlive = false;
        alert(result);
        console.log(result);
    }
}

game.init();
game.run();
game.quit();