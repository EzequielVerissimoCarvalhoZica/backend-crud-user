import { User } from 'src/user/user.entity';

export default class Validations {
  constructor(private user: User) {}

  validEmail = (): boolean => {
    const { email } = this.user;
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!String(email).toLowerCase().match(regEx)) {
      return false;
    }
    return true;
  };

  validName = (): boolean => {
    const { name } = this.user;

    return typeof name === 'string' && name.length >= 6;
  };

  validPassword = (): boolean => {
    const { password } = this.user;

    return typeof password === 'string' && password.length >= 6;
  };

  validRole = (): boolean => {
    const { role } = this.user;

    return typeof role === 'string' && (role === 'admin' || role === 'client');
  };

  validPhoneNumber = (): boolean => {
    const { phoneNumber } = this.user;

    return typeof phoneNumber === 'string' && phoneNumber.length === 12;
  };

  validDateOfBirth = (): boolean => {
    const { dateOfBirth } = this.user;
    // INPUT "1998-12-29"
    const regEx = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateOfBirth.match(regEx)) return false;

    return true;
  };

  validStatus = (): boolean => {
    const { status } = this.user;

    return typeof status === 'boolean';
  };
}

// formatDate = (date: string) => {
//   // INPUT "1998-12-29"
//   const newDate = new Date(date).toISOString();

//   // OUTPUT '1998-12-29T00:00:00.000Z'
// };
