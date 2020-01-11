function createPerson(name) {
  // private properties are not accessible from the outside
  const privateProperties = {};

  const person = {
    setName: function(name) {
      if (!name) throw new Error('Name required');
      return privateProperties.name = name;
    },
    getName: function() {
      return privateProperties.name;
    },
  };

  person.setName(name);
  return person;
}

const shit = createPerson('aaa');

console.log(shit.getName());
