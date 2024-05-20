const verifyButton = document.getElementById("verify-button");
const confirmButton = document.getElementById("confirm-button");
const phoneNumber = document.getElementById("phoneNumber");
const code1 = document.getElementById("code1");
const code2 = document.getElementById("code2");
const code3 = document.getElementById("code3");
const code4 = document.getElementById("code4");
const code5 = document.getElementById("code5");
const code6 = document.getElementById("code6");
const phoneForm = document.getElementById("phoneForm");
const codeForm = document.getElementById("codeForm");
const phoneError = document.getElementById("phoneError");
const settingsError = document.getElementById("settingsError");

class Validator {
  constructor() {}

  phone = (phone) => {
    return phone.startsWith("+") && phone.indexOf(" ") > 0;
  };
}

class Element {
  __element;

  constructor(selector) {
    this.__element = this.__get(selector);
  }

  __get = (selector) => {
    return document.getElementById(selector);
  };

  addClass = (className) => {
    this.__element.classList.add(className);
    return this;
  };
  removeClass = (className) => {
    this.__element.classList.remove(className);
    return this;
  };
  html = (content) => {
    this.__element.innerHTML = content;
    return this;
  };
}

class Form {
  __form;
  __show;
  __valid;

  constructor(form) {
    this.__form = form;
  }

  validate = () => {};

  isValid = () => {
    return this.__valid;
  };

  hide = () => {
    this.__show = false;
  };
  show = () => {
    this.__show = true;
  };
}

class App {
  __configs;
  __validator;

  constructor(configs) {
    this.__configs = configs;
    this.__validator = new Validator();
  }

  __throwError = () => {};

  __checkParams = (params) => {};

  __parseParams = () => {
    const params = window.location.search.replace("?", "").split("&");
    const parsed = {};
    params.map((param) => {
      const [key, value] = param.split("=");
      parsed[key] = value;
      return { [key]: value };
    });
    return parsed;
  };

  init = () => {
    const params = this.__parseParams();
    const checked = this.__checkParams(params);
    if (checked) {
    }
  };
}

function validateParams(params) {
  settingsError.classList.add("hide");
  const missing = [];
  if (!params.client_id) {
    missing.push("'client_id'");
  }
  if (!params.redirect_url) {
    missing.push("'redirect_url'");
  }
  if (!params.state) {
    missing.push("'state'");
  }

  if (missing.length) {
    settingsError.classList.remove("hide");
    settingsError.innerHTML = "Missing " + missing.join(", ");
  }

  return !missing.length;
}

async function callPhoneAuth(phone) {
  verifyButton.disabled = true;
  verifyButton.innerText = "Sending";
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      verifyButton.disabled = false;
      verifyButton.innerHTML = "Verify";
      resolve("Error");
    }, 3000);
  });
}

function validateCodeAuth(phone, code) {
  console.log("Validate", phone, code);
}

function setCodeFocus(event) {
  if (event.target.value) {
    if (isNaN(event.target.value)) {
      // Not valid
      event.target.classList.remove("valid");
      event.target.value = null;
      return;
    }
    event.target.classList.add("valid");

    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.focus();
    }
  }

  if (!event.target.value && event.target.previousElementSibling) {
    event.target.classList.remove("valid");
    event.target.previousElementSibling.focus();
  }
}

function init() {
  // Configs
  const params = window.location.search.replace("?", "").split("&");
  const options = {};
  const pairs = params.map((param) => {
    const [key, value] = param.split("=");
    options[key] = value;
    return { [key]: value };
  });
  if (!validateParams(options)) {
    verifyButton.disabled = true;
    phoneNumber.disabled = true;
    return;
  }

  code1.addEventListener("keyup", (event) => setCodeFocus(event));
  code2.addEventListener("keyup", (event) => setCodeFocus(event));
  code3.addEventListener("keyup", (event) => setCodeFocus(event));
  code4.addEventListener("keyup", (event) => setCodeFocus(event));
  code5.addEventListener("keyup", (event) => setCodeFocus(event));
  code6.addEventListener("keyup", (event) => setCodeFocus(event));

  verifyButton.addEventListener("click", async (event) => {
    event.preventDefault();
    phoneError.classList.add("hide");

    const value = phoneNumber.value;
    if (!validatePhone(value)) {
      phoneError.classList.remove("hide");
      phoneError.innerHTML = "Phone number is not correct formatted";
      return;
    }
    try {
      await callPhoneAuth(phoneNumber.value);

      phoneForm.classList.add("hide");
      codeForm.classList.remove("hide");
      code1.focus();
    } catch (error) {
      console.log(error);
      phoneError.innerHTML = "Could not verify phone. Please try again";
      phoneError.classList.remove("hide");
    }
  });

  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    const value = [
      code1.value,
      code2.value,
      code3.value,
      code4.value,
      code5.value,
      code6.value,
    ];
    const valueAsString = value.join("");
    if (valueAsString.length === 6) {
      validateCodeAuth(phoneNumber.value, valueAsString);
    }
  });
}

init();
