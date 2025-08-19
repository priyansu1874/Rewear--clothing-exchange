import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [adminVerified, setAdminVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!user || !user.isAdmin) {
        setAdminVerified(false);
        return;
      }

      try {
        const hasAccess = await adminService.verifyAdminAccess();
        setAdminVerified(hasAccess);
        
        if (!hasAccess) {
          toast({
            title: 'Access Denied',
            description: 'You do not have admin privileges to access this page.',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Admin verification failed:', error);
        setAdminVerified(false);
        toast({
          title: 'Access Verification Failed',
          description: 'Unable to verify admin access. Please try again.',
          variant: 'destructive'
        });
      }
    };

    if (!loading && user) {
      verifyAdminAccess();
    } else if (!loading && !user) {
      setAdminVerified(false);
    }
  }, [user, loading, toast]);

  // Show loading while checking authentication
  if (loading || adminVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if not admin
  if (!adminVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
