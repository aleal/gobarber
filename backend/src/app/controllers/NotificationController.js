import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
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
    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
