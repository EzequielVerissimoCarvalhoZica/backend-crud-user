import {
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Validations from 'src/helpers/fieldsValidations';
import ILoginBody from 'src/types/interfaces/ILoginBody';
import { User } from 'src/user/user.entity';

interface IRequestLogin extends Request, ILoginBody {}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: IRequestLogin, _res: Response, next: NextFunction) {
    const user = new User();
    if (!(req.body.email && req.body.password))
      throw new UnprocessableEntityException();

    user.email = req.body.email;
    user.password = req.body.password;
    const validations = new Validations(user);

    if (!(validations.validEmail() && validations.validPassword()))
      throw new UnprocessableEntityException();

    next();
  }
}
