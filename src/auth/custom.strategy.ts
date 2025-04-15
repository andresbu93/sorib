import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  private client = new OAuth2Client(
    '596604034583-ql2p4g0071spufsmrfn9bak4ovm68vo8.apps.googleusercontent.com',
  );

  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.replace('Bearer ', '');

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience:
          '596604034583-ql2p4g0071spufsmrfn9bak4ovm68vo8.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      return { email: payload.email, name: payload.name, userId: payload.sub };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
