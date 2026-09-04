export type TabType = 'overview' | 'assets' | 'maintenance' | 'approvals';

export type AssetCategory = 'it' | 'vehicle' | 'tool' | 'furniture';

export type AssetStatus = 'available' | 'checked_out' | 'maintenance';

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: AssetCategory;
  categoryName: string;
  status: AssetStatus;
  statusLabel: string;
  serialNumber?: string;
  assignedUser?: string;
  department?: string;
  location: string;
  price: number;
  conditionGrade?: string;
  receivedDate?: string;
  specs?: string;
  imageUrl: string;
  iconType: 'laptop' | 'camera' | 'drone' | 'vehicle' | 'furniture' | 'tool' | 'printer' | 'display';
}

export type MaintenanceTicketType = 'corrective' | 'pending_inspection' | 'scheduled';

export interface MaintenanceTicket {
  id: string;
  code: string;
  type: MaintenanceTicketType;
  typeLabel: string;
  title: string;
  issueDescription: string;
  assetCode?: string;
  contractor: string;
  estimatedCost?: number;
  actualCost?: number;
  warrantyStatus?: string;
  requester?: string;
  timeAgo: string;
  dateStr: string;
  imageUrl: string;
  status: 'in_progress' | 'ready_for_review' | 'awaiting_tech' | 'completed';
}

export interface PMRoutineItem {
  id: string;
  code: string;
  title: string;
  location: string;
  cycle: string;
  assignedTeam: string;
  dueDateBadge: string;
  isUrgent: boolean;
  imageUrl: string;
  status: 'pending' | 'in_progress' | 'done';
}

export interface ApprovalItem {
  code: string;
  name: string;
  condition: string;
  imageUrl: string;
  quantity: string;
}

export interface ApprovalChainStep {
  step: number;
  role: string;
  status: 'approved' | 'pending' | 'upcoming';
  label: string;
  actorName?: string;
}

export interface ApprovalRequest {
  id: string;
  code: string;
  urgency: 'urgent' | 'normal';
  urgencyLabel: string;
  timeAgo: string;
  requester: {
    name: string;
    role: string;
    department: string;
    avatar: string;
    phone: string;
  };
  period: {
    start: string;
    end: string;
    durationText: string;
  };
  purpose: string;
  location: string;
  items: ApprovalItem[];
  totalValue: number;
  approvalChain: ApprovalChainStep[];
  status: 'pending' | 'approved' | 'rejected';
  returnDeadline?: string;
}

export interface ReturnHistoryItem {
  id: string;
  code: string;
  badge: string;
  title: string;
  returnedBy: string;
  recordedAt: string;
  checkpoint: string;
}
