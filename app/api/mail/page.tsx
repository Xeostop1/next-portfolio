import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import SendMail from '@/components/mail/SendMail';

export default function MailPage() {
  return (
    <GlassLayoutWithHeader>
      <div className="min-h-screen flex justify-center items-center p-6">
        <SendMail />
      </div>
    </GlassLayoutWithHeader>
  );
}
