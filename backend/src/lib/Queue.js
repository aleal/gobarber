import BeeQ from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];
class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key }) => {
      this.queues[key] = new BeeQ(key, {
        redis: redisConfig,
      });
    });
  }

  add(key, job) {
    return this.queues[key].createJob(job).save();
  }

  process() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key].on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
