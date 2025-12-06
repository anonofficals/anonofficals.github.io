# Frontend Integration Guide

## 1. Update AuthContext

```typescript
// src/contexts/AuthContext.tsx
interface User {
  _id: string;
  email: string;
  name: string;
  roles: string[]; // Changed from single role to array
}

const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  }
};
```

## 2. Update Protected Routes

```typescript
// src/components/ProtectedRoute.tsx
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user._id) return <Navigate to="/auth" />;
  
  if (requiredRoles.length > 0) {
    const hasRole = user.roles?.some(role => requiredRoles.includes(role));
    if (!hasRole) return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};
```

## 3. API Service

```typescript
// src/services/roleApi.ts
export const assignRole = async (userId: string, role: string, departmentId?: string) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('/api/roles/assign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, role, departmentId })
  });
  return response.json();
};
```

## 4. Permission Hook

```typescript
// src/hooks/usePermission.ts
export const usePermission = (category: string, action: string) => {
  const [hasPermission, setHasPermission] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    const checkPermission = async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/permissions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user._id, category, action })
      });
      const data = await response.json();
      setHasPermission(data.data.hasPermission);
    };
    
    if (user._id) checkPermission();
  }, [user._id, category, action]);
  
  return hasPermission;
};
```
