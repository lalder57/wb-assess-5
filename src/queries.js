import { Op } from "sequelize";
import { Animal, Human } from "./model.js";

// const human1 = await Human.findByPk(1)
// console.log(Human.getAnimals(human1));
// console.log(await Human.findAll())

// const human1 = await Human.findByPk(2)
// console.log(human1.getFullName())

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);
// console.log(query1);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({ where: { species: "fish" } });
// console.log(query2);

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({ where: { humanId: 5 } });
// console.log(query3);

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.gt]: 2015,
    },
  },
});
// console.log(query4);

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    fname: {
      [Op.startsWith]: "J",
    },
  },
});
// console.log(query5);

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.is]: null,
    },
  },
});
// console.log(query6);

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    [Op.or]: [{ species: "fish" }, { species: "rabbit" }],
  },
});
// console.log(query7);

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    email: {
      [Op.notLike]: "%@gmail.com",
    },
  },
});
// console.log(query8);

// Continue reading the instructions before you move on!

export async function printHumansAndAnimals() {
  const humans = await Human.findAll({
    include: Animal,
  });

  for (const human of humans) {
    console.log(human.getFullName());
    const animals = human.animals;
    for (const animal of animals) {
      console.log(animal.name);
    }
  }
}

// printHumansAndAnimals();


// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  const results = await Human.findAll({
    include: {
      model: Animal,
      where: {
        species: species,
      },
    },
  });
  const humans = new Set();
  for (const result of results) {
    humans.add(result.getFullName());
  }
  return humans;
}

// console.log(getHumansByAnimalSpecies('dog');

// const result = await Animal.findAll({
//   where: {
//     species: "fish",
//   },
// });
// // console.log(result);

// const result2 = await Human.findAll({
//   include: {
//     model: Animal,
//     where: {
//       species: 'fish',
//     },
//   },
// });
// console.log(result2);