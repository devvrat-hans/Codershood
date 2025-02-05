export const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return error.message;
    }
  };