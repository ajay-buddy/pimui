export function Required(value) {
  return value || value === 0 || value === false ? true : false;
}

export function DateGreater(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return e > s;
}

export default function Validate(rules, value, data = {}) {
  const errors = [];
  rules.forEach((rule) => {
    switch (rule.type) {
      case "REQUIRED": {
        if (!Required(value)) {
          errors.push({ message: rule.message });
        }
        return;
      }
      case "DATEGREATER": {
        if (!DateGreater(data[rule.key], value)) {
          errors.push({ message: rule.message });
        }
      }
    }
  });
  return errors;
}
