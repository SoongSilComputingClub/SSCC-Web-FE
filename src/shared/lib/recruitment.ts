import {
  APPLICATION_OPEN_AT,
  APPLICATION_CLOSE_AT,
  type ApplicationPhase,
} from '@/shared/config/recruitment';

export function isApplicationOpen(now: Date = new Date()): boolean {
  return now >= APPLICATION_OPEN_AT && now <= APPLICATION_CLOSE_AT;
}

export function getApplicationPhase(now: Date = new Date()): ApplicationPhase {
  return isApplicationOpen(now) ? 'open' : 'closed';
}
