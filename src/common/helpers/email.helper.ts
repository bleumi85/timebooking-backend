import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/api/users/entities';

@Injectable()
export class EmailHelper {
  public async sendAlreadyRegisteredEmail(email: string, origin: string) {
    Logger.warn(
      `Send E-Mail to ${email} from ${origin}`,
      'Email (already registered)',
    );
  }

  public async sendVerificationEmail(user: User, origin: string) {
    let message: string;
    if (origin) {
      const verifyUrl = `${origin}/user/verify-email?token=${user.verificationToken}`;
      message = `<p>Please click the below link to verify your email address:</p>
                 <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
      message = `<p>Please use the below token to verify your email address with the <code>/user/verify-email</code> api route:</p>
                 <p><code>${user.verificationToken}</code></p>`;
    }

    console.log(message)

    Logger.warn(
      `Send E-Mail to ${user.email} from ${origin}`,
      'Email (verification)',
    );
  }

  public async sendPasswordResetEmail(user: User, origin: string) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/user/reset-password?token=${user.resetToken}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/user/reset-password</code> api route:</p>
                   <p><code>${user.resetToken}</code></p>`;
    }

    console.log(message);

    Logger.warn(
      `Send E-Mail to ${user.email} from ${origin}`,
      'Email (password reset)',
    );
  }
}
