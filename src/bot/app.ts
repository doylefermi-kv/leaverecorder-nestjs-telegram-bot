import * as TelegramBot from 'node-telegram-bot-api';
import * as chrono from 'chrono-node';
import axios from 'axios';
import { DateTime } from 'luxon';
import { exception } from 'console';

export function runBot() {
  const token = '';

  const bot = new TelegramBot(token, { polling: true });
  console.log('Bot is running: ...');

  bot.on('message', async (msg) => {
    console.log('Received: ', JSON.stringify(msg));
    if (msg.chat.id != -508878897 || !msg.text) {
      return;
    }

    const messageText = msg.text;

    try {
      const parsedText = chrono.parse(messageText);
      const startDate = parsedText[0].start.date();
      let endDate;
      if (parsedText[0].end == null) {
        endDate = DateTime.fromISO(startDate.toISOString())
          .endOf('day')
          .toISO();
      } else {
        endDate = parsedText[0].end.date();
      }

      const parsedStartDate = DateTime.fromISO(startDate.toISOString()).toISO();
      const parsedEndDate = endDate;

      console.log('Parsed date: ', parsedStartDate, parsedEndDate);

      if (parsedEndDate == null) {
        throw new exception("Couldn't obtain end date.");
      }

      const responseToUser = `Shall I go ahead with this date?
                              \nStart date: ${parsedStartDate}
                              \nEnd date: ${parsedEndDate}`;

      bot.sendMessage(msg.chat.id, responseToUser, {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Okay',
                callback_data: 'Yes',
              },
              {
                text: 'Nope',
                callback_data: 'No',
              },
            ],
          ],
        },
      });
    } catch (error) {
      bot.sendMessage(msg.chat.id, "I am sorry, I didn't get you.", {
        reply_to_message_id: msg.message_id,
      });
      return;
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const category = callbackQuery.data;

    let text: string;
    const opts = {
      chat_id: message.chat.id,
      message_id: message.message_id,
    };

    if (category == 'No') {
      text = `Leave cancelled by user: ${message.reply_to_message.from.username}`;
      bot.editMessageText(text, opts);
      return;
    }

    const leaveMessage = message.reply_to_message.text;

    const parsedText = chrono.parse(leaveMessage);
    const startDate = parsedText[0].start.date();
    let endDate;
    if (parsedText[0].end == null) {
      endDate = DateTime.fromISO(startDate.toISOString()).endOf('day').toISO();
    } else {
      endDate = parsedText[0].end.date();
    }

    const parsedStartDate = DateTime.fromISO(startDate.toISOString()).toISO();
    const parsedEndDate = endDate;

    const recordLeave = {
      telegramId: message.reply_to_message.from.id,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    };

    const localHost = process.env.PORT //TODO: Environment file for deployment
      ? ''
      : 'http://localhost:5000';

    try {
      const response = await axios.post(
        localHost.concat('/employee-demo/leave'),
        recordLeave,
      );
      console.log(
        'Fired request: ',
        JSON.stringify(recordLeave),
        'and got: HTTP',
        response.status,
      );
    } catch (error) {
      console.error(error);
      text = `Leave rejected by bot: ${error}`;
      bot.editMessageText(text, opts);
      return;
    }

    text = `Leave accepted: ${message.reply_to_message.from.username}
    \nStart date: ${parsedStartDate}
    \nEnd date: ${parsedEndDate}`;

    bot.editMessageText(text, opts);
  });
}
