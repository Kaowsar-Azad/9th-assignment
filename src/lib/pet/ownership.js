export function isOwnPet(pet, userEmail) {
    if (!pet?.ownerEmail || !userEmail) return false;
    return pet.ownerEmail.toLowerCase().trim() === userEmail.toLowerCase().trim();
}
