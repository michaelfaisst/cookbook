import { prisma } from "../src/server/db/client";

async function main() {
    const units = [
        "kg",
        "dag",
        "g",
        "l",
        "ml",
        "Priese",
        "Stk.",
        "Packung",
        "Esslöffel",
        "Teelöfel",
        "Cup",
        "Tasse",
        "Tropfen",
        "Würfel",
        "Zehe"
    ];

    return await prisma.unit.createMany({
        data: units.map((unit) => ({ name: unit }))
    });
}

main();
