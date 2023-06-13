    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

    const copy = players.slice();
    const copy1 = [].concat(players);
    const copy2 = [...players];
    const copy3 = Array.from(players);

    console.log("slice: ", copy, "concat: ", copy1, "spread: ", copy2, "array: ", copy3);

    const person = {
      name: 'Wes Bos',
      age: 80,
      family: {
        farther: "Sam Bos",
        mother: "Eline Bos"
      }
    };

    const copyObj = {...person};
    const copyObj1 = Object.assign({}, person);
    const deepCopy = JSON.parse(JSON.stringify(person));

    console.log("spread: ", copyObj, "assign: ", copyObj1, "deep: ", deepCopy);