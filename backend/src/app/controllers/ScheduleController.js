import { Op } from 'sequelize';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { userId } = res.locals;
    const userIsProvider = await User.findOne({
      where: {
        id: userId,
        provider: true,
      },
    });
    if (!userIsProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });
    return res.json(appointments);
  }
}

export default new ScheduleController();
