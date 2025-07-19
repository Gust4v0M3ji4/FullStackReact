import type { UserType } from "@/types/user";

const defaultUser: UserType = {
  name: "Coding Bootcamps Espol",
  age: 19,
  occupation: "Student",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThoowpLMiqpKbqfpW3sPWudVzvdtXZV1R2vA&s",
};

export function getUser(): UserType | null {
  const data = localStorage.getItem("user");
  if (!data) return defaultUser;
  try {
    return JSON.parse(data) as UserType;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return defaultUser;
  }
}

export function setUser(user: UserType) {
  localStorage.setItem("user", JSON.stringify(user));
}
