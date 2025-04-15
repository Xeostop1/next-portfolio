// /app/admin/page.tsx

import AuthGuard from '@/components/auth/AuthGuard';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AuthGuard> {/* ✅ 보호 적용 */}
      <GlassLayoutWithHeader>
        <div className="p-6 text-white">관리자 전용 페이지입니다.</div>
        <AdminDashboard />
      </GlassLayoutWithHeader>
    </AuthGuard>
  );
}
