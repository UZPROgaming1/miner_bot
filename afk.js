const mineflayer = require('mineflayer')

// Bot O`zbeklarning hypixel serveriga to`g`irlangan
const bot = mineflayer.createBot({
    host: 'ir.skyblock.uz', 
    port: 25566,
    version: 1.18,
    username: 'Botning niki'  
})


// Serverda login plugini bo`lsa qo`shtirnoqlar ichiga parol yozing
let password = "Botning paroli" 

// Bu yerga tegish shart emas
bot.on('messagestr', (message) => {
    console.log(message)

    if (message.includes("/register")) {
        bot.chat(`/register $<password> $<password>`)  
    }
    
    if (message.includes("/login")) {
        bot.chat(`/login $<password>`)
    }
})

// Bu kodlar miner bot kodlari (o`zgartirish shart emas!)
async function dig() {
    if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
        var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe')) [0];
        if (pickaxe) await bot.equip(pickaxe, 'hand') 
        if (!pickaxe) bot.quit();
    }
    var block = bot.blockAtCursor(7);
    if (!block) return setTimeout(function () {
        dig();
    }, 100);
    await bot.dig(block, 'ignore', 'raycast')
    dig()
}

// Serverda tpa plugini bo`lsa sizning yoningizga tpa qilish kodlari (Nikingizni qo`shtirnoq ichiga yozing) 
bot.on('chat', (username, message) => {
    if (username == 'Sizning nikingiz')  {
        if (message == 'tpa1') return
        bot.chat('/tpa Sizning nikingiz')
    }
})
// Botga ishlash buyrug`ini berish 
bot.on('chat', (username, message) => {
    if (username == 'Sizning nikingiz')  {
        if (message == 'dig1') {
            dig();
        }
    }
})
// Bu botning kirkasi sinsa serverdan chiqib ketadi