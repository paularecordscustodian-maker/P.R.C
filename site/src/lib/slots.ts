// Native scheduling: generates bookable consultation slots from business rules.
// Edit RULES to change availability. DST-safe: hours are evaluated in the business time zone.

export const RULES = {
  timeZone: 'America/Chicago',
  days: [1, 2, 3, 4, 5],   // Mon–Fri (0 = Sunday)
  startHour: 10,            // first slot starts 10:00
  endHour: 16,              // last slot starts 15:30
  slotMinutes: 30,
  leadHours: 24,            // no same-day surprises
  horizonDays: 14,
};

const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function localParts(d: Date, tz: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return { weekday: WD[get('weekday')] ?? -1, hour: parseInt(get('hour'), 10), minute: parseInt(get('minute'), 10) };
}

/** All legal slot starts (ISO, minute precision) between lead time and horizon. */
export function generateSlots(now: Date = new Date()): string[] {
  const stepMs = RULES.slotMinutes * 60_000;
  const start = Math.ceil((now.getTime() + RULES.leadHours * 3_600_000) / stepMs) * stepMs;
  const end = now.getTime() + RULES.horizonDays * 86_400_000;
  const out: string[] = [];
  for (let t = start; t < end; t += stepMs) {
    const d = new Date(t);
    const { weekday, hour, minute } = localParts(d, RULES.timeZone);
    if (!RULES.days.includes(weekday)) continue;
    const mins = hour * 60 + minute;
    if (mins < RULES.startHour * 60 || mins >= RULES.endHour * 60) continue;
    out.push(d.toISOString().slice(0, 16) + ':00.000Z');
  }
  return out;
}

export function isLegalSlot(iso: string, now: Date = new Date()): boolean {
  return generateSlots(now).includes(iso);
}
