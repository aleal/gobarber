import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    const { name, email } = appointment.provider;
    await Mail.senDdMail({
      to: `${name} <${email}>`,
      subject: 'Appointment canceled',
      template: 'cancelation',
      context: {
        provider: name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "MMMM dd 'at' hh:mm a"),
      },
    });
  }
}

export default new CancellationMail();
