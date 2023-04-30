export const blockages = {

    setBlockagesParams() {
        return {
            blockageTypes: {
                1: {
                    name: "blockage",
                    chanceFrom: 0,
                    chanceTo: 80,
                },
                2: {
                    name: "blockageBull",
                    chanceFrom: 81,
                    chanceTo: 100,
                },
            }
        }
    }
}