var countType = require('countType');

module.exports ={
	init: function()
	{
		if(Memory.factoryInit != undefined)
			return;

		Memory.factoryInit = true;
		this.memory();
	},

	run: function()
	{
		this.spawnRequiredScreeps();
	},

	memory: function() {
		if(Memory.spawnQue == undefined)
			Memory.spawnQue = [ ];

		if(Memory.sources == undefined)
			Memory.sources = { };

		if(Memory.requiredScreeps == undefined)
		{
			Memory.requiredScreeps = [
				'miner',
				'miner',
				'miner',
				'miner',
				'miner'
			];
		}
	},

	spawnRequiredScreeps: function()
	{
		var requiredScreeps = Memory.requiredScreeps;

		var gatheredScreeps = { };
		for(var index in requiredScreeps)
		{
			var type = requiredScreeps[index];
			if(gatheredScreeps[type] == undefined)
				gatheredScreeps[type] = 0;

			var neededToSkip = gatheredScreeps[type] + 1;

			if(neededToSkip > countType(type, true))
			{
				Memory.spawnQue.push(type);
			}

			gatheredScreeps[type]++;
		}
	}
};