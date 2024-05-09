import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const senMail = async (adres: string, content: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'mirxonjonismanov152@gmail.com',
        pass: 'hyciickteseafbos',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transport.sendMail({
      from: 'mirxonjonismanov152@gmail.com',
      to: adres,
      subject: content,
      text: content,
    });
  } catch (error) {
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
};

export default senMail;