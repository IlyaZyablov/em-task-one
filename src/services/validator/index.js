export default class ValidatorService {
  static data = {
    login: {
      minLength: 3,
      maxLength: 25,
      validate(login) {
        if (typeof login !== 'string' || login.length < this.minLength || login.length > this.maxLength) {
          return { result: 'error', data: `Логин должен быть от ${this.minLength} до ${this.maxLength} символов!` };
        }

        return { result: 'success' };
      },
    },
    password: {
      minLength: 3,
      maxLength: 25,
      validate(password) {
        if (typeof password !== 'string' || password.length < this.minLength || password.length > this.maxLength) {
          return { result: 'error', data: `Пароль должен быть от ${this.minLength} до ${this.maxLength} символов!` };
        }

        return { result: 'success' };
      },
    },
    email: {
      validate(email) {
        const match = String(email)
          .toLowerCase()
          .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (match === null) {
          return { result: 'error', data: 'Введите корректный email!' };
        }

        return { result: 'success' };
      },
    },
    age: {
      validate(age) {
        if (typeof age !== 'string' || Number.isNaN(parseInt(age, 10))) {
          return { result: 'error', data: 'Введите корректный возраст!' };
        }

        return { result: 'success' };
      },
    },
  };

  static check(dataToCheck) {
    const keysArray = ['login', 'password', 'email', 'age'];

    let validateData = { result: 'success' };
    for (let i = 0; i < keysArray.length; i++) {
      const key = keysArray[i];

      const localData = ValidatorService.data[key].validate(dataToCheck[key]);

      if (localData.result === 'error') {
        validateData = localData;
        break;
      }
    }

    return validateData;
  }
}
