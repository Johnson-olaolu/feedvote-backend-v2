import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const nodeMailerConfig = {
  useFactory: async () => ({
    transport: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    defaults: {
      from: `<sent_from_${process.env.EMAIL_USER}>`,
    },
    template: {
      dir: join(__dirname, './templates/emails'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
};
