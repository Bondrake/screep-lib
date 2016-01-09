var factory = require('n1_factory')
var spawner = require('n1_spawner')
var performRoles = require('n1_performRoles')

factory.init()
factory.run()
spawner.spawnNextInQue()
//factory.buildArmyWhileIdle()
performRoles(Game.creeps)
