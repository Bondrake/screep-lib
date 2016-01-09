var countType = require('n2_countType')

module.exports = {
  init: function () {
    if (Memory.factoryInit !== undefined)
      return

    Memory.factoryInit = true
    this.memory()
  },

  memory: function () {
    if (Memory.spawnQue === undefined)
      Memory.spawnQue = []

    if (Memory.sources === undefined)
      Memory.sources = { }

    if (Memory.requiredScreeps === undefined) {
      Memory.requiredScreeps = [
        // Main Game
        'miner', // 1
        'transporter', // 1
        'miner', // 2
        'transporter', // 2
        'transporter', // 3
        'builder', // 1
        'booster', // 1
        'transporter', // 4
        'booster', // 2
      ]
    }
  },

  run: function () {
    this.buildSpawnQueue()
  },

  buildSpawnQueue: function () {
    var requiredScreeps = Memory.requiredScreeps

    var gatheredScreeps = { }
    for (var index in requiredScreeps) {
      var type = requiredScreeps[index]
      if (gatheredScreeps[type] === undefined)
        gatheredScreeps[type] = 0

      var neededToSkip = gatheredScreeps[type] + 1

      var found = countType(type, true)
      if (neededToSkip > countType(type, true)) {
        Memory.spawnQue.push(type)
      }

      gatheredScreeps[type]++
    }
  },

  buildArmyWhileIdle: function () {
    for (var i in Game.spawns) {
      var spawn = Game.spawns[i]
      if (!spawn.spawning && Memory.spawnQue.length === 0 && spawn.energy / spawn.energyCapacity >= .6) {
        var archers = countType('archer', true)
        var healers = countType('healer', true)

        if (healers / archers < .25)
          require('n1_spawner').spawn('healer', { }, spawn)
        else
          require('n1_spawner').spawn('archer', { }, spawn)
      }
    }
  }
}
