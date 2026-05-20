 export const fetchPets = async (searchTerm = '') => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?search=${searchTerm}`);

  const data = await res.json();

  return data;
};

 export const fetchLimitPetCard = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card`);

  const data = await res.json();

  return data;
}; 

export const addCourse = async (formData) => {
  const courseData = {
    title: formData.get('title'),
    description: formData.get('description'),
    thumbnail: formData.get('thumbnail'),
    category: formData.get('category'),
    price: parseFloat(formData.get('price')),
    duration: formData.get('duration'),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });

  if (!res.ok) {
    throw new Error('Failed to add course');
  }

  return res.json();
};