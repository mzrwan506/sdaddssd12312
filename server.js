const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config(); // لتحميل متغيرات البيئة من ملف .env

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // تجاهل الرسائل من البوت نفسه
  if (message.author.bot) return;

  // أمر "!callup" مع السبب
  if (message.content.startsWith('!callup')) {
    const args = message.content.split(' ').slice(1);
    const reason = args.join(' ') || 'لم يتم ذكر سبب الاستدعاء.';

    const embed = new EmbedBuilder()
      .setColor('#FF4500')
      .setTitle('Liberty City Call Up System')
      .setDescription(`
        مرحبا، تم استدعاؤك! 🎉
        **سبب الاستدعاء:** ${reason}
        **اسم الشخص:** ${message.author.username}
      `)
      .setFooter({ text: 'Liberty City CFW' })
      .setTimestamp();

    await message.channel.send({ content: '@here', embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN); // توكن البوت يتم تحميله من ملف البيئة
