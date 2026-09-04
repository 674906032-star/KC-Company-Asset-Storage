import React, { useState } from 'react';
import { TabType, Asset, MaintenanceTicket, PMRoutineItem, ApprovalRequest, ReturnHistoryItem } from './types';
import {
  INITIAL_ASSETS,
  INITIAL_MAINTENANCE_TICKETS,
  INITIAL_PM_ROUTINES,
  INITIAL_APPROVALS,
  INITIAL_RETURN_HISTORY,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { AssetRegistryView } from './components/AssetRegistryView';
import { MaintenanceView } from './components/MaintenanceView';
import { ApprovalsView } from './components/ApprovalsView';
import { QRScannerModal } from './components/QRScannerModal';
import { RegisterAssetModal } from './components/RegisterAssetModal';
import { ReportIssueModal } from './components/ReportIssueModal';
import { ExpressRequestModal } from './components/ExpressRequestModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SignatureApprovalModal } from './components/SignatureApprovalModal';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Core collections in state
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE_TICKETS);
  const [pmRoutines, setPmRoutines] = useState<PMRoutineItem[]>(INITIAL_PM_ROUTINES);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [returnHistory, setReturnHistory] = useState<ReturnHistoryItem[]>(INITIAL_RETURN_HISTORY);

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isExpressOpen, setIsExpressOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [signatureTargetRequest, setSignatureTargetRequest] = useState<ApprovalRequest | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Pending count for approvals badge
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  // Urgent request for Overview screen
  const urgentApproval = approvals.find((a) => a.urgency === 'urgent' && a.status === 'pending') || null;

  // 1-Tap Quick Approve from Overview
  const handleApproveUrgent = (id: string) => {
    setApprovals((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updatedChain = req.approvalChain.map((step) =>
            step.step === 2
              ? { ...step, status: 'approved' as const, label: 'อนุมัติแล้ว (1-Tap)' }
              : step
          );
          return { ...req, status: 'approved', approvalChain: updatedChain };
        }
        return req;
      })
    );
    addToast('success', 'อนุมัติด่วนสำเร็จ (1-Tap)', `คำขอเบิก ${urgentApproval?.code || ''} ได้รับการอนุมัติแล้ว`);
  };

  // Signature modal confirm
  const handleConfirmSignature = (request: ApprovalRequest, signatureText: string) => {
    setApprovals((prev) =>
      prev.map((req) => {
        if (req.id === request.id) {
          const updatedChain = req.approvalChain.map((step) => {
            if (step.step === 2) {
              return { ...step, status: 'approved' as const, label: 'อนุมัติแล้ว', actorName: signatureText };
            }
            if (step.step === 3) {
              return { ...step, status: 'pending' as const, label: 'รอตรวจปล่อย' };
            }
            return step;
          });
          return { ...req, status: 'approved', approvalChain: updatedChain };
        }
        return req;
      })
    );
    addToast('success', 'ลงนามอนุมัติเรียบร้อย', `คำขอ ${request.code} ถูกส่งต่อให้ รปภ. ตรวจปล่อย`);
  };

  // Reject Request
  const handleRejectRequest = (request: ApprovalRequest) => {
    setApprovals((prev) =>
      prev.map((req) => (req.id === request.id ? { ...req, status: 'rejected' } : req))
    );
    addToast('error', 'ปฏิเสธคำขอเรียบร้อย', `คำขอ ${request.code} ถูกระงับ`);
  };

  // Maintenance: Accept Work
  const handleAcceptWork = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return { ...t, type: 'scheduled', typeLabel: 'ตรวจรับมอบเรียบร้อย', status: 'completed' };
        }
        return t;
      })
    );
    addToast('success', 'ตรวจรับงานเรียบร้อย', 'งานซ่อมบำรุงผ่านการตรวจรับและบันทึกยอดเบิกจ่ายแล้ว');
  };

  // Maintenance: Call contractor
  const handleCallContractor = (ticket: MaintenanceTicket) => {
    addToast('info', 'กำลังโทรติดต่อช่าง/ศูนย์บริการ', `${ticket.contractor} (02-890-4455)`);
  };

  // Call requester
  const handleCallRequester = (phone: string, name: string) => {
    addToast('info', `โทรออกถึง ${name}`, `หมายเลข ${phone}`);
  };

  // PM routine action
  const handleInspectPM = (pm: PMRoutineItem) => {
    addToast('info', `เริ่มการตรวจเช็ค PM: ${pm.title}`, `บันทึกรายการสำหรับ ${pm.location}`);
  };

  // Add new asset
  const handleAddAsset = (newAsset: Asset) => {
    setAssets((prev) => [newAsset, ...prev]);
    addToast('success', 'ลงทะเบียนครุภัณฑ์สำเร็จ', `รหัส ${newAsset.code} ถูกเพิ่มเข้าระบบ Asset Registry`);
  };

  // Add new ticket
  const handleAddTicket = (newTicket: MaintenanceTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    addToast('success', 'เปิดใบแจ้งซ่อมสำเร็จ', `ตั๋วเลขที่ ${newTicket.code} เข้าสู่คิวซ่อมบำรุงแล้ว`);
  };

  // Add new express approval
  const handleAddApproval = (newReq: ApprovalRequest) => {
    setApprovals((prev) => [newReq, ...prev]);
    addToast('success', 'ส่งคำขอเบิกด่วนแล้ว', `คำขอ ${newReq.code} ถูกจัดส่งเข้าระบบพิจารณา`);
  };

  // QR scan result
  const handleAssetScanned = (scanned: Asset) => {
    setSelectedAsset(scanned);
    addToast('success', 'สแกนสำเร็จ', `พบครุภัณฑ์: ${scanned.name} (${scanned.code})`);
  };

  return (
    <div className="min-h-screen bg-[#edf0f9] text-[#131b2e] flex justify-center font-sans antialiased">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Main Mobile App Frame Container */}
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col shadow-2xl relative border-x border-[#e2e7ff]">
        {/* App Header */}
        <Header
          activeTab={activeTab}
          unreadNotificationsCount={3}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Screen Content Container */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewView
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenExpressRequest={() => setIsExpressOpen(true)}
              onOpenReportIssue={() => setIsReportOpen(true)}
              urgentApproval={urgentApproval}
              onApproveUrgent={handleApproveUrgent}
              onViewApprovalDetail={(req) => setSignatureTargetRequest(req)}
            />
          )}

          {activeTab === 'assets' && (
            <AssetRegistryView
              assets={assets}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenRegisterAsset={() => setIsRegisterOpen(true)}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeTab === 'maintenance' && (
            <MaintenanceView
              tickets={tickets}
              pmRoutines={pmRoutines}
              onOpenCreateTicket={() => setIsReportOpen(true)}
              onSelectTicket={(ticket) => {
                addToast('info', `รายละเอียดใบแจ้งซ่อม ${ticket.code}`, ticket.title);
              }}
              onInspectPM={handleInspectPM}
              onAcceptWork={handleAcceptWork}
              onCallContractor={handleCallContractor}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalsView
              approvals={approvals}
              returnHistory={returnHistory}
              onOpenSignatureModal={(req) => setSignatureTargetRequest(req)}
              onRejectRequest={handleRejectRequest}
              onSelectApprovalDetail={(req) => setSignatureTargetRequest(req)}
              onCallRequester={handleCallRequester}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          pendingApprovalsCount={pendingApprovalsCount}
        />

        {/* Modals & Dialogs */}
        <QRScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          assets={assets}
          onAssetScanned={handleAssetScanned}
        />

        <RegisterAssetModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onAddAsset={handleAddAsset}
        />

        <ReportIssueModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          assets={assets}
          onAddTicket={handleAddTicket}
        />

        <ExpressRequestModal
          isOpen={isExpressOpen}
          onClose={() => setIsExpressOpen(false)}
          assets={assets}
          onAddApproval={handleAddApproval}
        />

        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onRequestBorrow={(asset) => {
            setIsExpressOpen(true);
          }}
          onReportRepair={(asset) => {
            setIsReportOpen(true);
          }}
          onToggleStatus={(asset) => {
            setAssets((prev) =>
              prev.map((a) =>
                a.id === asset.id
                  ? {
                      ...a,
                      status: a.status === 'available' ? 'checked_out' : 'available',
                      statusLabel: a.status === 'available' ? 'กำลังถูกเบิก' : 'พร้อมใช้งาน',
                    }
                  : a
              )
            );
          }}
        />

        <SignatureApprovalModal
          request={signatureTargetRequest}
          onClose={() => setSignatureTargetRequest(null)}
          onConfirmApproval={handleConfirmSignature}
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
}
