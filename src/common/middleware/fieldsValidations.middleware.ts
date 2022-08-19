import {
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Validations from 'src/helpers/fieldsValidations';
import ILoginBody from 'src/types/interfaces/ILoginBody';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
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

interface IRequestCreate extends Request, UserCreateDto {}

@Injectable()
export class CreateMiddleware implements NestMiddleware {
  use(req: IRequestCreate, _res: Response, next: NextFunction) {
    const { name, password, email, dateOfBirth, phoneNumber, status } =
      req.body;

    if (!Validations.validBodyRequest(req.body)) {
      throw new UnprocessableEntityException();
    }

    const user = new User();
    if (!(email && password && name && dateOfBirth && phoneNumber)) {
      throw new UnprocessableEntityException();
    }

    user.email = email;
    user.password = password;
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;
    user.status = status || true;

    const validations = new Validations(user);

    if (
      !(
        validations.validEmail() &&
        validations.validPassword() &&
        validations.validName() &&
        validations.validDateOfBirth() &&
        validations.validPhoneNumber() &&
        validations.validStatus()
      )
    )
      throw new UnprocessableEntityException();

    next();
  }
}

@Injectable()
export class UpdateMiddleware implements NestMiddleware {
  use(req: IRequestCreate, _res: Response, next: NextFunction) {
    const { name, password, email, dateOfBirth, phoneNumber, status } =
      req.body;

    const user = new User();
    if (!(email || password || name || dateOfBirth || phoneNumber)) {
      throw new UnprocessableEntityException();
    }

    user.email = email;
    user.password = password;
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;
    user.status = status || true;

    const validations = new Validations(user);
    if (!Validations.validBodyRequest(req.body)) {
      throw new UnprocessableEntityException();
    }
    if (email) {
      if (!validations.validEmail()) {
        throw new UnprocessableEntityException();
      }
    }
    if (password) {
      if (!validations.validPassword()) {
        throw new UnprocessableEntityException();
      }
    }
    if (name) {
      if (!validations.validName()) {
        throw new UnprocessableEntityException();
      }
    }
    if (dateOfBirth) {
      if (!validations.validDateOfBirth()) {
        throw new UnprocessableEntityException();
      }
    }
    if (phoneNumber) {
      if (!validations.validPhoneNumber()) {
        throw new UnprocessableEntityException();
      }
    }
    if (status) {
      if (!validations.validStatus()) {
        throw new UnprocessableEntityException();
      }
    }

    next();
  }
}
