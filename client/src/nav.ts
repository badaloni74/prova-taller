export interface NavSection {
  path: string;
  labelKey: string;
  implemented: boolean;
}

export const navSections: NavSection[] = [
  { path: '/clients', labelKey: 'nav.clients', implemented: true },
  { path: '/vehicles', labelKey: 'nav.vehicles', implemented: true },
  { path: '/peces', labelKey: 'nav.peces', implemented: true },
  { path: '/albarans', labelKey: 'nav.albarans', implemented: true },
  { path: '/factures', labelKey: 'nav.factures', implemented: true },
  { path: '/personal', labelKey: 'nav.personal', implemented: true },
  { path: '/nomines', labelKey: 'nav.nomines', implemented: false },
  { path: '/configuracio', labelKey: 'nav.configuracio', implemented: false },
];
