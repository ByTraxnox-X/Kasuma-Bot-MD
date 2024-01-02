import readline from 'readline'


let handler = async (m, { conn, text, usedPrefix, command }) => {


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.level = 1;
    this.weapon = 'Dagger';
    this.inventory = [];
    this.pet = null;
    this.friend = null;
  }

  attack(enemy) {
    const damage = Math.floor(Math.random() * 10) + 1;
    enemy.health -= damage;
    return damage;
  }

  heal() {
    const healing = Math.floor(Math.random() * 20) + 1;
    this.health += healing;
    return healing;
  }
}

class Enemy {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  attack(player) {
    const damage = Math.floor(Math.random() * this.damage) + 1;
    player.health -= damage;
    return damage;
  }
}

class Animal {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  attack(player) {
    const damage = Math.floor(Math.random() * this.damage) + 1;
    player.health -= damage;
    return damage;
  }
}

class Pet {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  attack(enemy) {
    const damage = Math.floor(Math.random() * this.damage) + 1;
    enemy.health -= damage;
    return damage;
  }
}

class Shop {
  constructor() {
    this.items = [
      { name: 'Health Potion', price: 10, healing: 20 },
      { name: 'Sword', price: 30, damage: 15 },
      // ... (otros artículos)
    ];
  }

  displayItems() {
    m.reply('\nBienvenido a la tienda. Artículos disponibles:');
    this.items.forEach(item => m.reply(`${item.name} - Precio: ${item.price}`));
  }

  buyItem(player, itemName) {
    const item = this.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    
    if (item) {
      if (player.inventory.length < 5) {
        if (player.level >= 2 || item.name !== 'Sword') {
          player.inventory.push(item);
          m.reply(`¡Has comprado ${item.name}!`);
          return true;
        } else {
          m.reply('Necesitas estar en nivel 2 para comprar una espada.');
        }
      } else {
        m.reply('Tu inventario está lleno. Deberías vender algunos artículos antes de comprar más.');
      }
    } else {
      m.reply('Artículo no encontrado en la tienda.');
    }

    return false;
  }
}

class Friend {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.level = 1;
    this.weapon = 'Staff';
    this.inventory = [];
    this.pet = null;
  }
}

const friends = [
  new Friend('Amigo1'),
  new Friend('Amigo2'),
  new Friend('Amigo3')
];

function chooseFriend(player) {
  m.reply('Elige a un amigo para que te acompañe en la aventura:');
  friends.forEach((friend, index) => m.reply(`${index + 1}. ${friend.name} - Salud: ${friend.health}, Nivel: ${friend.level}`));

  rl.question('Ingresa el número del amigo que deseas (1-3): ', (choice) => {
    const selectedFriendIndex = parseInt(choice) - 1;

    if (selectedFriendIndex >= 0 && selectedFriendIndex < friends.length) {
      const selectedFriend = friends[selectedFriendIndex];
      player.friend = selectedFriend;
      m.reply(`Has elegido a ${selectedFriend.name} como tu amigo. ¡Listo para la aventura!\n`);
      exploreWithFriend(player, shop);
    } else {
      m.reply('Selección no válida. Intenta de nuevo.');
      chooseFriend(player);
    }
  });
}

function rescuePrincess(player) {
  m.reply('\n¡Has llegado al castillo donde la princesa está prisionera! Debes rescatarla.');

  rl.question('¿Quieres enfrentarte al guardia del castillo (s/n)?: ', (choice) => {
    if (choice.toLowerCase() === 's') {
      const guard = new Enemy('Guardia del Castillo', 50, 10);
      combat(player, guard, () => {
        m.reply('¡Has derrotado al guardia del castillo!');

        if (player.level <= 10) {
          m.reply('Pero espera... parece que había más enemigos dentro del castillo.');
          explore(player, shop);
        } else {
          m.reply('¡Felicidades, has rescatado a la princesa y completado la aventura!');
          endGame();
        }
      });
    } else {
      m.reply('Decides no enfrentarte al guardia del castillo. Continúas explorando...\n');
      explore(player, shop);
      });
    }
  });
}

function horrorEvent(player) {
  m.reply('\n¡Oh no! Has entrado en un área aterradora. Algo siniestro te rodea.');

  rl.question('¿Quieres investigar (i) o huir (h)?: ', (choice) => {
    if (choice.toLowerCase() === 'i') {
      m.reply('Investigas el área y, a pesar de los sustos, encuentras tesoros escondidos.');
      player.level += 1;
      m.reply(`¡Has superado el nivel de terror! Nivel actual: ${player.level}`);
      explore(player, shop);
    } else if (choice.toLowerCase() === 'h') {
      m.reply('Decides huir del área aterradora. Continúas explorando...\n');
      explore(player, shop);
    } else {
      m.reply('Comando no reconocido. Intenta de nuevo.');
      horrorEvent(player);
    }
  });
}

function jokeEvent(player) {
  m.reply('\n¡Felicidades! Has entrado en un área llena de chistes y risas.');

  rl.question('¿Quieres unirte a la diversión (d) o continuar explorando (c)?: ', (choice) => {
    if (choice.toLowerCase() === 'd') {
      m.reply('Te unes a la diversión y encuentras tesoros mientras te ríes.');
      player.level += 1;
      m.reply(`¡Has superado el nivel de chistes! Nivel actual: ${player.level}`);
      explore(player, shop);
    } else if (choice.toLowerCase() === 'c') {
      m.reply('Prefieres continuar explorando. ¡Que la aventura continúe!\n');
      explore(player, shop);
    } else {
      m.reply('Comando no reconocido. Intenta de nuevo.');
      jokeEvent(player);
    }
  });
}

function specialEvent(player) {
  const eventType = Math.random();

  if (eventType < 0.4) {
    horrorEvent(player);
  } else {
    jokeEvent(player);
  }
}

function combat(player, enemy, onEnemyDefeated) {
  const playerDamage = player.attack(enemy);
  const petDamage = petAttack(player, enemy);
  const friendDamage = player.friend ? player.friend.attack(enemy) : 0;
  const totalDamage = playerDamage + petDamage + friendDamage;

  m.reply(`Has infligido ${playerDamage} de daño al ${enemy.name}.`);
  m.reply(`Tu mascota infligió ${petDamage} de daño al ${enemy.name}.`);
  m.reply(`${player.friend.name} infligió ${friendDamage} de daño al ${enemy.name}.`);
  m.reply(`El ${enemy.name} te ha infligido ${enemy.attack(player)} de daño.`);

  if (player.pet && player.pet.health > 0) {
    m.reply(`La salud de ${player.pet.name}: ${player.pet.health}`);
  }

  if (player.friend && player.friend.health > 0) {
    m.reply(`La salud de ${player.friend.name}: ${player.friend.health}`);
  }

  if (player.health <= 0 && (!player.pet || player.pet.health <= 0) && (!player.friend || player.friend.health <= 0)) {
    m.reply('¡Has sido derrotado! Fin del juego.');
    rl.close();
  } else if (enemy.health <= 0) {
    m.reply(`¡Has derrotado al ${enemy.name}!`);
    onEnemyDefeated();
  } else {
    rl.question('¿Quieren atacar de nuevo (a), usar una poción de salud (p) o usar un artículo del inventario (u)?: ', (choice) => {
      if (choice.toLowerCase() === 'a') {
        combat(player, enemy, onEnemyDefeated);
      } else if (choice.toLowerCase() === 'p') {
        const healing = player.heal();
        m.reply(`Has usado una poción de salud y te has curado ${healing} puntos.`);
        combat(player, enemy, onEnemyDefeated);
      } else if (choice.toLowerCase() === 'u') {
        useInventory(player);
      } else {
        m.reply('Comando no reconocido. Intenta de nuevo.');
        combat(player, enemy, onEnemyDefeated);
      }
    });
  }
}

// Resto del código...

startGame();



handler.help = ['aventura']
handler.tags = ['game']
handler.command = ['aventura']

export default handler