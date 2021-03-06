/*
registers/worldGen.js generate the ore forms of the gems: ore 
*/

var OreGenerator = {
	aquamarine: {
		enabled: true,
		count: 15,
		size: 6,
		minHeight: 0,
        maxHeight: 68
	},
	galaxite: {
		enabled: true,
		count: 15,
		size: 8,
		minHeight: 0,
        maxHeight: 68
	},
	lonsdaleite: {
		enabled: true,
		count: 15,
		size: 2,
		minHeight: 0,
        maxHeight: 68
	},
	zircon: {
		enabled: true,
		count: 11,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	zirconia: {
		enabled: true,
		count: 4,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	}
	
	
};


for (var index = 0; index < GEMS_LEN; index++){
    var gem = GEMS[index];
    // Generate ore
    var BLOCK_ID_NAME = createIDName(gem, "ore");
    IDRegistry.genBlockID(BLOCK_ID_NAME);
    Block.createBlock(BLOCK_ID_NAME, [
        {name: createNameReadable(gem, "ore"), texture: [[createTexName(gem, "ore"), 0]], inCreative: true}
    ], "opaque");
    ToolAPI.registerBlockMaterial(BlockID[BLOCK_ID_NAME], "stone", 2);
    Block.setDestroyTime(BlockID[BLOCK_ID_NAME], 3);
	Block.setDestroyLevel(BLOCK_ID_NAME, 2);
	

}

function dropGem(coords, blockID, level, enchant, gemID, desiredLevel){
	if(level > (desiredLevel-1)){
		if(enchant.silk){
			return [[blockID, 1, 0]];
		}
		var drop = [[ItemID[gemID], 1, 0]];
		if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
		ToolAPI.dropOreExp(coords, 12, 28, enchant.experience);
		return drop;
	}
	return [];
}


Block.registerDropFunction("oreAquamarine", function(coords, blockID, blockData, level, enchant){
	return dropGem(coords, blockID, level, enchant, "aquamarine", 3);
}, 4);
Block.registerDropFunction("oreGalaxite", function(coords, blockID, blockData, level, enchant){
	return dropGem(coords, blockID, level, enchant, "galaxite", 2);
}, 4);
Block.registerDropFunction("oreLonsdaleite", function(coords, blockID, blockData, level, enchant){
	return dropGem(coords, blockID, level, enchant, "lonsdaleite", 4);
}, 4);
Block.registerDropFunction("oreZircon", function(coords, blockID, blockData, level, enchant){
	return dropGem(coords, blockID, level, enchant, "zircon", 2);
}, 4);
Block.registerDropFunction("oreZirconia", function(coords, blockID, blockData, level, enchant){
	return dropGem(coords, blockID, level, enchant, "zirconia", 3);
}, 4);

Callback.addCallback("PostLoaded", function(){
    for (var index = 0; index < GEMS_LEN; index++){
        var gem = GEMS[index];
        var BLOCK_ID_NAME = createIDName(gem, "ore");
        if(OreGenerator[gem].enabled){
            Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
                for(var i = 0; i < OreGenerator[gem].count; i++){
                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, OreGenerator[gem].minHeight, OreGenerator[gem].maxHeight);
                    GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[BLOCK_ID_NAME], 0, OreGenerator[gem].size);
                }
            });
        }
    }
});