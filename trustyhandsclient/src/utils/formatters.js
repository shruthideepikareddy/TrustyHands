export const capitalize = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const generateRandomRating = (workerId) => {
  const seed = workerId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = ((seed * 9301 + 49297) % 233280) / 233280;
  return Math.round((3 + random * 2) * 10) / 10;
};
