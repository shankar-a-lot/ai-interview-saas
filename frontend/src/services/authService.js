// This function simulates registering a new user.
export const registerUser = async (formData) => {
  console.log("Sending registration data to backend:", formData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (formData.email && formData.password) {
    return { success: true, message: "User registered successfully!" };
  } else {
    return { success: false, message: "Please fill in all fields." };
  }
};

// --- NEW FUNCTION ---
// This function simulates logging in an existing user.
export const loginUser = async (formData) => {
  console.log("Sending login data to backend:", formData);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a successful login with correct mock credentials
  if (formData.email === 'candidate@example.com' && formData.password === 'password') {
    const mockUser = { name: 'Candidate', email: 'candidate@example.com' };
    return { success: true, message: "Logged in successfully!", user: mockUser };
  } else {
    // Simulate an error for incorrect credentials
    return { success: false, message: "Invalid email or password." };
  }
};