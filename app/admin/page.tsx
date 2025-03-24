import AdminDashboard from '@/components/admin/AdminDashboard';
import GlassLayout from '@/components/layout/GlassLayout';

export default function AdminPage() {
  return (
    <GlassLayout>
        <div className="min-h-screen flex items-center justify-center">
        <AdminDashboard />
        </div>
    </GlassLayout>
  );
}
