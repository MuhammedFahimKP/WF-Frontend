import { DynamicObj, MonthType } from "@/types";

const errorFieldName: DynamicObj = {
  email: "Email",
  first_name: "Name",
  last_name: "Name",
  password: "Password",
  password2: "Confirm Password",
};

const getDateAndDay = (dateToGet: string | Date): [string, string] => {
  const date = new Date(dateToGet);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() returns month from 0-11, so add 1
  const day = date.getUTCDate().toString().padStart(2, "0");

  // Getting the day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];

  const formattedDate = `${year}-${month}-${day}`;

  return [dayOfWeek, formattedDate];
};

const getDateAndTime = (date: string | Date) => {
  const convertedDate = new Date(date);
  const dateAndTime = convertedDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 24-hour format
  });

  const [_date, time] = dateAndTime.split(",");

  return `${_date} at ${time}`;
};

const getDateTimeFromTimeStamp = (date: string | Date | null) => {
  const newDate = date ? new Date(date) : null;

  return newDate
    ? newDate.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 24-hour format
      })
    : null;
};

export function generateYearsFromStart(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
}

export function getMonthsForYear(year: number): MonthType[] {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0 for January, so add 1
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February " },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  if (year === currentYear) {
    return months.slice(0, currentMonth);
  }

  return months;
}

export function makeObjFromArray<T extends string | number>(
  array: T[]
): { [key in T]: T } {
  return array.reduce((obj, item) => {
    obj[item] = item;
    return obj;
  }, {} as { [key in T]: T });
}

export function SignupValidator(key: string, value: string) {
  if (key === "email" && value !== "") {
    const regex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    if (!regex.test(value)) {
      return "Invalid Email";
    }
  }

  if (key === "first_name" && value !== "") {
    if (value.length < 4) {
      return `not a valid ${errorFieldName[key]}`;
    }
  }

  if (key === "last_name" && value !== "") {
    if (value.length < 2) {
      return `not a valid ${errorFieldName[key]}`;
    }
  }

  if (key === "password") {
    var alphaRegex = /[a-zA-Z]/;
    var numericRegex = /[0-9]/;

    if (value !== "" && !alphaRegex.test(value) && !numericRegex.test(value)) {
      return "Password must contain alphanumeric Characters";
    }

    if (value !== "" && value.length < 8) {
      return "Passowrd must be 8 charaters";
    }
  }

  return "";
}

export function checkAnyCahngeOccured<T extends Object>(obj1: T, obj2: T) {
  const changedValues: Partial<T> = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        changedValues[key as keyof T] = obj2[key];
      }
    }
  }

  if (Object.keys(changedValues).length === 0) {
    return false;
  } else {
    return changedValues as T;
  }
}

export function setEmptyField(formObj: DynamicObj, setFromErrorObj: Function) {
  return new Promise<void>((resolve) => {
    console.log("inside form validator");
    for (const key in formObj) {
      if (formObj[key] === "") {
        console.log(key);
        setFromErrorObj((p: DynamicObj) => {
          const newError = { ...p };
          newError[key] = `please provide a ${errorFieldName[key]}`;
          return newError;
        });
      }
    }
    console.log("loop ended");
    resolve(); // Resolve the promise when the loop completes
  });
}

export function makeArrayFromRange(range: number): number[] {
  const arr = Array.from({ length: range }, (_, i) => i + 1);
  return arr;
}

export function getAllSearchParams(params: URLSearchParams) {
  const paramsObj: { [key: string]: string | string[] } = {};

  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
}

export function createQueryParamString(params: {
  [key: string]: string | string[];
}): string {
  // Initialize an array to hold the query parameter strings
  const queryParams: string[] = [];

  // Iterate through the params object
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];

      // Check if the value is an array
      if (Array.isArray(value)) {
        // Iterate through the array and add each value as a separate query param
        value.forEach((val) =>
          queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          )
        );
      } else {
        // Add the single value query param
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  // Join all query param strings with '&' to create the final query string
  return "?" + queryParams.join("&");
}

export {
  errorFieldName,
  getDateAndDay,
  getDateAndTime,
  getDateTimeFromTimeStamp,
};
