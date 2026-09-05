import {
  Asset,
  MaintenanceTicket,
  PMRoutineItem,
  ApprovalRequest,
  ReturnHistoryItem,
} from '../types';

export const INITIAL_ASSETS: Asset[] = [];

export const INITIAL_MAINTENANCE_TICKETS: MaintenanceTicket[] = [];

export const INITIAL_PM_ROUTINES: PMRoutineItem[] = [];

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
