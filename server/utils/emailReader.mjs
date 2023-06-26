import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { GeneratePassword } from 'js-generate-password';
import User from '../models/User.mjs';
import Ticket from '../models/Ticket.mjs';
import Comment from '../models/Comment.mjs';
import Counter from '../models/Counter.mjs';

const imapConfig = {
  user: process.env.EMAIL_READER_EMAIL,
  password: process.env.EMAIL_READER_PASSWORD,
  host: process.env.EMAIL_READER_IMAP,
  port: process.env.EMAIL_READER_PORT,
  tls: true,
  tlsOptions: { servername: process.env.EMAIL_READER_IMAP },
};

const emailReader = () => {
  try {
    const imap = new Imap(imapConfig);
    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results || !results.length) {
            console.log('No results found');
            imap.end();
            return;
          }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, async (error, parsed) => {
                const { from, subject, text } = parsed;
                const email = from.value[0]?.address;
                const name = from.value[0]?.name;
                const ticketPattern = /\[Ticket:\s*(\d+)\]/;
                const ticketMatch = subject.match(ticketPattern);
                let user;

                user = await User.findOne({ email: email });

                if (!user) {
                  const password = GeneratePassword({
                    length: 15,
                    symbols: true,
                  });

                  user = await User.create({
                    email: email,
                    name: name,
                    password: password,
                    passwordConfirm: password,
                  });
                }

                const comment = await Comment.create({
                  author: user.id,
                  content: text,
                  private: false,
                });

                if (ticketMatch) {
                  const ticketNumber = ticketMatch[1];

                  await Ticket.findByIdAndUpdate(
                    ticketNumber,
                    { $push: { comments: comment._id } },
                    {
                      new: true,
                      runValidators: true,
                    },
                  );
                } else {
                  const counter = await Counter.findOneAndUpdate(
                    { id: 'ticketCounter' },
                    { $inc: { count: 1 } },
                    { new: true },
                  );
                  await Ticket.create({
                    _id: `${counter.count}`,
                    title: subject,
                    description: subject,
                    requester: user.id,
                    comments: [comment._id],
                  });
                }
              });
            });
            msg.once('attributes', (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ['\\Seen'], () => {
                // Mark the email as read after reading it
                console.log('Marked as read!');
              });
            });
          });
          f.once('erroror', (ex) => {
            return Promise.reject(ex);
          });
          f.once('end', () => {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
      });
    });

    imap.once('error', (err) => {
      console.log(err);
    });

    imap.once('end', () => {
      console.log('Connection ended');
    });

    imap.connect();
  } catch (ex) {
    console.log('an error occurred');
  }
};

export default emailReader;
