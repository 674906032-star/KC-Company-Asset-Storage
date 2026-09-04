import {
  Asset,
  MaintenanceTicket,
  PMRoutineItem,
  ApprovalRequest,
  ReturnHistoryItem,
} from '../types';

export const INITIAL_ASSETS: Asset[] = [];

export const INITIAL_MAINTENANCE_TICKETS: MaintenanceTicket[] = [];

export const INITIAL_PM_ROUTINES: PMRoutineItem[] = [
  {
    id: 'pm-1',
    code: 'PM-AIR-03',
    title: 'ล้างแอร์สำนักงาน',
    location: 'อาคาร KC Tower ชั้น 4-8',
    cycle: 'รอบ 3 เดือน (ไตรมาส 1)',
    assignedTeam: 'ทีมช่างอาคาร B',
    dueDateBadge: 'ครบกำหนด 20 ก.พ.',
    isUrgent: true,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    status: 'pending',
  },
  {
    id: 'pm-2',
    code: 'PM-UPS-01',
    title: 'ระบบสำรองไฟ UPS & Data Center',
    location: 'ห้อง Server A ชั้น B1',
    cycle: 'รอบ 6 เดือน',
    assignedTeam: 'ทีมวิศวกรไฟฟ้า',
    dueDateBadge: 'อีก 12 วัน',
    isUrgent: false,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    status: 'pending',
  },
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [];

export const INITIAL_RETURN_HISTORY: ReturnHistoryItem[] = [];

export const NOTIFICATIONS = [
  {
    id: 'n-ready',
    title: 'ระบบพร้อมใช้งาน',
    description: 'ฐานข้อมูลคำขอเบิก ครุภัณฑ์ และแจ้งซ่อม ได้รับการล้างข้อมูลพร้อมสำหรับบันทึกรายการใหม่',
    time: 'เมื่อสักครู่',
    unread: false,
    type: 'approval',
  },
];
