import { UserProfile } from '../types';

// Mock JWT token generation and validation
class MockJWTService {
  private static readonly SECRET_KEY = 'mock-secret-key-for-development';
  private static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  static generateToken(user: UserProfile): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + this.TOKEN_EXPIRY,
      iat: Date.now(),
    };
    
    // Simple mock JWT encoding (base64)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadStr = btoa(JSON.stringify(payload));
    const signature = btoa(this.SECRET_KEY + payloadStr);
    
    return `${header}.${payloadStr}.${signature}`;
  }

  static verifyToken(token: string): UserProfile | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      if (payload.exp < Date.now()) {
        return null;
      }
      
      // Mock user data based on token
      return {
        id: payload.userId,
        name: payload.email.split('@')[0], // Use email prefix as name
        email: payload.email,
        role: payload.role,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&${payload.userId}`,
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}

// Cookie management
class CookieService {
  static setCookie(name: string, value: string, days: number = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  }

  static getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

// Mock user database
const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'freelancer' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'client' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    password: 'password123',
    role: 'freelancer' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
];

export const authService = {
  // Login with credentials
  async login(credentials: { email: string; password: string }): Promise<{ user: UserProfile; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password, ...userProfile } = user;
    const token = MockJWTService.generateToken(userProfile);
    
    // Set JWT token in cookie
    CookieService.setCookie('jwt_token', token, 7);
    
    return { user: userProfile, token };
  },

  // Register new user
  async register(userData: { name: string; email: string; password: string; role: 'freelancer' | 'client' }): Promise<{ user: UserProfile; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&${Date.now()}`,
    };
    
    mockUsers.push(newUser);
    
    const { password, ...userProfile } = newUser;
    const token = MockJWTService.generateToken(userProfile);
    
    // Set JWT token in cookie
    CookieService.setCookie('jwt_token', token, 7);
    
    return { user: userProfile, token };
  },

  // Logout user
  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Remove JWT token from cookie
    CookieService.deleteCookie('jwt_token');
  },

  // Get current authenticated user
  getCurrentUser(): UserProfile | null {
    const token = CookieService.getCookie('jwt_token');
    if (!token) return null;
    
    return MockJWTService.verifyToken(token);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  // Refresh token (if needed)
  async refreshToken(): Promise<string | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    
    const newToken = MockJWTService.generateToken(currentUser);
    CookieService.setCookie('jwt_token', newToken, 7);
    
    return newToken;
  },

  // Get token from cookie
  getToken(): string | null {
    return CookieService.getCookie('jwt_token');
  },
};

export { MockJWTService, CookieService };
