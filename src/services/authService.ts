import type { UserProfile, UserRole } from '../types';
import { INITIAL_USER_PROFILE, ADMIN_USER_PROFILE } from '../data/sampleUser';

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

export const ADMIN_CREDENTIALS = {
  username: 'SJ@AI@olympiad@OS@olympiadOS@initiative',
  password: 'sj@1234567890987654321@qwertyuio@olympiados/\\/\\/\\',
};

export const authService = {
  // Login verification
  login: (identity: string, password: string, requestedRole: UserRole): AuthResponse => {
    const cleanIdentity = identity.trim();

    // Admin login check
    if (requestedRole === 'admin') {
      if (
        cleanIdentity === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
      ) {
        return {
          success: true,
          user: {
            ...ADMIN_USER_PROFILE,
            email: ADMIN_CREDENTIALS.username,
          },
        };
      } else {
        return {
          success: false,
          error: 'Invalid Administrator Username or Password. Public admin registration is disabled.',
        };
      }
    }

    // Student login check
    const cleanEmail = cleanIdentity.toLowerCase();
    return {
      success: true,
      user: {
        ...INITIAL_USER_PROFILE,
        email: cleanEmail || INITIAL_USER_PROFILE.email,
        name: cleanEmail ? cleanEmail.split('@')[0] : INITIAL_USER_PROFILE.name,
      },
    };
  },

  // Signup simulation (STUDENT ONLY - Admin registration disabled)
  signup: (name: string, email: string, password: string, role: UserRole): AuthResponse => {
    if (role === 'admin') {
      return {
        success: false,
        error: 'Admin account creation is disabled. Only pre-configured administrators may log in.',
      };
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      avatar: INITIAL_USER_PROFILE.avatar,
      role: 'student',
      goals: ['Qualify for USAMO', 'Physics Olympiad'],
      level: 'Intermediate',
      targetOlympiad: 'Math & Science Olympiads',
      weeklyGoal: 15,
      preferredDifficulty: 'Hard',
      rating: 1500,
      created_at: new Date().toISOString(),
      onboardingCompleted: true,
    };

    return { success: true, user: newUser };
  },
};
