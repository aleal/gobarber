import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const pageSize = 5;
    const appointments = await Appointment.findAll({
      where: {
        user_id: res.locals.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date'],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: ['date'],
      include: {
        model: User,
        as: 'provider',
        attributes: ['id', 'name'],
        include: {
          model: File,
          as: 'avatar',
          attributes: ['url', 'path'],
        },
      },
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const { provider_id, date } = req.body;
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'You can only create appointments with providers' });
    }
    const parsedDate = startOfHour(parseISO(date));
    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    const notIsAvailable = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: parsedDate,
      },
    });
    if (notIsAvailable) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }
    const appointment = await Appointment.create({
      user_id: res.locals.userId,
      provider_id,
      date: parsedDate,
    });
    return res.json(appointment);
  }
}
export default new AppointmentController();
