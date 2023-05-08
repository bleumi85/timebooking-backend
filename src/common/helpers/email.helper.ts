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
    Logger.warn(
      `Send E-Mail to ${user.email} from ${origin}`,
      'Email (verification)',
    );
  }

  public async sendPasswordResetEmail(user: User, origin: string) {
    Logger.warn(
      `Send E-Mail to ${user.email} from ${origin}`,
      'Email (password reset)',
    );
  }
}
