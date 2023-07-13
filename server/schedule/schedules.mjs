import schedule from 'node-schedule';
import emailReader from '../utils/emailReader.mjs';
import Ticket from '../models/Ticket.mjs';

const schedules = () => {
  //Emailer Reader Scheduler - current every 1 min in dev -
  //   schedule.scheduleJob('*/1 * * * *', () => {
  //     emailReader();
  //     console.log('Running Email Reader Scheduler!');
  //   });

  // Ticket Closing Job
  // Runs once per day at midnight
  // closes any solved tickets that have not been updated in the past 5 days
  schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 5);

    await Ticket.updateMany(
      {
        updatedAt: { $lte: currentDate },
        status: 'Solved',
      },
      { updaterName: 'System Update', updaterId: 'System', status: 'Closed' },
    );
  });
};

export default schedules;
