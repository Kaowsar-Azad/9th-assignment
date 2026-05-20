export const fetchPets = async (searchTerm = '', category = '') => {
  const params = new URLSearchParams();
  if (searchTerm) params.set('search', searchTerm);
  if (category) params.set('category', category);

  const query = params.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses${query ? `?${query}` : ''}`;
  const res = await fetch(url);

  const data = await res.json();

  return data;
};

 export const fetchLimitPetCard = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card`);

  const data = await res.json();

  return data;
}; 

export const addCourse = async (formData) => {
  const petData = {
    petName: formData.get('petName'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    species: formData.get('species'),
    breed: formData.get('breed'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    healthStatus: formData.get('healthStatus'),
    vaccinationStatus: formData.get('vaccinationStatus'),
    location: formData.get('location'),
    adoptionFee: formData.get('adoptionFee'),
    ownerEmail: formData.get('ownerEmail'),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(petData),
  });

  if (!res.ok) {
    throw new Error('Failed to add course');
  }

  return res.json();
};