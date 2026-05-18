 export const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

  const data = await res.json();

  return data;
};

 export const fetchLimitPetCard = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card`);

  const data = await res.json();

  return data;
}; 