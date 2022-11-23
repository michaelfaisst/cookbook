import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.category.createMany({
        data: [
            { name: "Hauptspeise" },
            { name: "Vorspeise" },
            { name: "Dessert" },
            { name: "Beilage" },
            { name: "Frühstück" },
            { name: "Salat" },
            { name: "Suppe" },
            { name: "Brot" },
            { name: "Kuchen" }
        ]
    });

    await prisma.unit.createMany({
        data: [
            { name: "kg" },
            { name: "g" },
            { name: "mg" },
            { name: "l" },
            { name: "ml" },
            { name: "EL (gehäuft)" },
            { name: "EL (gestrichen)" },
            { name: "TL (gehäuft)" },
            { name: "TL (gestrichen)" },
            { name: "Priese" },
            { name: "Stück" },
            { name: "Tropfen" },
            { name: "Packung" },
            { name: "Schuss" },
            { name: "Messerspitze" },
            { name: "Blatt" }
        ]
    });

    await prisma.ingredient.createMany({
        data: [
            { name: "Salz" },
            { name: "Pfeffer" },
            { name: "Butter" },
            { name: "Öl" },
            { name: "Zucker" },
            { name: "Wasser" },
            { name: "Milch" },
            { name: "Mehl" },
            { name: "Nudeln" },
            { name: "Reis" }
        ]
    });
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
