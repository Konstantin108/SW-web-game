export const blockages = {

    setBlockagesParams() {
        return {
            blockageTypes: {
                1: {
                    name: "blockage",
                    // пока не знаю, какие свойства будут в массиве типов, по максимуму должно быть в самом классе
                    // процент появления blockageBull будет равен от 1 до 2ух процентов
                    // outlook: "blockage",
                    // blockageArrowType: "enemyArrow",
                    chanceFrom: 0,
                    chanceTo: 49,
                },
                2: {
                    name: "blockageBull",
                    // outlook: "blockageBull",
                    // blockageArrowType: "enemyRocket",
                    chanceFrom: 50,
                    chanceTo: 100,
                },
            }
        }
    }
}